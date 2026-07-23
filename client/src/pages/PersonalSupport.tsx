import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  FolderKanban, 
  Cpu, 
  Laptop, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake 
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PersonalSupport() {
  const personalServices = [
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "Smart Home, Google Home & Nest Setup",
      description: "Transform your home with connected devices, voice automation, and smart security without the technical headaches.",
      bullets: [
        "Google Home, Nest Hub displays, speakers & multi-room audio",
        "Nest Thermostat setup, smart TRVs & energy-saving automation",
        "Smart doorbells, keyless door locks & outdoor security cameras",
        "Automated smart lighting, plugs, sensors & custom voice routines"
      ]
    },
    {
      icon: <FolderKanban className="w-8 h-8 text-primary" />,
      title: "Personal Project Management",
      description: "Planning a major home office overhaul, managing a complete digital migration, or coordinating tech suppliers during a house renovation? We bring 20+ years of corporate project delivery to keep your home projects stress-free.",
      bullets: [
        "Home office overhauls & ergonomic workstation setups",
        "Coordinating broadband, tech suppliers & installers during home moves",
        "Personal digital decluttering, cloud migration & backup strategies",
        "Whole-home mesh Wi-Fi network design & installation"
      ]
    },
    {
      icon: <Laptop className="w-8 h-8 text-primary" />,
      title: "Home Tech & Device Troubleshooting",
      description: "Direct, patient support for laptops, desktops, tablets, and home computing without technical jargon or pushy sales pitches.",
      bullets: [
        "PC & laptop performance tuning & hardware upgrades",
        "Software troubleshooting, email recovery & device syncing",
        "Printer, scanner, Smart TV & streaming stick configuration",
        "Painless virus removal & system cleanup"
      ]
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Personal Digital Security & Backups",
      description: "Protecting your digital life, cherished photos, and personal information from data loss and online threats.",
      bullets: [
        "Password manager setup & security health audits",
        "Automated photo & personal document cloud backups",
        "Scam prevention & digital safety guidance for all ages",
        "Secure device retirement & confidential data wiping"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Personal Tech Support, Google Home & Nest Setup | TotalBiz</title>
        <meta name="description" content="Friendly personal tech support in Heathfield & East Sussex: Google Home & Nest setup, Wi-Fi fixes, PC repairs, personal project management, and digital security." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6">
            <HeartHandshake className="w-4 h-4" /> Personal & Home Tech Support
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Personal Tech, Smart Home & Project Support. <br />
            <span className="text-accent">No Jargon, No Stress.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Whether you need a Google Home system configured, home Wi-Fi fixed, or a complex home office setup managed, get enterprise-grade expertise brought directly to your doorstep.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
              <a>
                Get Support Today <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personalServices.map((service, index) => (
              <div 
                key={index}
                className="bg-card p-8 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-md"
              >
                <div>
                  <div className="mb-4 p-3 bg-secondary rounded-lg w-fit">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5" asChild>
                    <a>Enquire About This</a>
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Local Focus Banner */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Based in Heathfield, Serving East Sussex
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We provide remote support across the UK and friendly in-person home visits for residents across Heathfield, Horam, Hailsham, Crowborough, Uckfield, and surrounding local areas.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
              <a>
                Contact Alex Directly <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
