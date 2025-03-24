import { users, products, bids, orders, orderItems } from "@shared/schema";
import type { 
  User, InsertUser, 
  Product, InsertProduct,
  Bid, InsertBid,
  Order, InsertOrder,
  OrderItem, InsertOrderItem 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getAuctionProducts(): Promise<Product[]>;
  getFixedPriceProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Bid operations
  getBidsForProduct(productId: number): Promise<Bid[]>;
  getHighestBidForProduct(productId: number): Promise<Bid | undefined>;
  createBid(bid: InsertBid): Promise<Bid>;
  
  // Order operations
  getOrders(): Promise<Order[]>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Order Items operations
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private bids: Map<number, Bid>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  sessionStore: session.SessionStore;
  
  currentUserId: number;
  currentProductId: number;
  currentBidId: number;
  currentOrderId: number;
  currentOrderItemId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.bids = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentBidId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    
    // Create admin user
    this.createUser({
      username: "admin",
      email: "admin@example.com",
      password: "$2b$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1TD7WS", // 'password'
      fullName: "Admin User"
    }).then(user => {
      // Update user to be admin
      user.isAdmin = true;
      this.users.set(user.id, user);
    });
    
    // Initialize with sample products
    const sampleProducts = [
      {
        name: "Rolex Submariner Date - 2019",
        description: "Limited edition Rolex Submariner worn by Leonardo DiCaprio during the filming of 'Once Upon a Time in Hollywood'.",
        price: 24500,
        imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
        celebrityName: "Leonardo DiCaprio Collection",
        isAuction: true,
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      },
      {
        name: "Diamond Teardrop Necklace",
        description: "18K white gold necklace with 4.5 carat diamond worn by Jennifer Lawrence at the 2019 Academy Awards ceremony.",
        price: 78200,
        imageUrl: "https://images.unsplash.com/photo-1576053139778-7e32f2f3dd9c",
        celebrityName: "Jennifer Lawrence Collection",
        isAuction: true,
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      },
      {
        name: "1964 Fender Stratocaster",
        description: "Vintage Fender Stratocaster used by John Mayer during his 2017-2018 world tour and on his 'Sob Rock' album.",
        price: 35750,
        imageUrl: "https://images.unsplash.com/photo-1619134778067-9839020bbd50",
        celebrityName: "John Mayer Collection",
        isAuction: true,
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      },
      {
        name: "Tom Ford Sunglasses",
        description: "Stylish Tom Ford sunglasses worn by Ryan Reynolds during the promotion of Deadpool 3.",
        price: 850,
        imageUrl: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7",
        celebrityName: "Ryan Reynolds Collection",
        isAuction: false,
      },
      {
        name: "Nike Air Jordan 1 Retro",
        description: "Limited edition Nike Air Jordan 1 Retro signed by Michael B. Jordan, size US 10.",
        price: 2200,
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
        celebrityName: "Michael B. Jordan Collection",
        isAuction: false,
      },
      {
        name: "AllSaints Leather Jacket",
        description: "Premium leather jacket worn by Chris Hemsworth in a 2022 GQ photoshoot.",
        price: 1450,
        imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        celebrityName: "Chris Hemsworth Collection",
        isAuction: false,
      },
      {
        name: "Louis Vuitton Handbag",
        description: "Exclusive Louis Vuitton handbag used by Emma Stone at the 2023 Met Gala.",
        price: 3750,
        imageUrl: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c",
        celebrityName: "Emma Stone Collection",
        isAuction: false,
      }
    ];
    
    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id, isAdmin: false, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getAuctionProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isAuction === true
    );
  }
  
  async getFixedPriceProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isAuction === false
    );
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const now = new Date();
    const product: Product = { ...insertProduct, id, createdAt: now };
    this.products.set(id, product);
    return product;
  }
  
  async updateProduct(id: number, updateData: Partial<Product>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Bid operations
  async getBidsForProduct(productId: number): Promise<Bid[]> {
    return Array.from(this.bids.values()).filter(
      (bid) => bid.productId === productId
    );
  }
  
  async getHighestBidForProduct(productId: number): Promise<Bid | undefined> {
    const bids = await this.getBidsForProduct(productId);
    if (bids.length === 0) return undefined;
    
    return bids.reduce((highest, current) => {
      return highest.amount > current.amount ? highest : current;
    });
  }
  
  async createBid(insertBid: InsertBid): Promise<Bid> {
    const id = this.currentBidId++;
    const now = new Date();
    const bid: Bid = { ...insertBid, id, createdAt: now };
    this.bids.set(id, bid);
    return bid;
  }
  
  // Order operations
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const now = new Date();
    const order: Order = { ...insertOrder, id, createdAt: now };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    order.status = status;
    this.orders.set(id, order);
    return order;
  }
  
  // Order Items operations
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId
    );
  }
  
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
}

export const storage = new MemStorage();
