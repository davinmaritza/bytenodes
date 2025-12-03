import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingFAQ } from "@/components/PricingFAQ";
import { GuaranteeBanner } from "@/components/GuaranteeBanner";
import { AnimatedStats } from "@/components/AnimatedStats";
import { FloatingShapes } from "@/components/FloatingShapes";
import { TechnologyStack } from "@/components/TechnologyStack";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { GameSupportLogos } from "@/components/GameSupportLogos";

const pricingPlans = [
  {
    name: "Starter VPS",
    monthlyPrice: 1.50,
    yearlyPrice: 1.20,
    description: "Perfect for small projects and testing",
    features: [
      "1 CPU Core",
      "2GB RAM",
      "25GB SSD Storage",
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
    monthlyPrice: 3.00,
    yearlyPrice: 2.40,
    description: "Ideal for growing businesses",
    features: [
      "2 CPU Cores",
      "4GB RAM",
      "50GB SSD Storage",
      "3TB Bandwidth",
      "1 IPv4 Address",
      "KVM Virtualization",
      "Daily Backups",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Dedicated Server",
    monthlyPrice: 9.00,
    yearlyPrice: 7.20,
    description: "Maximum performance and control",
    features: [
      "4 CPU Cores",
      "8GB RAM",
      "100GB NVMe Storage",
      "Unlimited Bandwidth",
      "1 IPv4 Address",
      "Full Root Access",
      "DDoS Protection",
      "Managed Service Available",
    ],
    popular: false,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="relative pt-24 pb-20 px-4 overflow-hidden">
        {/* Background with gradients and shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full"></div>
        </div>

        {/* Floating Shapes */}
        <FloatingShapes />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <span className="text-primary text-sm font-semibold">🎉 Special Offer: Save up to 20% on yearly plans</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground animate-fade-in">
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in">
            Choose the perfect plan for your needs. All plans include 24/7 support, 99.9% uptime SLA, and free migration.
          </p>

          <AnimatedStats />

          {/* Billing Toggle */}
          <div className="mt-12 inline-flex items-center gap-4 bg-card rounded-full p-1.5 shadow-lg border border-border/50 backdrop-blur-sm animate-fade-in">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isYearly
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isYearly
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      <section className="py-16 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              
              return (
                <Card
                  key={index}
                  className={`p-8 relative hover:shadow-xl transition-all duration-300 ${
                    plan.popular
                      ? "border-primary shadow-lg scale-105 bg-gradient-to-b from-card via-card to-primary/5"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-bold rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-primary">{formatPrice(price)}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">/month</span>
                    {isYearly && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Billed {formatPrice(price * 12)} annually
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/client/register">
                    <Button
                      className={`w-full ${
                        plan.popular ? "shadow-md hover:shadow-lg" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>

          <GameSupportLogos />

          <div className="mt-16 text-center space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Looking for Specific Packages?</h3>
              <p className="text-muted-foreground mb-6">
                Explore our specialized pricing for Game Servers, VPS, RDP, and Discord Bots
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/pricing/servers">
                  <Button variant="default" size="lg" className="hover-lift">
                    Game Server Pricing
                  </Button>
                </Link>
                <Link to="/pricing/vps">
                  <Button variant="default" size="lg" className="hover-lift">
                    VPS & RDP Pricing
                  </Button>
                </Link>
                <Link to="/pricing/bot">
                  <Button variant="default" size="lg" className="hover-lift">
                    Discord Bot Hosting
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <p className="text-muted-foreground mb-4">
                Need a custom solution? Contact our sales team.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TechnologyStack />

      <GuaranteeBanner />

      <PricingFAQ />

      <Footer />
    </div>
  );
};

export default Pricing;