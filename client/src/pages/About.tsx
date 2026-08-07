import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import alexPhoto from "@/assets/ap.avif";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>About Alex Poxon & TotalBiz Support | 20+ Years Corporate Experience</title>
        <meta name="description" content="Learn about TotalBiz Support founder Alex Poxon. 20+ years corporate experience bringing enterprise-grade IT, strategy, and business support to small businesses." />
      </Helmet>

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
                loading="eager"
                decoding="async"
                width="224"
                height="224"
                className="w-56 h-56 rounded-full border-4 border-accent shadow-md object-cover" 
              />
              <div>
                <h3 className="text-3xl font-bold text-primary mb-1">Alex Poxon</h3>
                <p className="text-xl text-accent font-medium">Founder & Principal Consultant</p>
                <p className="text-muted-foreground mt-2">Heathfield, East Sussex</p>
              </div>

              <div className="pt-4 border-t border-border/80 w-full flex flex-col items-center">
                <p className="font-['Caveat',cursive] text-2xl text-accent font-bold transform -rotate-2 mb-1">
                  Contact me directly...
                </p>
                <a 
                  href="mailto:alex@totalbiz.co.uk" 
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-lg"
                >
                  <Mail className="w-4 h-4 text-accent" /> alex@totalbiz.co.uk
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-lg h-96 flex items-center justify-center border border-border">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663750581504/BdzQBzcMiXv6q6V29RfF3C/about-illustration-YrBQnV4AkzXnEXQRds9uvA.webp"
                alt="Partnership and trust"
                loading="lazy"
                decoding="async"
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
                Think of us as your all-in-one business support and tech partner. We bring corporate-grade thinking, security awareness, and process discipline to small business problems. But we also get our hands dirty and actually fix things.
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

      {/* Background Section & Corporate Timeline */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent mb-3 tracking-wider uppercase">Proven Track Record</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Corporate Career Timeline
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              20+ years of high-stakes corporate experience applied directly to small business success.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Vertical Timeline (8 Cols) */}
            <div className="lg:col-span-7 space-y-8 relative before:absolute before:inset-0 before:left-4 before:md:left-6 before:w-0.5 before:bg-border">
              {[
                {
                  company: "HSBC",
                  period: "20 Years",
                  badge: "Financial Services",
                  role: "Business & IT Project Management",
                  desc: "Led major IT infrastructure, business transformation, and complex change delivery for one of the world's largest banking institutions.",
                },
                {
                  company: "eBay",
                  period: "Corporate Restructuring",
                  badge: "E-Commerce & Tech",
                  role: "Programme & Divestment Management",
                  desc: "Delivered complex operational separation, data migration, and technology transition projects during a major divestment programme.",
                },
                {
                  company: "Schroders & Benchmark Capital",
                  period: "Asset Management",
                  badge: "Target Operating Models",
                  role: "Operational Readiness Lead",
                  desc: "Designed Target Operating Models (TOM), workflow efficiency mapping, and platform readiness for leading wealth management firms.",
                },
                {
                  company: "Gumtree",
                  period: "Digital Marketplace",
                  badge: "Senior Management",
                  role: "Operations & Change Delivery",
                  desc: "Drove digital platform efficiency, cross-functional team alignment, and operational stability for the UK's top classifieds portal.",
                },
                {
                  company: "Boots PLC & Topman / Topshop",
                  period: "Retail Leadership",
                  badge: "Commercial Operations",
                  role: "Retail Store & Team Management",
                  desc: "Managed high-volume retail operations, customer experience standards, and commercial performance across major high-street brands.",
                },
              ].map((item, index) => (
                <div key={index} className="relative flex gap-6 items-start pl-10 md:pl-14 group">
                  {/* Timeline Icon Node */}
                  <div className="absolute left-0 top-1 w-8 h-8 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center transition-all shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  </div>

                  <div className="bg-card p-6 rounded-xl border border-border/80 shadow-sm hover:shadow-md hover:border-primary/40 transition-all w-full space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-xl font-bold text-primary">{item.company}</h4>
                      <span className="text-xs font-semibold px-3 py-1 bg-secondary text-accent rounded-full border border-border/50">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-accent">{item.role} · <span className="text-muted-foreground font-normal">{item.period}</span></p>
                    <p className="text-sm text-foreground/80 leading-relaxed pt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Capabilities Sidebar (5 Cols) */}
            <div className="lg:col-span-5 bg-secondary/40 p-8 rounded-2xl border border-border/80 space-y-6 sticky top-28">
              <h3 className="text-2xl font-bold text-primary">Core Expertise</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We combine deep technical capabilities with practical business sense to deliver enterprise quality at small business prices.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Business Strategy & Operating Models (TOM)",
                  "IT Infrastructure & System Migrations",
                  "Custom Website & Mobile App Development",
                  "Smart Home & Google Nest Integrations",
                  "Commercial Bookkeeping & Self-Assessments",
                  "Wi-Fi Networks, Hardware & CCTV Security",
                  "Google Workspace & Cloud Automation",
                  "Vendor Management & Project Delivery",
                ].map((skill, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                    <span className="w-2 h-2 bg-accent rounded-full shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-border">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" asChild>
                  <Link href="/services">
                    Explore Our Services <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
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
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold" asChild>
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
