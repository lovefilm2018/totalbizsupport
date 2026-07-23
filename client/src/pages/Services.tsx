import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Globe, Wrench, FileText, Lightbulb, FolderKanban } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const serviceCategories = [
    {
      title: "Getting You Online — Websites & Local Visibility",
      icon: <Globe className="w-8 h-8 text-primary" />,
      description: "We help you build and maintain a professional digital presence, ensuring you're discoverable and stand out online.",
      features: [
        "Custom website design and development",
        "Local search optimization (SEO) & Google Business setup",
        "Social media profile creation & management",
        "E-commerce storefronts & direct booking systems",
        "Domain, email & web hosting management",
      ],
      ideal: "Tradespeople, local businesses, property owners, sole traders, & entrepreneurs",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Tech & Equipment Fixes — Wi-Fi, Hardware & CCTV",
      icon: <Wrench className="w-8 h-8 text-primary" />,
      description: "From commercial networks to home office tech, we handle all your equipment and troubleshooting needs so everything works seamlessly.",
      features: [
        "Mesh Wi-Fi installation, dead-spot fixing & optimization for offices, guest houses & homes",
        "Security camera (CCTV) systems & smart tech setup",
        "Laptop, desktop, printer & device troubleshooting & repairs",
        "Network setup, router configuration & cabling",
        "Software installation, updates & cloud backups",
      ],
      ideal: "Commercial offices, property managers, Airbnb hosts, home workers & individuals",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Admin & Bookkeeping — Invoicing, Tax & Workspace Setup",
      icon: <FileText className="w-8 h-8 text-primary" />,
      description: "We organize your day-to-day operations and paperwork—from commercial bookkeeping to personal Self-Assessments—so you stay in total control.",
      features: [
        "Self-Assessment tax return filing assistance & digital account setup",
        "Invoicing system setup & bookkeeping organization",
        "Paperwork, digital file & document management systems",
        "Google Workspace configuration for business & personal use",
        "Process automation & event operational support",
      ],
      ideal: "Small businesses, sole traders, busy professionals & individuals needing admin help",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Project Management & Transformation — Delivery & Migrations",
      icon: <FolderKanban className="w-8 h-8 text-primary" />,
      description: "Planning a software migration, premises move, or operational change? We bring 20+ years of corporate project experience to keep your project on time and within budget[cite: 1].",
      features: [
        "End-to-end project planning, timelines & budget management[cite: 1]",
        "System migrations, platform upgrades & data transfers[cite: 1]",
        "Third-party vendor, contractor & supplier management[cite: 1]",
        "Risk, issue & dependency management (RAID logs)[cite: 1]",
        "Operational readiness & change implementation[cite: 1]",
      ],
      ideal: "Businesses launching new systems, undergoing relocations, or executing complex operational projects[cite: 1]",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Strategy & Operating Models — Practical Consultancy & Advice",
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      description: "We provide high-level business guidance, Target Operating Model (TOM) design, and workflow optimization to help you make informed decisions[cite: 1].",
      features: [
        "Target Operating Model (TOM) design & process mapping[cite: 1]",
        "Business strategy & operational efficiency reviews[cite: 1]",
        "Technology recommendations & vendor selection[cite: 1]",
        "One-on-one tech coaching & guidance for all skill levels",
        "Fractional COO & operational advisory for growing businesses",
      ],
      ideal: "Business owners, entrepreneurs, property investors & individuals navigating complex tech",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Tech Support, Web Design, Project Management & Admin Services | TotalBiz</title>
        <meta name="description" content="Explore TotalBiz Support services: custom web design, Wi-Fi setup, CCTV, project management, bookkeeping, Self-Assessment filing, and tech support in East Sussex." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-24 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
            Our Services
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl leading-relaxed">
            Corporate-grade expertise tailored for commercial businesses, home offices, and individuals alike. Whatever you need sorting, we can help.
          </p>
        </div>
      </section>

      {/* Services Detail Loop */}
      <main className="flex-grow">
        {serviceCategories.map((service, index) => {
          const isImageRight = index % 2 === 0;

          return (
            <section key={index} className={`py-20 md:py-32 ${index % 2 !== 0 ? 'bg-secondary/20' : 'bg-background'}`}>
              <div className="container mx-auto px-4 max-w-6xl">
                <div className={`flex flex-col gap-12 lg:gap-20 items-center ${isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-4">
                      <div className="p-3 bg-secondary rounded-xl w-fit mb-6 shadow-sm border border-border/50">
                        {service.icon}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        {service.title}
                      </h2>
                      <p className="text-lg text-foreground/80 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-primary">What's Included:</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground/80">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-secondary/50 p-6 rounded-lg border border-border/50 shadow-sm">
                      <p className="text-sm font-bold text-primary tracking-wider uppercase mb-1">Ideal For</p>
                      <p className="text-foreground/80 font-medium">{service.ideal}</p>
                    </div>

                    <div className="pt-4">
                      <Link href="/contact">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-transform hover:scale-105" asChild>
                          <a>
                            Learn More <ArrowRight className="ml-2 w-5 h-5" />
                          </a>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Image Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group border border-border/50">
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get in touch and we'll discuss your specific needs to find the perfect solution.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-xl transition-transform hover:scale-105" asChild>
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
