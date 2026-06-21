import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import alexPhoto from "@/assets/ap.jpg";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            About TotalBiz Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A business built on 20+ years of experience and a passion for helping small businesses thrive.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">The Story</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                After 20 years in the corporate world—including two decades at HSBC in both business and IT project management roles, followed by delivering complex programmes for large corporates such as eBay, Gumtree, Schroders and Benchmark Capital, and extensive retail management experience (including Boots PLC and Topman / Topshop)—I decided to take a different path.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The corporate environment, with its rigid hierarchies and slow processes, wasn't serving me well. I needed something more flexible, more human, and more direct. So I stepped back to focus on my health and rediscover what I actually enjoy doing.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                That's when I realised: small business owners and sole traders are drowning. They're wearing too many hats, juggling tech, marketing, invoicing, and a hundred other things. They need someone they can trust—someone with real experience who can actually fix things, not just talk about them.
              </p>
            </div>
            
            {/* Alex Poxon Profile Box */}
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm flex flex-col items-center text-center space-y-6">
              <img 
                src={alexPhoto} 
                alt="Alex Poxon, Founder of TotalBiz Support"
                className="w-56 h-56 rounded-full border-4 border-accent shadow-md object-cover" 
              />
              <div>
                <h3 className="text-3xl font-bold text-primary mb-1">Alex Poxon</h3>
                <p className="text-xl text-accent font-medium">Founder & Principal Consultant</p>
                <p className="text-muted-foreground mt-2">Heathfield, East Sussex</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-lg h-96 flex items-center justify-center border border-border">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663750581504/BdzQBzcMiXv6q6V29RfF3C/about-illustration-YrBQnV4AkzXnEXQRds9uvA.webp"
                alt="Partnership and trust"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Why TotalBiz Support?</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I started helping friends who own local businesses or investment properties. They needed everything: a website, WiFi optimization, security cameras, invoicing setup, social media, and general business advice. I realized I could do all of it—and do it well.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                That's the essence of TotalBiz Support. We're not a one-trick pony. We're a one-stop shop for small businesses that need reliable, experienced support across multiple areas.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Think of us as your fractional COO and CTO rolled into one. We bring corporate-grade thinking, security awareness, and process discipline to small business problems. But we also get our hands dirty and actually fix things.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-secondary/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">
            Our Philosophy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Results Over Jargon",
                description: "We speak your language, not tech-speak. You should always understand what we're doing and why.",
              },
              {
                icon: "🤝",
                title: "Partnership, Not Transactions",
                description: "We're invested in your success. We're not here to sell you things you don't need.",
              },
              {
                icon: "⚡",
                title: "Practical & Hands-On",
                description: "We don't just advise. We roll up our sleeves and actually do the work.",
              },
              {
                icon: "💰",
                title: "Fair Pricing",
                description: "You get corporate-grade expertise at small business prices. No hidden fees, no surprises.",
              },
              {
                icon: "🔒",
                title: "Security & Reliability",
                description: "Your data and business are important. We treat them with the same care as a bank would.",
              },
              {
                icon: "📈",
                title: "Growth Mindset",
                description: "We help you not just survive, but thrive. Your success is our success.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-background p-8 rounded-lg border border-border">
                <p className="text-4xl mb-4">{item.icon}</p>
                <h3 className="font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">
            The Background
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Corporate Experience</h3>
              <ul className="space-y-4">
                {[
                  { company: "HSBC", role: "20 years in business and IT project management" },
                  { company: "eBay", role: "Supporting eBay through a complex divestment programme" },
                  { company: "Schroders & Benchmark Capital", role: "Managing Operational Readiness and Target Operating Models (TOM)" },
                  { company: "Gumtree", role: "Senior management position" },
                  { company: "Retail Management", role: "Management roles at Boots PLC and Topman / Topshop" },
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-primary">{item.company}</p>
                      <p className="text-muted-foreground text-sm">{item.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Core Expertise</h3>
              <ul className="space-y-4">
                {[
                  "Business strategy and operations",
                  "Technology and IT project management",
                  "Website design and development",
                  "Digital marketing and SEO",
                  "Bookkeeping and financial administration",
                  "Operational Efficiency",
                  "Target Operating Model (TOM)",
                  "Property management and optimization",
                  "Network setup and security",
                  "Google Workspace and business tools",
                ].map((skill, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{skill}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Focus Section */}
      <section className="bg-secondary/50 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Local & UK-Wide Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Based in Heathfield, East Sussex, we provide hands-on support to local businesses and remote support to clients across the UK.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-lg border border-border">
              <p className="text-3xl mb-4">📍</p>
              <h3 className="text-xl font-bold text-primary mb-3">Local On-Site Support</h3>
              <p className="text-muted-foreground">
                Heathfield, East Sussex and surrounding areas. Perfect for WiFi setup, camera installation, and hands-on tech support.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg border border-border">
              <p className="text-3xl mb-4">🌐</p>
              <h3 className="text-xl font-bold text-primary mb-3">UK-Wide Remote Support</h3>
              <p className="text-muted-foreground">
                Website design, bookkeeping, strategy, and consultancy via Google Meet. Available anywhere in the UK.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're local or across the UK, we're here to help your business thrive.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold" asChild>
              <a>
                Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
