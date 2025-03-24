import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertBidSchema, insertOrderItemSchema, insertOrderSchema, insertProductSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup auth routes
  setupAuth(app);

  // Product routes
  app.get("/api/products", async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/auctions", async (req, res) => {
    const products = await storage.getAuctionProducts();
    res.json(products);
  });

  app.get("/api/products/fixed-price", async (req, res) => {
    const products = await storage.getFixedPriceProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
      const updatedProduct = await storage.updateProduct(id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const success = await storage.deleteProduct(id);
    if (!success) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).send();
  });

  // Bid routes
  app.get("/api/bids/product/:productId", async (req, res) => {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const bids = await storage.getBidsForProduct(productId);
    res.json(bids);
  });

  app.get("/api/bids/highest/:productId", async (req, res) => {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const highestBid = await storage.getHighestBidForProduct(productId);
    if (!highestBid) {
      return res.status(404).json({ message: "No bids found for this product" });
    }

    res.json(highestBid);
  });

  app.post("/api/bids", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      // Include the user ID from the session
      const bidData = insertBidSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      // Verify product exists and is an auction
      const product = await storage.getProduct(bidData.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (!product.isAuction) {
        return res.status(400).json({ message: "Cannot bid on fixed-price items" });
      }

      // Check if auction has ended
      if (product.endDate && new Date(product.endDate) < new Date()) {
        return res.status(400).json({ message: "Auction has ended" });
      }

      // Check if bid amount is higher than current price / highest bid
      const highestBid = await storage.getHighestBidForProduct(bidData.productId);
      const currentMinPrice = highestBid ? highestBid.amount : product.price;

      if (bidData.amount <= currentMinPrice) {
        return res.status(400).json({ message: `Bid must be higher than ${currentMinPrice}` });
      }

      const bid = await storage.createBid(bidData);
      res.status(201).json(bid);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid bid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to place bid" });
    }
  });

  // Order routes
  app.get("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Regular users can only see their own orders, admins can see all
    if (req.user.isAdmin) {
      const orders = await storage.getOrders();
      return res.json(orders);
    } else {
      const orders = await storage.getOrdersByUser(req.user.id);
      return res.json(orders);
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await storage.getOrder(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Users can only access their own orders, admins can access all
    if (!req.user.isAdmin && order.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const orderItems = await storage.getOrderItems(id);
    res.json({ order, items: orderItems });
  });

  app.post("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      // Include user ID from session
      const orderData = insertOrderSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      const order = await storage.createOrder(orderData);

      // Process order items if included
      if (req.body.items && Array.isArray(req.body.items)) {
        for (const item of req.body.items) {
          const orderItemData = insertOrderItemSchema.parse({
            ...item,
            orderId: order.id,
          });
          await storage.createOrderItem(orderItemData);
        }
      }

      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Only admins can update order status
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const { status } = req.body;
    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "Status is required" });
    }

    try {
      const updatedOrder = await storage.updateOrderStatus(id, status);
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
