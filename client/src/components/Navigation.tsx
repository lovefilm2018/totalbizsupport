import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo - Using your exact image file with increased size */}
        <Link href="/" className="block hover:opacity-80 transition-opacity cursor-pointer">
          <img 
            src="/logo.png" 
            alt="TotalBiz Support" 
            className="h-16 md:h-20 lg:h-24 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] font-semibold transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-foreground/80"}`}
            >
              {link.label}
            </Link>
          ))}
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-transform hover:scale-105" asChild>
            <Link href="/contact">
              Get Support
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background shadow-xl absolute w-full">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-lg font-medium py-3 border-b border-border/40 transition-colors ${location === link.href ? "text-primary" : "text-foreground/80"}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-sm" asChild>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Get Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
