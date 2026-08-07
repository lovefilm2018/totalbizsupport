import { Helmet } from "react-helmet-async";
import { Mail, MessageCircle, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Contact() {
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const FORMSPREE_URL = "https://formspree.io/f/xjgdezbz";

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        toast.success("Message sent! We will get back to you shortly.");
        form.reset();
      } else {
        toast.error("Oops! There was a problem sending your message.");
      }
    } catch (error) {
      toast.error("Oops! There was a network error.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Contact TotalBiz Support | Heathfield, East Sussex & Remote UK</title>
        <meta name="description" content="Contact TotalBiz Support for small business technology, web development, bookkeeping and administrative support in Heathfield, East Sussex and across the UK." />
      </Helmet>

      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to get things sorted? Drop us a message below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            <div className="bg-card p-8 rounded-lg border border-border flex items-start gap-4">
              <div className="p-3 bg-secondary rounded-lg text-accent">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Email Us</h3>
                <p className="text-muted-foreground mb-2">For general enquiries and support requests.</p>
                <a href="mailto:contact@totalbiz.co.uk" className="text-accent hover:underline font-medium">
                  contact@totalbiz.co.uk
                </a>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border flex items-start gap-4">
              <div className="p-3 bg-secondary rounded-lg text-[#25D366]">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Phone & WhatsApp</h3>
                <p className="text-muted-foreground mb-2">Reach out directly via phone or WhatsApp.</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:+447799538311" className="text-accent hover:underline font-medium flex items-center gap-1">
                    <Phone className="w-4 h-4 inline" /> +44 7799 538311 (Direct Call)
                  </a>
                  <a href="https://wa.me/447799538311" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline font-medium">
                    +44 7799 538311 (WhatsApp)
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border flex items-start gap-4">
              <div className="p-3 bg-secondary rounded-lg text-accent">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Location</h3>
                <p className="text-muted-foreground">
                  Based in Heathfield, East Sussex, UK.<br />
                  Supporting businesses locally and remotely across the UK.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-primary">Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-primary">Email</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-primary">Subject</label>
                <input type="text" id="subject" name="subject" required className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" placeholder="How can we help?" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-primary">Message</label>
                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none" placeholder="Tell us a bit about what you need sorting..."></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-white">
                Send Message <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}