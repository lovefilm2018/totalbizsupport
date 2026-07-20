import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function HowWeWork() {
  const models = [
    {
      title: "Hourly Support",
      icon: "⏱️",
      description: "Pay for what you use. Perfect for quick fixes and ad-hoc help.",
      price: "£50-75/hour",
      ideal: "One-off troubleshooting, quick advice, emergency fixes",
      features: [
        "Flexible scheduling",
        "No long-term commitment",
        "Perfect for emergencies",
        "Quick turnaround",
        "Ideal for testing services",
      ],
      cta: "Get Quick Support",
    },
    {
      title: "Project-Based",
      icon: "🎯",
      description: "Fixed scope, fixed price. Great for specific deliverables.",
      price: "Varies by project",
      ideal: "Website builds, installations, system setup, defined projects",
      features: [
        "Clear scope and timeline",
        "Fixed pricing",
        "Detailed project planning",
        "Regular updates",
        "Professional delivery",
      ],
      cta: "Discuss Your Project",
      featured: true,
    },
    {
      title: "Monthly Retainer",
      icon: "🤝",
      description: "Ongoing support with guaranteed hours each month.",
      price: "£300-1000+/month",
      ideal: "Ongoing tech support, admin help, regular consultancy",
      features: [
        "Guaranteed support hours",
        "Priority response times",
        "Predictable costs",
        "Ongoing relationship",
        "Best value for regular needs",
      ],
      cta: "Become a Partner",
    },
  ];

  const faqList = [
    {
      q: "Can I mix and match engagement models?",
      a: "Absolutely! Many clients start with hourly support to test the waters, then move to a retainer or project-based work as needs evolve.",
    },
    {
      q: "What if I'm not sure what I need?",
      a: "That's fine! We offer a free initial consultation to discuss your situation and recommend the best approach.",
    },
    {
      q: "Are there any long-term contracts?",
      a: "No. Retainer clients can pause or cancel anytime. We believe in earning your business every month.",
    },
    {
      q: "How quickly can you respond?",
      a: "Hourly support typically within 24 hours. Retainer clients get priority and faster response times.",
    },
    {
      q: "Do you offer support outside Heathfield?",
      a: "Yes! We serve Heathfield and East Sussex for on-site work, but offer remote support UK-wide via Google Meet.",
    },
    {
      q: "What if I need emergency support?",
      a: "Contact us immediately. We do our best to accommodate urgent requests, especially for retainer clients.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>How We Work | Hourly, Project & Retainer Support | TotalBiz</title>
        <meta name="description" content="Flexible pricing models for small businesses and sole traders. Choose hourly support, project-based rates, or monthly support retainers." />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <Navigation />

      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            How We Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Flexible engagement models designed to fit your business needs and budget.
          </p>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <div
                key={index}
                className={`rounded-lg border transition-all ${
                  model.featured
                    ? "bg-primary text-primary-foreground border-accent shadow-lg scale-105"
                    : "bg-card text-foreground border-border hover:border-accent/50"
                }`}
              >
                <div className="p-8">
                  <p className="text-5xl mb-4">{model.icon}</p>
                  <h3 className={`text-2xl font-bold mb-2 ${model.featured ? "text-primary-foreground" : "text-primary"}`}>
                    {model.title}
                  </h3>
                  <p className={`mb-4 ${model.featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                    {model.description}
                  </p>

                  <div className={`text-3xl font-bold mb-6 ${model.featured ? "text-accent" : "text-accent"}`}>
                    {model.price}
                  </div>

                  <div className={`mb-6 p-3 rounded ${model.featured ? "bg-primary/20" : "bg-secondary/50"}`}>
                    <p className={`text-sm font-semibold mb-1 ${model.featured ? "text-accent" : "text-accent"}`}>
                      IDEAL FOR
                    </p>
                    <p className={`text-sm ${model.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {model.ideal}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {model.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${model.featured ? "text-accent" : "text-accent"}`} />
                        <span className={`text-sm ${model.featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <Button
                      className="w-full"
                      variant={model.featured ? "default" : "outline"}
                      asChild
                    >
                      <a>
                        {model.cta} <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">
            Our Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description: "We discuss your needs, challenges, and goals to understand what you're trying to achieve.",
              },
              {
                step: "2",
                title: "Proposal",
                description: "We outline the scope, timeline, and cost for your specific situation.",
              },
              {
                step: "3",
                title: "Execution",
                description: "We get to work, keeping you updated throughout the process.",
              },
              {
                step: "4",
                title: "Delivery & Support",
                description: "We deliver results and provide ongoing support to ensure your success.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqList.map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-bold text-primary mb-3">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss which engagement model works best for you.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold" asChild>
              <a>
                Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}