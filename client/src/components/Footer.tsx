import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="TotalBiz Support" 
                className="h-32 w-auto"
              />
            </div>
            <p className="text-base opacity-90">
              Enterprise-grade support for small businesses, sole traders, and property owners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link href="/services">
                  <a className="hover:text-accent transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/how-we-work">
                  <a className="hover:text-accent transition-colors">How We Work</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-accent transition-colors">About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-accent transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-base">
              <li className="hover:text-accent transition-colors cursor-pointer">Getting You Online</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Tech & Equipment Fixes</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Admin & Bookkeeping</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Strategy & Advice</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:totalbizsupport@gmail.com" className="hover:text-accent transition-colors">
                  totalbizsupport@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span>Heathfield, East Sussex</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <span>Available for consultations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-base opacity-80">
            <p>&copy; {currentYear} TotalBiz Support. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
