import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HelpCircle, Shield, Award, Sparkles, Star, Info, Users, Wallet, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          About StarDrobes
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Connecting fans with authenticated celebrity fashion items through a secure and transparent marketplace.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            StarDrobes was founded with a vision to create a trusted marketplace where fans can purchase authenticated 
            fashion items directly from their favorite celebrities.
          </p>
          <p className="text-lg mb-6">
            We believe in sustainability through the circular economy of fashion, giving iconic pieces a second life 
            while supporting charitable causes that matter to the celebrities we partner with.
          </p>
          <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600">
            <Link href="/celebrities">Meet Our Celebrity Partners</Link>
          </Button>
        </div>
        <div className="bg-slate-100 p-8 rounded-xl">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <Shield className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">100% Authentic</h3>
              <p className="text-sm text-muted-foreground">Every item verified and authenticated</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Wallet className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">Charity Impact</h3>
              <p className="text-sm text-muted-foreground">Portions of sales support causes</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Star className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">Celebrity Direct</h3>
              <p className="text-sm text-muted-foreground">Items sourced directly from stars</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="font-semibold mb-2">Fan Community</h3>
              <p className="text-sm text-muted-foreground">Connect with other enthusiasts</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How StarDrobes Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Celebrity Partnerships</h3>
              <p className="text-muted-foreground">
                We partner directly with celebrities who want to share their personal collections with fans while 
                supporting charitable causes they care about.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentication Process</h3>
              <p className="text-muted-foreground">
                Every item is verified for authenticity and comes with a certificate and detailed provenance 
                information about when and where it was worn.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Purchase Options</h3>
              <p className="text-muted-foreground">
                Shop through direct purchase or participate in exclusive auctions for one-of-a-kind pieces with 
                significant cultural or historical value.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                alt="Customer"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold">Jessica T.</h4>
                <p className="text-sm text-muted-foreground">Fashion Blogger</p>
              </div>
            </div>
            <p className="italic text-muted-foreground">
              "I was able to purchase the exact dress my favorite actress wore to the Oscars. The authentication 
              process gave me complete confidence in my purchase."
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                alt="Customer"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold">Michael R.</h4>
                <p className="text-sm text-muted-foreground">Collector</p>
              </div>
            </div>
            <p className="italic text-muted-foreground">
              "StarDrobes has revolutionized celebrity memorabilia collection. The auction process is transparent 
              and exciting, and I love that part of my purchase supports charity."
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                alt="Customer"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold">Amanda L.</h4>
                <p className="text-sm text-muted-foreground">Celebrity Stylist</p>
              </div>
            </div>
            <p className="italic text-muted-foreground">
              "From a professional standpoint, I'm impressed with how StarDrobes has created a sustainable model for 
              fashion recycling while maintaining the provenance and story behind each piece."
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="flex items-center text-xl font-semibold mb-3">
              <HelpCircle className="mr-2 h-5 w-5 text-indigo-600" />
              How do you ensure authenticity?
            </h3>
            <p className="text-muted-foreground ml-7">
              We work directly with celebrities and their teams to source items. Each item comes with a certificate of 
              authenticity and detailed provenance information.
            </p>
          </div>
          
          <div>
            <h3 className="flex items-center text-xl font-semibold mb-3">
              <HelpCircle className="mr-2 h-5 w-5 text-indigo-600" />
              Can I sell my celebrity items on StarDrobes?
            </h3>
            <p className="text-muted-foreground ml-7">
              Currently, we only source items directly from celebrities to ensure 100% authenticity. We do not accept 
              third-party resales at this time.
            </p>
          </div>
          
          <div>
            <h3 className="flex items-center text-xl font-semibold mb-3">
              <HelpCircle className="mr-2 h-5 w-5 text-indigo-600" />
              How do auctions work?
            </h3>
            <p className="text-muted-foreground ml-7">
              Our auctions run for set periods, typically 3-7 days. You can place bids at any time during the auction, 
              and you'll receive notifications if you're outbid.
            </p>
          </div>
          
          <div>
            <h3 className="flex items-center text-xl font-semibold mb-3">
              <HelpCircle className="mr-2 h-5 w-5 text-indigo-600" />
              What percentage goes to charity?
            </h3>
            <p className="text-muted-foreground ml-7">
              The charity percentage varies by item and celebrity preference. Each listing clearly displays the percentage 
              and which organization will benefit from your purchase.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-10 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Our team is here to help you with any questions about purchases, authentication, or celebrity partnerships.
        </p>
        <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-slate-100">
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default About;