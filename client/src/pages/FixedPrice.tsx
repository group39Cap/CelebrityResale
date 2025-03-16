import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { fixedPriceItems, featuredFixedPriceItems } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Heart, 
  CheckCircle, 
  ChevronRight,
} from 'lucide-react';

// Types
type Category = 'all' | 'clothing' | 'accessories' | 'jewelry' | 'footwear' | 'memorabilia';
type PriceRange = 'any' | 'under100' | '100To500' | '500To1000' | '1000To2000' | 'over2000';
type SortOption = 'newest' | 'priceLowToHigh' | 'priceHighToLow' | 'mostCharity';

const FixedPrice = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>('any');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [activeTab, setActiveTab] = useState('all');

  // Filter and sort items
  const filteredItems = fixedPriceItems.filter(item => {
    // Search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.seller.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    
    // Price range filter
    if (item.price < minPrice || item.price > maxPrice) {
      return false;
    }
    
    // Filter by price range dropdown
    if (selectedPriceRange === 'under100' && item.price >= 100) return false;
    if (selectedPriceRange === '100To500' && (item.price < 100 || item.price > 500)) return false;
    if (selectedPriceRange === '500To1000' && (item.price < 500 || item.price > 1000)) return false;
    if (selectedPriceRange === '1000To2000' && (item.price < 1000 || item.price > 2000)) return false;
    if (selectedPriceRange === 'over2000' && item.price <= 2000) return false;
    
    // Tab filtering
    if (activeTab === 'trending') {
      // Use recent items (within last 7 days) as trending
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      if (item.listedAt < sevenDaysAgo) return false;
    }
    if (activeTab === 'charity' && item.charityPercent === 0) return false;
    if (activeTab === 'verified' && !item.seller.verified) return false;
    
    return true;
  });
  
  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case 'priceLowToHigh':
        return a.price - b.price;
      case 'priceHighToLow':
        return b.price - a.price;
      case 'mostCharity':
        return b.charityPercent - a.charityPercent;
      case 'newest':
      default:
        return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 mb-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Shop Celebrity Wardrobes</h1>
          <p className="text-lg opacity-90 mb-6">
            Authenticated luxury items directly from your favorite celebrities' collections. Each purchase comes with a certificate of authenticity.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="secondary" 
              className="bg-white text-indigo-600 hover:bg-slate-100"
              onClick={() => setActiveTab('charity')}
            >
              Shop for Charity
            </Button>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/20"
              onClick={() => setActiveTab('verified')}
            >
              Verified Sellers
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Items Carousel */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Items</h2>
          <Button 
            variant="link" 
            className="text-indigo-600 font-medium flex items-center"
            onClick={() => setActiveTab('trending')}
          >
            View All <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredFixedPriceItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                {item.charityPercent > 0 && (
                  <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                    {item.charityPercent}% to Charity
                  </Badge>
                )}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute top-2 left-2 bg-white/80 hover:bg-white text-pink-500 hover:text-pink-600 rounded-full"
                >
                  <Heart size={16} />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center mb-1 space-x-1">
                  <img 
                    src={item.seller.image} 
                    alt={item.seller.name} 
                    className="w-5 h-5 rounded-full" 
                  />
                  <span className="text-sm text-muted-foreground">{item.seller.name}</span>
                  {item.seller.verified && (
                    <CheckCircle size={14} className="text-blue-500" />
                  )}
                </div>
                <h3 className="font-medium mb-1 line-clamp-1">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{formatCurrency(item.price)}</span>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={() => setLocation('/checkout')}
                  >
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters - Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white p-5 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Filter size={18} className="mr-2" /> Filters
            </h3>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search items or celebrities..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={(value) => setSelectedCategory(value as Category)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="memorabilia">Memorabilia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium">
                    Price Range
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(minPrice)} - {maxPrice === 5000 ? `${formatCurrency(maxPrice)}+` : formatCurrency(maxPrice)}
                  </span>
                </div>
                <Slider 
                  defaultValue={[0, 5000]} 
                  max={5000}
                  step={100}
                  onValueChange={(values) => {
                    setMinPrice(values[0]);
                    setMaxPrice(values[1]);
                  }}
                  className="mb-4"
                />
                <Select 
                  value={selectedPriceRange} 
                  onValueChange={(value) => setSelectedPriceRange(value as PriceRange)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="under100">Under $100</SelectItem>
                    <SelectItem value="100To500">$100 - $500</SelectItem>
                    <SelectItem value="500To1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1000To2000">$1,000 - $2,000</SelectItem>
                    <SelectItem value="over2000">Over $2,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Reset Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPriceRange('any');
                  setMinPrice(0);
                  setMaxPrice(5000);
                  setActiveTab('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Grid - Right Side */}
        <div className="lg:col-span-3">
          {/* Tabs and Sort */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="charity">Charity</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center">
              <ArrowUpDown size={16} className="mr-2 text-muted-foreground" />
              <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="mostCharity">Most to Charity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {sortedItems.length} of {fixedPriceItems.length} items
          </p>
          
          {/* Product Grid */}
          {sortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    {item.charityPercent > 0 && (
                      <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                        {item.charityPercent}% to Charity
                      </Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute top-2 left-2 bg-white/80 hover:bg-white text-pink-500 hover:text-pink-600 rounded-full"
                    >
                      <Heart size={16} />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-1 space-x-1">
                      <img 
                        src={item.seller.image} 
                        alt={item.seller.name} 
                        className="w-5 h-5 rounded-full" 
                      />
                      <span className="text-sm text-muted-foreground">{item.seller.name}</span>
                      {item.seller.verified && (
                        <CheckCircle size={14} className="text-blue-500" />
                      )}
                    </div>
                    <h3 className="font-medium mb-1 line-clamp-1">{item.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="font-bold text-lg">{formatCurrency(item.price)}</span>
                        <Badge variant="outline" className="ml-2">
                          {item.condition}
                        </Badge>
                      </div>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={() => setLocation('/checkout')}
                      >
                        Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPriceRange('any');
                  setMinPrice(0);
                  setMaxPrice(5000);
                  setActiveTab('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixedPrice;