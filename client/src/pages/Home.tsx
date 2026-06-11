import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3, Users, Lightbulb } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const services = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Getting You Online",
      description: "Websites, local search visibility, and digital storefronts that bring in customers.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Tech & Equipment Fixes",
      description: "WiFi networks, security cameras, device setup, and all your tech troubleshooting.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Admin & Bookkeeping",
      description: "Invoicing systems, paperwork organization, and Google Workspace setup.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Strategy & Advice",
      description: "Business guidance, project planning, and practical consultancy.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663750581504/BdzQBzcMiXv6q6V29RfF3C/hero-background-8y8Pu8nxZFBPuCxpEDWsLX.webp')`,
          }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Enterprise-Grade Support.
              <span className="text-accent"> Small Business Prices.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              From high-level business strategy to fixing the office printer, TotalBiz Support helps small businesses, property owners, sole traders, and busy individuals get things sorted without jargon, stress, or unnecessary cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 transition-transform hover:scale-105" asChild>
                  <a>
                    Get Support Today <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 transition-transform hover:scale-105" asChild>
                  <a>
                    Explore Services
                  </a>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              After 20 years driving IT projects and business strategy for corporate giants like HSBC, eBay, and Gumtree, alongside extensive retail management at Boots and Topshop, I realised something important: sole traders and small businesses can be completely overwhelmed by the operational chaos.
            </p>
            <p>
              You don't need a separate IT guy, an accountant, a web developer, and a business coach. You need a single, reliable partner who understands how it all connects.
            </p>
            <p className="font-medium text-slate-900 dark:text-white">
              Whether you run a guest house and are struggling with WiFi networks for your guests, or a local tradesperson who needs an invoicing system, or a sole trader looking to get online, TotalBiz Support exists to handle the chaos, so you can get back to running your business.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-accent mb-2 tracking-wider">TRUSTED BY</p>
              <p className="text-2xl font-bold text-primary">20+ Years</p>
              <p className="text-muted-foreground">of corporate experience</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-accent mb-2 tracking-wider">BACKGROUND</p>
              <p className="text-2xl font-bold text-primary">HSBC, eBay, Gumtree</p>
              <p className="text-muted-foreground">Boots & Topshop</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-accent mb-2 tracking-wider">EXPERTISE</p>
              <p className="text-2xl font-bold text-primary">Multi-Disciplinary</p>
              <p className="text-muted-foreground">tech, business, property</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              How We Can Help
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've simplified our services into four core areas. Whatever you need, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <div className="mb-4 p-3 bg-secondary rounded-lg w-fit group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 transition-transform hover:scale-105" asChild>
                <a>
                  View All Services <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="bg-secondary/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible engagement models to fit your needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Hourly Support",
                description: "Perfect for one-off fixes, troubleshooting, and quick advice.",
                icon: "⏱️",
              },
              {
                title: "Project-Based",
                description: "Ideal for websites, installations, and defined deliverables.",
                icon: "🎯",
              },
              {
                title: "Monthly Retainer",
                description: "Ongoing support hours as your fractional tech/admin partner.",
                icon: "🤝",
              },
            ].map((model, index) => (
              <div key={index} className="bg-background p-8 rounded-lg border border-border text-center shadow-sm">
                <p className="text-4xl mb-4">{model.icon}</p>
                <h3 className="text-xl font-bold text-primary mb-3">{model.title}</h3>
                <p className="text-muted-foreground">{model.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/how-we-work">
              <Button size="lg" className="bg-primary hover:bg-primary/90 transition-transform hover:scale-105" asChild>
                <a>
                  Learn More <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Things Sorted?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you need a quick fix or ongoing support, we're here to help. Get in touch today.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-xl transition-transform hover:scale-105" asChild>
              <a>
                Start a Conversation <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
