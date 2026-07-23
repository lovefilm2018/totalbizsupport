import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  FolderKanban, 
  Laptop, 
  Wifi, 
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
      icon: <FolderKanban className="w-8 h-8 text-primary" />,
      title: "Personal Project Management",
      description: "Planning a major home office setup, managing a complete digital migration, or coordinating suppliers during a home renovation? We bring 20+ years of structured project management experience to handle timelines, contractors, and setups for you.",
      bullets: [
        "Home office overhauls & high-performance workstation setups",
        "Coordinating tech suppliers & installers during home moves or build projects",
        "Personal digital decluttering, cloud migration & backup strategies",
        "Smart home, network & AV system project coordination"
      ]
    },
    {
      icon: <Laptop className="w-8 h-8 text-primary" />,
      title: "Home Tech & Device Troubleshooting",
      description: "Direct, patient support for laptops, desktops, tablets, and home computing without jargon or pushy sales pitches.",
      bullets: [
        "PC & laptop performance tuning & upgrades",
        "Software troubleshooting & virus removal",
        "Email recovery, setup & cross-device syncing",
        "Printer, scanner & accessory configuration"
      ]
    },
    {
      icon: <Wifi className="w-8 h-8 text-primary" />,
      title: "Home Networking & Connectivity",
      description: "Eliminate WiFi dead zones and enjoy fast, seamless internet in every room of your property.",
      bullets: [
        "Whole-home mesh WiFi installation & tuning",
        "Smart TV, streaming device & audio setup",
        "Home office network optimization",
        "Broadband supplier changeovers & router setup"
      ]
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Personal Digital Security & Backups",
      description: "Protecting your digital life, cherished photos, and personal information from data loss and online threats.",
      bullets: [
        "Password manager setup & security audits",
        "Automated photo & document cloud backups",
        "Scam prevention & digital safety guidance",
        "Secure device retirement & data wiping"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6">
            <HeartHandshake className="w-4 h-4" /> Personal & Home Support
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Personal Tech & Project Support. <br />
            <span className="text-accent">No Jargon, No Stress.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Whether you need a full home office setup managed, WiFi fixed, or a PC tuned up, get enterprise-grade expertise brought directly to your home.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
              <a>
                Get Help Today <ArrowRight className="ml-2 w-5 h-5" />
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
                className="bg-card p-8 rounded-xl border border-border shadow-sm flex flex-col justify-between"
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
