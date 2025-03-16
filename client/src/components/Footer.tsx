import { Link } from 'wouter';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-4 text-secondary">CelebStyle</h3>
            <p className="text-sm text-gray-300 mb-4">
              Authentic celebrity items with verified provenance, connecting stars with fans through exclusive merchandise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-['Montserrat'] font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/auctions">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">Auctions</span>
                </Link>
              </li>
              <li>
                <Link href="/celebrities">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">Celebrities</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-['Montserrat'] font-medium mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">Shipping Information</span>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <span className="text-sm text-gray-300 hover:text-secondary transition-colors cursor-pointer">Returns & Refunds</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-['Montserrat'] font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-secondary" />
                <span className="text-sm text-gray-300">123 Celebrity Lane, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-secondary" />
                <span className="text-sm text-gray-300">+1 (888) 555-CELEB</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-secondary" />
                <span className="text-sm text-gray-300">support@celebstyle.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CelebStyle. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/terms">
                <span className="text-xs text-gray-400 hover:text-secondary transition-colors cursor-pointer">Terms</span>
              </Link>
              <Link href="/privacy">
                <span className="text-xs text-gray-400 hover:text-secondary transition-colors cursor-pointer">Privacy</span>
              </Link>
              <Link href="/cookies">
                <span className="text-xs text-gray-400 hover:text-secondary transition-colors cursor-pointer">Cookies</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
