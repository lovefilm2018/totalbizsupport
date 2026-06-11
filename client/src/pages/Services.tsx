import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const serviceCategories = [
    {
      title: "Getting You Online",
      icon: "🌐",
      description: "We help you build and maintain your digital presence, ensuring you're discoverable and professional online.",
      features: [
        "Custom website design and development",
        "Local search optimization (SEO)",
        "Google Business Profile setup",
        "Social media profile creation",
        "E-commerce and digital storefronts",
      ],
      ideal: "Tradespeople, local businesses, property owners, sole traders",
    },
    {
      title: "Tech & Equipment Fixes",
      icon: "🔧",
      description: "From WiFi networks to security cameras, we handle all your technology needs so you can focus on your business.",
      features: [
        "WiFi mesh network installation and optimization",
        "Security camera systems setup",
        "Laptop and device repairs",
        "Network setup and configuration",
        "Device troubleshooting and support",
        "Software installation and updates",
      ],
      ideal: "Property owners, Airbnb hosts, small offices, busy individuals",
    },
    {
      title: "Admin & Bookkeeping",
      icon: "📊",
      description: "We organize your business operations, from invoicing to bookkeeping, so you're always in control of your finances.",
      features: [
        "Invoicing system setup",
        "Bookkeeping support and organization",
        "Paperwork and file organization",
        "Google Workspace configuration",
        "Business process automation",
        "Document management systems",
      ],
      ideal: "Small businesses, sole traders, property managers, service providers",
    },
    {
      title: "Strategy & Advice",
      icon: "💡",
      description: "We provide practical business guidance and strategic advice to help you make informed decisions and grow.",
      features: [
        "Business strategy consultancy",
        "Project planning and management",
        "Operational efficiency reviews",
        "Technology recommendations",
        "Problem-solving and troubleshooting",
        "One-on-one business guidance",
      ],
      ideal: "Entrepreneurs, business owners, property investors, growing companies",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            We've organized our expertise into four core service areas. Whatever your business needs, we can help.
          </p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {serviceCategories.map((service, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Alternating layout for visual interest */}
                {index % 2 === 0 ? (
                  <>
                    {/* Text on left */}
                    <div>
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h2 className="text-4xl font-bold text-primary mb-4">{service.title}</h2>
                      <p className="text-lg text-muted-foreground mb-8">{service.description}</p>

                      <div className="mb-8">
                        <h3 className="font-semibold text-primary mb-4">What's Included:</h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-8 p-4 bg-secondary/50 rounded-lg border border-border">
                        <p className="text-sm font-semibold text-accent mb-1">IDEAL FOR</p>
                        <p className="text-muted-foreground">{service.ideal}</p>
                      </div>

                      <Link href="/contact">
                        <Button className="bg-accent hover:bg-accent/90 text-white" asChild>
                          <a>
                            Learn More <ArrowRight className="ml-2 w-5 h-5" />
                          </a>
                        </Button>
                      </Link>
                    </div>

                    {/* Image placeholder on right */}
                    <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-lg h-96 flex items-center justify-center border border-border">
                      <p className="text-6xl">{service.icon}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image placeholder on left */}
                    <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-lg h-96 flex items-center justify-center border border-border">
                      <p className="text-6xl">{service.icon}</p>
                    </div>

                    {/* Text on right */}
                    <div>
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h2 className="text-4xl font-bold text-primary mb-4">{service.title}</h2>
                      <p className="text-lg text-muted-foreground mb-8">{service.description}</p>

                      <div className="mb-8">
                        <h3 className="font-semibold text-primary mb-4">What's Included:</h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-8 p-4 bg-secondary/50 rounded-lg border border-border">
                        <p className="text-sm font-semibold text-accent mb-1">IDEAL FOR</p>
                        <p className="text-muted-foreground">{service.ideal}</p>
                      </div>

                      <Link href="/contact">
                        <Button className="bg-accent hover:bg-accent/90 text-white" asChild>
                          <a>
                            Learn More <ArrowRight className="ml-2 w-5 h-5" />
                          </a>
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get in touch and we'll discuss your specific needs to find the perfect solution.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white" asChild>
              <a>
                Contact Us <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
