import { Link, useLocation } from "wouter";
import { Menu, X, Settings } from "lucide-react";
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
      {/* Container is standard width to keep menu tight and logo aligned left */}
      <div className="container mx-auto px-4 flex h-24 items-center justify-between">
        
        {/* Sleek Code-Based Secondary Logo - Solves legibility issues permanently */}
        <Link href="/">
          <a className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            {/* Blue gear graphic to match logo style */}
            <Settings className="w-9 h-9 text-[#004f9f]" strokeWidth={2.5} />
            <span className="text-3xl md:text-4xl font-black tracking-tight flex items-baseline">
              <span className="text-[#004f9f]">TotalBiz</span>
              <span className="text-[#2c3439] font-medium text-[0.95em] ml-1"> Support</span>
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className={`text-[15px] font-semibold transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-foreground/80"}`}>
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/services">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-transform hover:scale-105 font-bold" asChild>
              <a>
                Explore Services
              </a>
            </Button>
          </Link>
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

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background shadow-xl absolute w-full left-0 right-0">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`block text-lg font-medium py-3 border-b border-border/40 transition-colors ${location === link.href ? "text-primary" : "text-foreground/80"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <div className="pt-4">
              <Link href="/services">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-sm" asChild>
                  <a onClick={() => setIsOpen(false)}>
                    Explore Services
                  </a>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
