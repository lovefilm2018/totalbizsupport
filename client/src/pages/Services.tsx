import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  BarChart3, 
  Users, 
  FolderKanban, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const services = [
    {
      id: "getting-online",
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Getting You Online & Visible",
      tagline: "Websites, local SEO, and digital storefronts that attract real local customers.",
      description: "Whether you need a brand-new website or want to dominate local search results in Heathfield and East Sussex, we get your business noticed online.",
      features: [
        "Custom, fast-loading business websites",
        "Google Business Profile setup & local SEO optimization",
        "E-commerce & online booking system integration",
        "Domain, professional email & hosting management"
      ]
    },
    {
      id: "tech-fixes",
      icon: <BarChart3 className="w-10 h-10 text-primary" />,
      title: "Tech, Equipment & Network Fixes",
      tagline: "Reliable WiFi, security hardware, and practical tech troubleshooting.",
      description: "From fixing dead-zone guest WiFi in a guest house to setting up smart security cameras or office hardware, we solve the tech issues holding you back.",
      features: [
        "Whole-property WiFi & mesh network installation",
        "CCTV & smart security camera setups",
        "Printer, scanner & network device configuration",
        "Hardware troubleshooting & workspace setups"
      ]
    },
    {
      id: "admin-bookkeeping",
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Admin Systems & Operational Setup",
      tagline: "Streamlined paperwork, digital invoicing, and Google Workspace.",
      description: "Stop drowning in operational chaos. We set up simple, automated digital tools so you can send invoices faster and keep paperwork organized.",
      features: [
        "Digital invoicing & quoting system implementation",
        "Google Workspace & cloud file setup",
        "Paperwork digitization & document management",
        "Standard Operating Procedures (SOPs) for small teams"
      ]
    },
    {
      id: "project-management",
      icon: <FolderKanban className="w-10 h-10 text-primary" />,
      title: "Project Management & Transformation",
      tagline: "20+ years of corporate project delivery scaled for small business.",
      description: "Planning a business move, changing software platforms, or launching a new service? We manage timelines, budgets, risk, and third-party vendors so your project is delivered on time, stress-free.",
      features: [
        "End-to-end project planning, timelines & budget management",
        "System migrations, software upgrades & data transfers",
        "Third-party vendor, contractor & supplier coordination",
        "Risk, issue & dependency management (RAID logs)"
      ]
    },
    {
      id: "strategy-operating-models",
      icon: <Lightbulb className="w-10 h-10 text-primary" />,
      title: "Business Strategy & Operating Models",
      tagline: "High-level strategic guidance and operational efficiency reviews.",
      description: "Get practical advice on how to structure your business operations, design efficient Target Operating Models (TOMs), and scale your operations without burnout.",
      features: [
        "Target Operating Model (TOM) design & process mapping",
        "Operational efficiency & workflow bottleneck reviews",
        "Growth readiness & scaling strategy",
        "Fractional COO / Operations Partner advisory"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Header Banner */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Core Services
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            From hands-on technical fixes and website launches to high-level business strategy and complex project delivery.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className="bg-card p-8 md:p-10 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="p-4 bg-secondary rounded-lg shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-accent tracking-wider uppercase mb-1 block">
                      Pillar 0{index + 1}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      {service.title}
                    </h2>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">
                      {service.tagline}
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/contact">
                      <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                        <a>
                          Discuss This Service <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/50 py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Not sure exactly what support you need?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let's have a friendly, no-obligation chat about your current challenges, and we'll help you find the most cost-effective solution.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
              <a>
                Book a Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
