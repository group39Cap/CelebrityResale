import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { celebrities, featuredCelebrity } from '@/data/mockData';
import { Search, Check } from 'lucide-react';

type Category = 'all' | 'actors' | 'musicians' | 'athletes' | 'influencers';

const Celebrities = () => {
  const [category, setCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter celebrities based on selected criteria
  const filteredCelebrities = celebrities.filter(celebrity => {
    if (searchQuery && !celebrity.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (category !== 'all') {
      // This is a simplified example - in a real app you'd have proper category mapping
      if (category === 'actors' && !celebrity.role.toLowerCase().includes('actor')) {
        return false;
      }
      if (category === 'musicians' && !celebrity.role.toLowerCase().includes('music')) {
        return false;
      }
      // Add other category checks as needed
    }
    
    return true;
  });

  return (
    <div>
      <div className="bg-primary text-white py-10 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] mb-4">Celebrity Sellers</h1>
          <p className="text-white/70 max-w-2xl">Browse verified celebrities and their exclusive collections available on our platform.</p>
        </div>
      </div>
      
      <div className="bg-white py-10 px-6">
        <div className="container mx-auto">
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search celebrities..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-300" size={18} />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Select 
                value={category}
                onValueChange={(value) => setCategory(value as Category)}
              >
                <SelectTrigger className="w-full border-2 border-neutral-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#D4AF37] transition-colors">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="actors">Actors & Actresses</SelectItem>
                  <SelectItem value="musicians">Musicians</SelectItem>
                  <SelectItem value="athletes">Athletes</SelectItem>
                  <SelectItem value="influencers">Influencers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Featured Celebrity */}
          <div className="mb-12 bg-neutral-100 rounded-lg overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 h-64 md:h-auto">
                <img src={featuredCelebrity.image} alt={featuredCelebrity.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-2/3 p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-['Playfair_Display']">{featuredCelebrity.name}</h2>
                  <span className="ml-2 text-sm bg-blue-500 text-white rounded-full px-2 py-0.5">Verified</span>
                </div>
                <p className="text-neutral-300 mb-6">{featuredCelebrity.role}</p>
                <p className="mb-6">{featuredCelebrity.bio}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-white px-4 py-2 rounded-md shadow-sm">
                    <p className="text-neutral-300 text-sm">Items</p>
                    <p className="font-['Montserrat'] text-lg font-semibold">{featuredCelebrity.itemCount}</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-md shadow-sm">
                    <p className="text-neutral-300 text-sm">Auctions</p>
                    <p className="font-['Montserrat'] text-lg font-semibold">{featuredCelebrity.auctionCount}</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-md shadow-sm">
                    <p className="text-neutral-300 text-sm">Charity</p>
                    <p className="font-['Montserrat'] text-lg font-semibold">{featuredCelebrity.charity}%</p>
                  </div>
                </div>
                <Button className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-light transition-colors">
                  View Collection
                </Button>
              </div>
            </div>
          </div>
          
          {/* Celebrity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCelebrities.map((celebrity, index) => (
              <Card 
                key={celebrity.id} 
                className="rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300 animate-[slideUp_0.5s_ease_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img src={celebrity.image} alt={celebrity.name} className="w-full h-full object-cover object-top" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <h3 className="font-['Playfair_Display'] text-lg font-medium">{celebrity.name}</h3>
                    <span className="ml-2 text-xs bg-blue-500 text-white rounded-full p-0.5">
                      <Check size={10} />
                    </span>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4">{celebrity.role}</p>
                  <div className="flex gap-3 mb-4">
                    <div className="bg-neutral-100 px-3 py-1 rounded text-sm">
                      <span className="font-semibold">{celebrity.itemCount}</span> Items
                    </div>
                    <div className="bg-neutral-100 px-3 py-1 rounded text-sm">
                      <span className="font-semibold">{celebrity.auctionCount}</span> Auctions
                    </div>
                  </div>
                  <Link href={`/celebrities/${celebrity.id}`}>
                    <span className="text-[#6A0DAD] font-medium hover:underline cursor-pointer">
                      View Collection
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious className="border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors" href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="bg-primary text-white" href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors" href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors" href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="text-neutral-300" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors" href="#">8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext className="border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-colors" href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Celebrities;
