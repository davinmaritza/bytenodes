import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Starter VPS",
    price: "$19",
    period: "/month",
    description: "Perfect for small projects and testing",
    features: [
      "2 CPU Cores",
      "4GB RAM",
      "50GB SSD Storage",
      "1TB Bandwidth",
      "1 IPv4 Address",
      "KVM Virtualization",
      "Free Backup",
      "24/7 Support",
    ],
    popular: false,
  },
  {
    name: "Business VPS",
    price: "$49",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "4 CPU Cores",
      "8GB RAM",
      "150GB SSD Storage",
      "3TB Bandwidth",
      "2 IPv4 Addresses",
      "KVM Virtualization",
      "Daily Backups",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Dedicated Server",
    price: "$99",
    period: "/month",
    description: "Maximum performance and control",
    features: [
      "8 CPU Cores",
      "32GB RAM",
      "1TB NVMe Storage",
      "Unlimited Bandwidth",
      "5 IPv4 Addresses",
      "Full Root Access",
      "DDoS Protection",
      "Managed Service Available",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include 24/7 support and 99.9% uptime SLA.
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 relative ${
                  plan.popular
                    ? "border-cyan shadow-xl scale-105 glow-cyan"
                    : "border-border/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan text-white text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-cyan">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-cyan flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/client/register">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "gradient-cyan-navy glow-cyan"
                        : "border-cyan/30"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Need a custom solution? Contact our sales team.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-cyan/30">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
