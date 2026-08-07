import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Globe, Wrench, FileText, Lightbulb, FolderKanban, Cpu, Smartphone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Local asset imports
import strategyImg from "@/assets/1.avif";
import projectImg from "@/assets/2.avif";
import websitesAppsImg from "@/assets/websites-apps.jpg";
import adminImg from "@/assets/4.avif";
import techFixesImg from "@/assets/5.avif";
import smartHomeImg from "@/assets/6.avif";
import ctaBg from "@/assets/cta-bg.avif";

export default function Services() {
  const serviceCategories = [
    {
      title: "Strategy & Operating Models — Practical Consultancy & Advice",
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      description: "We provide high-level business guidance, Target Operating Model (TOM) design, and workflow optimization to help you make informed decisions.",
      features: [
        "Target Operating Model (TOM) design & process mapping",
        "Business strategy & operational efficiency reviews",
        "Technology recommendations & vendor selection",
        "One-on-one tech coaching & guidance for all skill levels",
        "Fractional COO & operational advisory for growing businesses",
      ],
      ideal: "Business owners, entrepreneurs, property investors & individuals navigating complex tech",
      image: strategyImg
    },
    {
      title: "Project Management & Transformation — Delivery & Migrations",
      icon: <FolderKanban className="w-8 h-8 text-primary" />,
      description: "Planning a software migration, premises move, or operational change? We bring 20+ years of corporate project experience to keep your project on time and within budget.",
      features: [
        "End-to-end project planning, timelines & budget management",
        "System migrations, platform upgrades & data transfers",
        "Third-party vendor, contractor & supplier management",
        "Risk, issue & dependency management (RAID logs)",
        "Operational readiness & change implementation",
      ],
      ideal: "Businesses launching new systems, undergoing relocations, or executing complex operational projects",
      image: projectImg
    },
    {
      title: "Getting You Online & Mobile Apps — Websites, iOS & Android",
      icon: <Globe className="w-8 h-8 text-primary" />,
      description: "We help you build and maintain a high-impact digital presence—from responsive custom websites to native & cross-platform iOS and Android mobile applications.",
      features: [
        "Custom website design & responsive web development",
        "Custom iOS & Android mobile phone & tablet app development",
        "Local search optimization (SEO) & Google Business setup",
        "E-commerce storefronts & direct booking systems",
        "Domain, business email & web hosting management",
      ],
      ideal: "Tradespeople, local businesses, property owners, sole traders, & entrepreneurs",
      image: websitesAppsImg
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
      image: adminImg
    },
    {
      title: "Tech & Equipment Fixes — Wi-Fi, Hardware & CCTV",
      icon: <Wrench className="w-8 h-8 text-primary" />,
      description: "From commercial networks to home office tech, we handle all your equipment and troubleshooting needs so everything works seamlessly.",
      features: [
        "Mesh Wi-Fi installation, dead-spot fixing & optimization for offices, guest houses & homes",
        "Security camera (CCTV) systems & network storage setups",
        "Laptop, desktop, printer & device troubleshooting & repairs",
        "Network setup, router configuration & cabling",
        "Software installation, updates & cloud backups",
      ],
      ideal: "Commercial offices, property managers, Airbnb hosts, home workers & individuals",
      image: techFixesImg
    },
    {
      title: "Smart Home & Automation — Google Home, Nest & AV",
      icon: <Cpu className="w-8 h-8 text-primary" />,
      description: "Transform your living space or property with seamlessly connected smart devices, multi-room audio, security hardware, and automated routines.",
      features: [
        "Google Home & Nest ecosystem installation (Hubs, Displays & Speakers)",
        "Smart climate control & Nest thermostat configuration",
        "Smart doorbells, security cameras & electronic keyless locks",
        "Automated smart lighting, plugs, sensors & custom voice routines",
        "Multi-room audio, smart TVs & seamless streaming setup",
      ],
      ideal: "Homeowners, Airbnb hosts, landlords, busy professionals & tech enthusiasts",
      image: smartHomeImg
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Tech Support, Smart Home, Web Design, Projects & Admin | TotalBiz</title>
        <meta name="description" content="Explore TotalBiz Support services: Google Home & Nest setup, custom web design, Wi-Fi setup, project management, bookkeeping, Self-Assessment filing, and tech support in East Sussex." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary/50 py-12 md:py-16 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl leading-relaxed">
            Corporate-grade expertise tailored for commercial businesses, home offices, smart properties, and individuals alike. Whatever you need sorting, we can help.
          </p>
        </div>
      </section>

      {/* Services Detail Loop */}
      <main className="flex-grow">
        {serviceCategories.map((service, index) => {
          const isImageRight = index % 2 === 0;

          return (
            <section key={index} className={`py-12 md:py-16 ${index % 2 !== 0 ? 'bg-secondary/20' : 'bg-background'}`}>
              <div className="container mx-auto px-4 max-w-6xl">
                <div className={`flex flex-col gap-8 lg:gap-16 items-center ${isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="space-y-3">
                      <div className="p-3 bg-secondary rounded-xl w-fit mb-4 shadow-sm border border-border/50">
                        {service.icon}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary">
                        {service.title}
                      </h2>
                      <p className="text-base text-foreground/80 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-primary">What's Included:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-secondary/50 p-5 rounded-lg border border-border/50 shadow-sm">
                      <p className="text-xs font-bold text-primary tracking-wider uppercase mb-1">Ideal For</p>
                      <p className="text-foreground/80 font-medium text-sm md:text-base">{service.ideal}</p>
                    </div>

                    <div className="pt-2">
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
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group border border-border/50">
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img 
                        src={service.image} 
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="800"
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
      <section className="py-16 md:py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay" 
          style={{ backgroundImage: `url('${ctaBg}')` }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
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
