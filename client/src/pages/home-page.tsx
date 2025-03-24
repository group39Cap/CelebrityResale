import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { toast } = useToast();

  const {
    data: auctionProducts,
    error: auctionError,
    isLoading: auctionLoading,
  } = useQuery<Product[]>({
    queryKey: ["/api/products/auctions"],
  });

  const {
    data: fixedPriceProducts,
    error: fixedPriceError,
    isLoading: fixedPriceLoading,
  } = useQuery<Product[]>({
    queryKey: ["/api/products/fixed-price"],
  });

  if (auctionError || fixedPriceError) {
    toast({
      title: "Error loading products",
      description: "Please try again later",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold mb-6">Authentic Luxury Items from Celebrity Collections</h1>
            <p className="text-neutral-200 text-lg mb-8">Bid on exclusive items owned by your favorite celebrities or buy directly at fixed prices.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#DCA54C] hover:bg-[#C4902F] text-white font-['Montserrat'] font-semibold px-8 py-6 rounded-md">
                View Auctions
              </Button>
              <Button variant="outline" className="border-2 border-white bg-white/20 hover:bg-white text-white hover:text-[#0F172A] font-['Montserrat'] font-semibold px-8 py-6 rounded-md">
                Shop Fixed Price
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-neutral-50 to-transparent"></div>
      </section>
      
      {/* Featured Auctions */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F172A]">Featured Auctions</h2>
              <p className="text-neutral-500 mt-2">Exclusive high-value items with active bidding</p>
            </div>
            <a href="/auctions" className="hidden md:block text-[#DCA54C] hover:text-[#C4902F] font-medium transition-all">
              View All →
            </a>
          </div>
          
          {auctionLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#DCA54C]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {auctionProducts?.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <a href="/auctions" className="inline-block text-[#DCA54C] hover:text-[#C4902F] font-medium transition-all">
              View All Auctions →
            </a>
          </div>
        </div>
      </section>
      
      {/* Fixed Price Items */}
      <section className="py-12 md:py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F172A]">Shop Fixed Price</h2>
              <p className="text-neutral-500 mt-2">Authenticated celebrity items available for immediate purchase</p>
            </div>
            <a href="/fixed-price" className="hidden md:block text-[#DCA54C] hover:text-[#C4902F] font-medium transition-all">
              View All →
            </a>
          </div>
          
          {fixedPriceLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#DCA54C]" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {fixedPriceProducts?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} isSmall />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <a href="/fixed-price" className="inline-block text-[#DCA54C] hover:text-[#C4902F] font-medium transition-all">
              View All Fixed Price Items →
            </a>
          </div>
        </div>
      </section>
      
      {/* Trust & Authentication */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">Authentic Celebrity Items</h2>
            <p className="text-neutral-500">Every item on our platform goes through a rigorous authentication process to ensure its provenance and connection to the celebrity seller.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#1E293B] text-[#DCA54C] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">Rigorous Authentication</h3>
              <p className="text-neutral-500">Every item is verified by our expert team and comes with a certificate of authenticity.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#1E293B] text-[#DCA54C] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-neutral-500">Our platform uses industry-leading security to protect your payment and personal information.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-[#1E293B] text-[#DCA54C] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">Insured Shipping</h3>
              <p className="text-neutral-500">All items are carefully packaged and fully insured during transit to ensure safe delivery.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Celebrity Feature */}
      <section className="py-12 md:py-16 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1564419320461-6870880221ad')] opacity-20 bg-cover bg-center"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold mb-6">Featured Celebrity: Leonardo DiCaprio</h2>
            <p className="text-neutral-200 mb-6">Explore a curated collection of items from Leonardo DiCaprio, including watches, clothing, and memorabilia from his acclaimed film career.</p>
            <Button className="bg-[#DCA54C] hover:bg-[#C4902F] text-white font-['Montserrat'] font-semibold px-6 py-2 rounded-md">
              View Collection
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 md:py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">Stay Updated</h2>
            <p className="text-neutral-500 mb-8">Subscribe to our newsletter to get updates on new celebrity collections and exclusive auctions.</p>
            
            <form className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#DCA54C] focus:border-transparent"
                required
              />
              <Button className="bg-[#DCA54C] hover:bg-[#C4902F] text-white font-['Montserrat'] font-semibold px-6 py-3 rounded-md whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
