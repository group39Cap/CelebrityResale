import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const CelebritiesPage = () => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch all products to get celebrities
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  // Extract unique celebrities and their item counts
  const celebrities = products ? 
    Array.from(
      products.reduce((map, product) => {
        const celebrityName = product.celebrityName;
        if (!map.has(celebrityName)) {
          map.set(celebrityName, {
            name: celebrityName,
            count: 1,
            // Use first character as avatar fallback
            initials: celebrityName.substring(0, 2).toUpperCase(),
            // Use the image from one of their products
            sampleImage: product.imageUrl
          });
        } else {
          const existing = map.get(celebrityName)!;
          existing.count += 1;
        }
        return map;
      }, new Map<string, { name: string; count: number; initials: string; sampleImage: string }>())
    ).map(([_, value]) => value) : [];
  
  // Filter celebrities based on search
  const filteredCelebrities = celebrities.filter(celebrity =>
    celebrity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort celebrities by item count (most items first)
  const sortedCelebrities = [...filteredCelebrities].sort((a, b) => b.count - a.count);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#DCA54C]" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="text-red-500 text-xl font-bold mb-4">Error loading celebrity data</div>
          <p className="text-neutral-600 mb-6">There was a problem loading celebrity information.</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F172A] mb-2">Featured Celebrities</h1>
            <p className="text-neutral-600 max-w-3xl">
              Browse our collection of authentic items from top celebrities across the world of entertainment, sports, and fashion.
            </p>
          </div>
          
          {/* Search */}
          <div className="relative mb-10 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <Input 
              type="text" 
              placeholder="Search celebrities..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Celebrities Grid */}
          {sortedCelebrities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedCelebrities.map((celebrity) => (
                <Card 
                  key={celebrity.name} 
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setLocation(`/shop?celebrity=${encodeURIComponent(celebrity.name)}`)}
                >
                  <div 
                    className="h-40 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${celebrity.sampleImage})` 
                    }}
                  />
                  <CardContent className="pt-6 pb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-lg -mt-12">
                        <AvatarImage src="" alt={celebrity.name} />
                        <AvatarFallback className="bg-[#0F172A] text-white text-lg">
                          {celebrity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{celebrity.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {celebrity.count} {celebrity.count === 1 ? 'item' : 'items'}
                          </Badge>
                          {celebrity.count > 5 && (
                            <Badge className="bg-[#DCA54C]">
                              <Star className="h-3 w-3 mr-1 fill-white" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[#DCA54C] hover:text-[#DCA54C] hover:bg-[#DCA54C]/10"
                      >
                        View Collection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-2xl font-bold mb-2">No celebrities found</div>
              <p className="text-neutral-600 mb-6">Try adjusting your search term.</p>
              <Button 
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CelebritiesPage;