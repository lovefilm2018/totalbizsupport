import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wifi, Laptop, FileText, Home, ShieldCheck, Clock, Cpu } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PersonalSupport() {
  const personalServices = [
    {
      title: "Smart Home, Google Home & Nest Setup",
      icon: <Cpu className="w-8 h-8 text-primary" />,
      description: "Seamless installation and setup for Google Nest thermostats, video doorbells, Google Home/Alexa displays, smart lighting, and unified home automation.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Home Wi-Fi & Mesh Networks",
      icon: <Wifi className="w-8 h-8 text-primary" />,
      description: "Say goodbye to internet dead spots. We install mesh Wi-Fi networks, extend coverage to garden rooms or outbuildings, and get your devices running at full speed.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Device Setup & Troubleshooting",
      icon: <Laptop className="w-8 h-8 text-primary" />,
      description: "From setting up a new laptop, desktop, or tablet to fixing stubborn printer connection issues, we provide patient, jargon-free technical help.",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Self-Assessment & Personal Admin",
      icon: <FileText className="w-8 h-8 text-primary" />,
      description: "Drowning in paperwork? We assist with organising digital files, setting up budgeting spreadsheets, and filing your Self-Assessment tax return online.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Home Security & Smart Cameras",
      icon: <Home className="w-8 h-8 text-primary" />,
      description: "Protect your property with professionally installed, easy-to-use smart security cameras and locks that link straight to your smartphone.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Home Tech Support, Smart Home & Nest Setup Heathfield | TotalBiz</title>
        <meta name="description" content="Local, jargon-free home tech support in Heathfield & East Sussex. Google Home & Nest setup, smart home automation, Wi-Fi mesh networks, printer fixes, and Self-Assessment help." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-24 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
              Home Tech & Smart Home Support
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed mb-8">
              Reliable, jargon-free technical assistance for busy individuals in East Sussex. Whether you need your Google Nest configured, home Wi-Fi boosted, a printer sorted, or help filing your Self-Assessment, we get it working.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-transform hover:scale-105" asChild>
                <a>
                  Get Help Today <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">How We Help Around the Home</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional technical expertise delivered with patience, zero jargon, and straightforward pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalServices.map((service, index) => (
              <div key={index} className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mb-4 p-3 bg-secondary rounded-xl w-fit group-hover:bg-primary/10 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Trustworthy & Patient</h3>
              <p className="text-muted-foreground">We explain everything in plain English, taking the time to make sure you are confident using your devices and smart home gear.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Local On-Site Visits</h3>
              <p className="text-muted-foreground">Based in Heathfield, we can visit your home across East Sussex to mount cameras, setup Nest thermostats, or map Wi-Fi coverage.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Simple Hourly Rates</h3>
              <p className="text-muted-foreground">No ongoing contracts or hidden fees—just transparent hourly support whenever you need something sorted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to sort out your tech?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Get in touch to discuss what you need help with, and we'll give you a quick, straightforward quote.
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
