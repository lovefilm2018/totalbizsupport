import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <img 
              src="/logo.png" 
              alt="TotalBiz Support" 
              className="h-40 w-auto"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-foreground hover:text-accent transition-colors text-base font-medium">
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <a>
                Get Support
              </a>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-secondary/50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="text-foreground hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild>
                <a onClick={() => setIsOpen(false)}>
                  Get Support
                </a>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
