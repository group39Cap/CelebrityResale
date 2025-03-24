import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">
              Celebrity<span className="text-[#DCA54C]">Resale</span>
            </h3>
            <p className="text-neutral-300 mb-4">
              The premier platform for authentic celebrity-owned luxury items.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-[#DCA54C] transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#DCA54C] transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#DCA54C] transition-all">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-['Montserrat'] text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/auctions" className="text-neutral-300 hover:text-white transition-all">
                  Auctions
                </Link>
              </li>
              <li>
                <Link href="/products/fixed-price" className="text-neutral-300 hover:text-white transition-all">
                  Fixed Price
                </Link>
              </li>
              <li>
                <Link href="/celebrities" className="text-neutral-300 hover:text-white transition-all">
                  By Celebrity
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-neutral-300 hover:text-white transition-all">
                  By Category
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Montserrat'] text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-white transition-all">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/authentication-process" className="text-neutral-300 hover:text-white transition-all">
                  Authentication Process
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-neutral-300 hover:text-white transition-all">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-all">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Montserrat'] text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-neutral-300 hover:text-white transition-all">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-neutral-300 hover:text-white transition-all">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-neutral-300 hover:text-white transition-all">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-300 hover:text-white transition-all">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-300 hover:text-white transition-all">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-neutral-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Celebrity Resale. All rights reserved.
          </p>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <svg width="36" height="24" viewBox="0 0 36 24" className="text-neutral-300">
              <path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity="0.07"/>
              <path d="M33 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h30" fill="#fff"/>
              <path d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z" fill="#3086C8"/>
            </svg>
            
            <svg width="36" height="24" viewBox="0 0 36 24" className="text-neutral-300">
              <path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity="0.07"/>
              <path d="M33 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h30" fill="#fff"/>
              <path d="M18.9 9.2c-.8-.4-1.6-.1-2 .6-.4.7-.2 1.6.6 2 .8.4 1.6.1 2-.6.4-.8.2-1.6-.6-2zm3.3 2.5v-1.3h.9V9.9h-1v-.6c0-.3.2-.5.6-.5h.4v-.9h-.6c-.8 0-1.4.6-1.4 1.4v.6h-.8v.5h.8v4.1H22v-4.1h1l.2-1zm-5 0v-1.3h.9V9.9h-1v-.6c0-.3.2-.5.6-.5h.4v-.9h-.6c-.8 0-1.4.6-1.4 1.4v.6h-.8v.5h.8v4.1h1.1v-4.1h1l.2-1zm-5.9 1.1c0 1.2.5 1.8 1.3 1.8.4 0 .8-.2 1.1-.5l.2.4h.9V9.4h-1.1v2.5c0 .4-.3.7-.7.7-.5 0-.7-.3-.7-1.2v-2h-1.1l.1 3.4zm-4.4 2.6h.9V9.6h-.9v4.5zm-.2-5h1v-.9h-1v.9zm-1.7 5h.9V7.7h-.9v6.8zm-5.2 0h2v-.8h-.9v-2.8h.9V8.7h-.9V7.7H5V9l-.4.2c-.3.1-.5.2-.4.6.1.3.3.6.6.7l.2-.5zm51.4-5.8h-2.7c-.2 0-.4.2-.4.4v.9c-.3-.4-.9-.8-1.6-.8-1.3 0-2.2 1-2.4 2.2-.3.3-.2.7-.2 1s.1.7.2 1c.2 1.2 1.1 2.2 2.4 2.2.7 0 1.3-.3 1.6-.8v.7c0 .2.2.4.4.4h1.1V8.9c-.1-.2-.2-.4-.4-.4zm-3.2 4.6c-.9 0-1.3-.8-1.3-1.6 0-.8.4-1.6 1.3-1.6.9 0 1.3.8 1.3 1.6 0 .8-.4 1.6-1.3 1.6zm-7.5.9h1.2c.2 0 .4-.2.4-.4v-2.9c0-.8.3-1.3.9-1.3.7 0 .9.7.9 1.4v2.8c0 .2.2.4.4.4h1.2V9.4c0-1.2-.7-1.9-1.8-1.9-.7 0-1.3.3-1.7.8V8.8c0-.2-.2-.4-.4-.4h-1.2v5.4c.1.2.3.4.5.4zm-4.1 0h1.2c.2 0 .4-.2.4-.4V7.7c0-.2-.2-.4-.4-.4h-1.2c-.2 0-.4.2-.4.4v6.1c0 .2.2.3.4.3zm-2 0h1.2c.2 0 .4-.2.4-.4v-2.9c0-.8.3-1.3.9-1.3.7 0 .9.7.9 1.4v2.8c0 .2.2.4.4.4h1.2V9.4c0-1.2-.7-1.9-1.8-1.9-.7 0-1.3.3-1.7.8v-.5c0-.2-.2-.4-.4-.4H21c-.2 0-.4.2-.4.4v5.5c.2.2.4.4.5.4zm-5.3-2.4c0 1.4 1.1 2.4 2.6 2.4.7 0 1.3-.2 1.8-.5.1-.1.1-.2.1-.3l-.4-.8c-.1-.2-.2-.1-.3-.1-.4.2-.7.3-1.1.3-.8 0-1.2-.5-1.4-1.1h3.1c.2 0 .3-.2.3-.3v-.2c0-1.4-.9-2.5-2.3-2.5-1.1-.2-2.4.8-2.4 3.1zm2.4-1.9c.7 0 1 .5 1.1 1.1h-2.2c.1-.6.4-1.1 1.1-1.1zm-4.7 4.3h1.2c.2 0 .4-.2.4-.4V7.7c0-.2-.2-.4-.4-.4h-1.2c-.2 0-.4.2-.4.4v6.1c0 .2.2.3.4.3zm-6.3 0h1.2c.2 0 .4-.2.4-.4v-3c0-.9.4-1.3 1.1-1.3h.4c.2 0 .3-.1.3-.3V8.4c0-.2-.1-.3-.3-.3h-.2c-.6 0-1.1.3-1.4.9v-.5c0-.2-.2-.4-.4-.4H7c-.2 0-.4.2-.4.4v5.4c0 .2.2.4.4.4z" fill="#A6A4A4"/>
            </svg>
            
            <svg width="36" height="24" viewBox="0 0 36 24" className="text-neutral-300">
              <path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity="0.07"/>
              <path d="M33 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h30" fill="#fff"/>
              <path d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 1.11v4.39h-1.07v-4.39H9.4V7.16h4.5v1.11h-1.24zm1.66 4.14c-.55-.61-1.1-1.23-1.63-1.88-.52.64-1.08 1.28-1.62 1.88h-1.2c.78-.85 1.47-1.67 2.18-2.54v-2.95h1.07v2.93c.74.87 1.42 1.7 2.2 2.56h-1.19zm3.49-5.02v1.74h1.92v.93h-1.92v1.59h2.25v1.24h-3.42v-5.5h3.42v1.25h-2.25zm6.15 5.5h-1.23l-2.12-3.51-1.06 1.52v1.99h-1.2v-5.5h1.2v2.17c.81-1.13 1.47-2.17 2.28-3.3.57.89 1.28 1.97 1.96 3h-.03c.82 1.26 1.54 2.45 2.4 3.63z" fill="#000"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
