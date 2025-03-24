import { useLocation } from "wouter";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Award, ScrollText, CheckCircle, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-neutral-50">
        {/* Hero Section */}
        <div className="bg-[#0F172A] text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-[#DCA54C]">Celebrity</span> Resale
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-10">
              The premier marketplace for authentic celebrity-owned items
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-[#DCA54C] hover:bg-[#C4902F] text-white py-6 px-8 text-lg"
                onClick={() => setLocation("/shop")}
              >
                Shop Collection
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#0F172A] py-6 px-8 text-lg"
                onClick={() => setLocation("/auctions")}
              >
                View Auctions
              </Button>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="py-24 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F172A] mb-6">Our Story</h2>
            <p className="text-neutral-600 mb-6 text-lg">
              Founded in 2023, Celebrity Resale was born from a passion for connecting fans with authentic memorabilia and fashion pieces from their favorite celebrities.
            </p>
            <p className="text-neutral-600 mb-6 text-lg">
              We noticed a gap in the market for verified, authenticated celebrity-owned items. With countless counterfeit products and unverified claims in the marketplace, we set out to create a platform where every item is thoroughly authenticated and directly sourced from celebrities or their representatives.
            </p>
            <p className="text-neutral-600 mb-6 text-lg">
              Our team consists of authentication experts, luxury goods specialists, and tech innovators, all working together to provide a seamless experience for buyers and celebrities alike.
            </p>
            <p className="text-neutral-600 text-lg">
              Today, we're proud to be the premier destination for high-quality celebrity-owned items, with a focus on sustainability through resale and a commitment to authenticity that's unmatched in the industry.
            </p>
          </div>
        </div>
        
        {/* What Sets Us Apart */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-center text-[#0F172A] mb-16">
              What Sets Us Apart
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-md">
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-16 h-16 bg-[#DCA54C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ScrollText className="h-8 w-8 text-[#DCA54C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Authentication</h3>
                  <p className="text-neutral-600">
                    Every item is meticulously authenticated by our team of experts, with documentation provided.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-16 h-16 bg-[#DCA54C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-[#DCA54C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Direct Sourcing</h3>
                  <p className="text-neutral-600">
                    Items come directly from celebrities or their authorized representatives.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-16 h-16 bg-[#DCA54C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-[#DCA54C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Secure Platform</h3>
                  <p className="text-neutral-600">
                    Our secure payment system and authentication process protects both buyers and sellers.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-16 h-16 bg-[#DCA54C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-[#DCA54C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Luxury Experience</h3>
                  <p className="text-neutral-600">
                    Premium packaging, white-glove delivery, and exceptional customer service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="py-24 container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-center text-[#0F172A] mb-16">
            How It Works
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 mb-16">
              <div className="flex-1 lg:text-right">
                <div className="mb-4 lg:mr-0 lg:ml-auto w-12 h-12 bg-[#DCA54C] rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                <h3 className="text-2xl font-bold mb-3">Authentication</h3>
                <p className="text-neutral-600">
                  Our experts meticulously verify the authenticity and provenance of each item before it's listed.
                </p>
              </div>
              <div className="hidden lg:block w-px bg-neutral-200 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#DCA54C]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#DCA54C]"></div>
              </div>
              <div className="flex-1 lg:text-left">
                <div className="mb-4 w-12 h-12 bg-white border border-[#DCA54C] text-[#DCA54C] rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <h3 className="text-2xl font-bold mb-3">Listing</h3>
                <p className="text-neutral-600">
                  Items are professionally photographed and listed with detailed descriptions and authentication certificates.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1 lg:text-right">
                <div className="mb-4 lg:mr-0 lg:ml-auto w-12 h-12 bg-white border border-[#DCA54C] text-[#DCA54C] rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <h3 className="text-2xl font-bold mb-3">Purchase or Bid</h3>
                <p className="text-neutral-600">
                  Customers can buy fixed-price items instantly or participate in exclusive auctions for high-value pieces.
                </p>
              </div>
              <div className="hidden lg:block w-px bg-neutral-200 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#DCA54C]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#DCA54C]"></div>
              </div>
              <div className="flex-1 lg:text-left">
                <div className="mb-4 w-12 h-12 bg-[#DCA54C] rounded-full flex items-center justify-center text-white font-bold text-xl">4</div>
                <h3 className="text-2xl font-bold mb-3">Delivery</h3>
                <p className="text-neutral-600">
                  Items are carefully packaged and delivered through our secure, insured shipping network with tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-center text-[#0F172A] mb-16">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">How do you ensure authenticity?</h3>
                <p className="text-neutral-600">
                  Every item undergoes a rigorous authentication process by our team of experts. We verify the item's origin, condition, and provenance through documentation, and work directly with celebrities or their representatives.
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Do the celebrities receive a portion of the sale?</h3>
                <p className="text-neutral-600">
                  Yes, a percentage of each sale goes back to the celebrity or their designated charity. This ensures a fair and sustainable marketplace for all parties involved.
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">What happens if I win an auction?</h3>
                <p className="text-neutral-600">
                  After winning an auction, you'll receive a confirmation email with payment instructions. Once payment is complete, your item will be prepared for shipping with all authentication documents included.
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">What is your return policy?</h3>
                <p className="text-neutral-600">
                  Due to the unique nature of our items, all sales are final. However, if an item is received damaged or if there are authenticity concerns, please contact our customer service team within 48 hours of delivery.
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-xl font-bold mb-3">How can I sell my own celebrity-owned items?</h3>
                <p className="text-neutral-600">
                  We currently only accept items directly from celebrities or their authorized representatives. We do not purchase items from third-party sellers to ensure the integrity of our authentication process.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="py-24 bg-[#0F172A] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-6">Have More Questions?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Our team is ready to assist you with any questions about our products, authentication process, or services.
            </p>
            <Button 
              onClick={() => setLocation("/contact")}
              className="bg-[#DCA54C] hover:bg-[#C4902F] text-white py-6 px-8 text-lg"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;