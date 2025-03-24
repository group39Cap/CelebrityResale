import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Product } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import AuctionTimer from "./AuctionTimer";

interface ProductCardProps {
  product: Product;
  isSmall?: boolean;
}

const ProductCard = ({ product, isSmall = false }: ProductCardProps) => {
  const { user } = useAuth();
  
  // Check if the auction has ended
  const isAuctionEnded = product.isAuction && product.endDate && new Date(product.endDate) < new Date();
  
  return (
    <>
      {product.isAuction ? (
        <Card className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg duration-300">
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-[#0F172A] hover:bg-[#0F172A] text-white text-xs uppercase font-['Montserrat'] font-semibold">
                Auction
              </Badge>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-white text-sm font-medium">Current Bid:</span>
                  <span className="text-white font-['Montserrat'] text-lg font-semibold ml-1">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                {product.endDate && !isAuctionEnded && (
                  <AuctionTimer endDate={new Date(product.endDate)} />
                )}
                {isAuctionEnded && (
                  <Badge variant="outline" className="bg-white/10 backdrop-blur-sm text-white">
                    Auction Ended
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[#DCA54C] font-['Montserrat'] font-semibold">
                {product.celebrityName}
              </Badge>
            </div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <Link href={`/product/${product.id}`} className="text-[#0F172A] hover:text-[#1E293B] font-medium text-sm transition-all">
                View Details
              </Link>
              <Button 
                size="sm"
                className="bg-[#DCA54C] hover:bg-[#C4902F] text-white"
                disabled={isAuctionEnded}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/product/${product.id}`;
                }}
              >
                {isAuctionEnded ? "Auction Ended" : "Place Bid"}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        /* Fixed Price Item */
        <Card className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md duration-300">
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={`w-full ${isSmall ? 'h-48' : 'h-64'} object-cover`}
            />
          </div>
          
          <div className={`p-${isSmall ? '4' : '5'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[#DCA54C] font-['Montserrat']">
                {product.celebrityName}
              </span>
            </div>
            <h3 className={`font-['Playfair_Display'] ${isSmall ? 'text-base' : 'text-lg'} font-semibold mb-1 line-clamp-1`}>
              {product.name}
            </h3>
            {!isSmall && (
              <p className="text-neutral-500 text-sm mb-3 line-clamp-2">{product.description}</p>
            )}
            <p className="text-neutral-600 font-['Montserrat'] font-semibold">${product.price.toLocaleString()}</p>
            
            {isSmall ? (
              <Button 
                size="sm"
                className="w-full mt-3 bg-[#0F172A] hover:bg-[#1E293B] text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = user ? "/checkout" : "/auth";
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex justify-between items-center mt-4">
                <Link href={`/product/${product.id}`} className="text-[#0F172A] hover:text-[#1E293B] font-medium text-sm flex items-center gap-1 transition-all">
                  View Details
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <Button 
                  size="sm"
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = user ? "/checkout" : "/auth";
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default ProductCard;
