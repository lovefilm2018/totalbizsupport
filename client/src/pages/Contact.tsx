import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you'd send this to a backend
      console.log("Form submitted:", formData);

      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Have a question or ready to get started? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">
                For general inquiries and project discussions.
              </p>
              <a
                href="mailto:hello@totalbiz.co.uk"
                className="text-accent hover:text-accent/80 font-semibold"
              >
                hello@totalbiz.co.uk
              </a>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Location</h3>
              <p className="text-muted-foreground mb-4">
                Based in Heathfield, East Sussex. Available for local and remote support.
              </p>
              <p className="text-accent font-semibold">Heathfield, East Sussex</p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Response Time</h3>
              <p className="text-muted-foreground mb-4">
                We typically respond within 24 hours. Retainer clients get priority.
              </p>
              <p className="text-accent font-semibold">24-hour response</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary/50 p-8 md:p-12 rounded-lg border border-border">
              <h2 className="text-3xl font-bold text-primary mb-8">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                    Phone (Optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-2">
                    What's This About?
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Website design, tech support, consultation"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your needs, challenges, or questions..."
                    required
                    rows={6}
                    className="bg-background border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We'll get back to you as soon as possible. Thank you for reaching out!
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">
            Before You Contact Us
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-3">💡 Quick Question?</h3>
              <p className="text-muted-foreground">
                Check our Services and How We Work pages for common questions about what we offer and how we work.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-3">🚀 Ready to Start a Project?</h3>
              <p className="text-muted-foreground">
                Great! Let us know the scope, timeline, and any specific requirements. We'll provide a detailed proposal.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-3">🤔 Not Sure What You Need?</h3>
              <p className="text-muted-foreground">
                That's perfectly fine. We offer a free initial consultation to discuss your situation and recommend the best approach.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-3">⏰ Urgent Issue?</h3>
              <p className="text-muted-foreground">
                If you're a retainer client, contact us directly for priority support. For others, we'll respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Get Started
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you have a quick question or a complex project, we're ready to help.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold" asChild>
            <a href="mailto:totalbizsupport@gmail.com">
              Send us an Email
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
