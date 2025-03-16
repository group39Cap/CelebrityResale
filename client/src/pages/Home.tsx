import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, getTimeRemaining } from '@/lib/utils';
import { featuredAuctions, featuredCelebrities } from '@/data/mockData';
import { Star, ChevronRight, Clock, Check } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-3xl animate-[slideUp_0.5s_ease_forwards]">
            <h1 className="text-4xl md:text-6xl text-white font-['Playfair_Display'] leading-tight mb-6">Own a Piece of <span className="text-[#D4AF37]">Celebrity</span> History</h1>
            <p className="text-lg md:text-xl text-white opacity-90 mb-8 font-['Inter']">Authentic items worn by your favorite celebrities, verified and exclusive to our platform.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auctions">
                <Button className="bg-[#D4AF37] text-primary px-8 py-6 rounded-md font-medium hover:bg-[#e6c76a] transition-colors inline-block text-center">
                  Explore Auctions
                </Button>
              </Link>
              <Link href="/celebrities">
                <Button variant="outline" className="bg-transparent text-white border-2 border-white px-8 py-6 rounded-md font-medium hover:bg-white/10 transition-colors inline-block text-center">
                  Browse Celebrities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Auctions */}
      <div className="bg-white py-16 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-['Playfair_Display'] text-primary mb-2">Featured Auctions</h2>
              <p className="text-neutral-300">Exclusive items ending soon</p>
            </div>
            <Link href="/auctions">
              <span className="text-[#6A0DAD] font-medium hover:underline hidden md:block cursor-pointer">
                View All
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAuctions.map((auction, index) => (
              <Card 
                key={auction.id} 
                className="rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300 animate-[slideUp_0.5s_ease_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={auction.image} alt={auction.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-[#D4AF37] text-primary text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 animate-[pulse_1.5s_infinite]">
                    <Clock size={14} />
                    <span>Ends in: {getTimeRemaining(auction.endTime)}</span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <img 
                      src={auction.seller.image} 
                      alt={auction.seller.name} 
                      className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]"
                    />
                    <span className="ml-2 text-sm text-neutral-300">{auction.seller.name}</span>
                    {auction.seller.verified && (
                      <span className="ml-1 text-xs bg-blue-500 text-white rounded-full p-0.5">
                        <Check size={10} />
                      </span>
                    )}
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-medium mb-2">{auction.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-neutral-300 text-sm">Current bid</p>
                      <p className="font-['Montserrat'] text-lg font-semibold text-primary">{formatCurrency(auction.currentBid)}</p>
                    </div>
                    <Button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-light transition-colors">
                      Place Bid
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10 md:hidden">
            <Link href="/auctions">
              <span className="text-[#6A0DAD] font-medium hover:underline cursor-pointer">
                View All Auctions
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Celebrities */}
      <div className="bg-neutral-100 py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Playfair_Display'] text-primary mb-2">Featured Celebrities</h2>
            <p className="text-neutral-300 max-w-xl mx-auto">Explore exclusive collections from your favorite stars</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredCelebrities.map((celebrity, index) => (
              <Card 
                key={celebrity.id} 
                className="rounded-lg shadow-lg overflow-hidden text-center transition-transform hover:-translate-y-1 duration-300 animate-[slideUp_0.5s_ease_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-40 overflow-hidden">
                  <img src={celebrity.image} alt={celebrity.name} className="w-full h-full object-cover object-top" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-['Playfair_Display'] font-medium">{celebrity.name}</h3>
                  <p className="text-sm text-neutral-300 mb-3">{celebrity.role}</p>
                  <Link href={`/celebrities/${celebrity.id}`}>
                    <span className="text-[#6A0DAD] text-sm font-medium hover:underline cursor-pointer">
                      View Collection
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/celebrities">
              <Button variant="outline" className="bg-transparent text-primary border-2 border-primary px-6 py-2 rounded-md font-medium hover:bg-primary hover:text-white transition-colors inline-block">
                View All Celebrities
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="bg-white py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Playfair_Display'] text-primary mb-2">How It Works</h2>
            <p className="text-neutral-300 max-w-xl mx-auto">Simple steps to own authentic celebrity items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-[slideUp_0.5s_ease_forwards]" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-['Playfair_Display'] text-xl mb-3">Browse & Bid</h3>
              <p className="text-neutral-300">Explore exclusive collections from verified celebrities and place bids on your favorite items.</p>
            </div>
            
            <div className="text-center p-6 animate-[slideUp_0.5s_ease_forwards]" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-['Playfair_Display'] text-xl mb-3">Win & Pay</h3>
              <p className="text-neutral-300">Secure your winning bid with our safe payment system. All transactions are protected.</p>
            </div>
            
            <div className="text-center p-6 animate-[slideUp_0.5s_ease_forwards]" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-['Playfair_Display'] text-xl mb-3">Receive & Enjoy</h3>
              <p className="text-neutral-300">Get your authenticated item delivered with a certificate of authenticity and celebrity provenance.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-primary text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Playfair_Display'] mb-2">What Our <span className="text-[#D4AF37]">Clients Say</span></h2>
            <p className="text-white/70 max-w-xl mx-auto">Hear from our community of celebrity item collectors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-primary-light p-6 rounded-lg animate-[slideUp_0.5s_ease_forwards]" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Client" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3">
                  <h4 className="font-['Montserrat'] font-medium">Jessica T.</h4>
                  <div className="flex text-[#D4AF37] text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#D4AF37" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/80">"I purchased a gown worn by my favorite actress at the Oscars. The authentication process was impeccable, and I treasure this piece of Hollywood history."</p>
            </div>
            
            <div className="bg-primary-light p-6 rounded-lg animate-[slideUp_0.5s_ease_forwards]" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="Client" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3">
                  <h4 className="font-['Montserrat'] font-medium">Robert M.</h4>
                  <div className="flex text-[#D4AF37] text-sm">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={16} fill="#D4AF37" />
                    ))}
                    <Star size={16} fill="#D4AF37" className="opacity-50" />
                  </div>
                </div>
              </div>
              <p className="text-white/80">"As a collector, authenticity is everything. CelebStyle's blockchain verification gave me complete confidence in my purchase of a rare watch worn in a blockbuster film."</p>
            </div>
            
            <div className="bg-primary-light p-6 rounded-lg animate-[slideUp_0.5s_ease_forwards]" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80" alt="Client" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3">
                  <h4 className="font-['Montserrat'] font-medium">Sophia L.</h4>
                  <div className="flex text-[#D4AF37] text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#D4AF37" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/80">"The charity aspect makes buying these items even more special. I got a signed guitar from my favorite musician, and part of the proceeds went to an amazing cause."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
