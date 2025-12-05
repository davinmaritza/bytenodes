import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollAnimation, scrollVariants, staggerContainer } from "@/hooks/useScrollAnimation";
import { FaDiscord } from "react-icons/fa";

const botPackages = [
  { name: "Bot Starter", price: 0.60, ram: "512 MB", storage: "5 GB SSD", features: ["1 Bot Instance", "24/7 Uptime", "Auto Restart", "Basic Support"], note: "Perfect for small Discord bots", popular: false },
  { name: "Bot Basic", price: 1.20, ram: "1 GB", storage: "10 GB SSD", features: ["2 Bot Instances", "24/7 Uptime", "Auto Restart", "Priority Support"], note: "For growing Discord communities", popular: false },
  { name: "Bot Pro", price: 2.10, ram: "2 GB", storage: "20 GB SSD", features: ["5 Bot Instances", "24/7 Uptime", "Auto Restart", "Priority Support", "Custom Domain ($0.60)"], note: "Best for multiple bots", popular: true },
  { name: "Bot Enterprise", price: 3.60, ram: "4 GB", storage: "40 GB SSD", features: ["Unlimited Bot Instances", "24/7 Uptime", "Auto Restart", "Premium Support", "Custom Domain ($0.60)", "Database Included"], note: "For large-scale bot operations", popular: false }
];

const PricingBot = () => {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation();
  const { ref: packagesRef, isInView: packagesInView } = useScrollAnimation();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={scrollVariants}
        className="relative pt-32 pb-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <span className="text-primary text-sm font-semibold">🤖 Discord Bot Hosting Indonesia</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
            DISCORD <span className="text-primary">BOT</span> HOSTING
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Reliable and affordable hosting for your Discord bots. 24/7 uptime with auto-restart feature.
          </p>

          <div className="flex items-center justify-center gap-4">
            <FaDiscord className="w-12 h-12 text-[#5865F2]" />
          </div>
        </div>
      </motion.div>

      {/* Bot Packages */}
      <section ref={packagesRef} className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate={packagesInView ? "visible" : "hidden"}
            variants={scrollVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bot Hosting Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your Discord bot hosting needs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={packagesInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {botPackages.map((pkg, index) => (
              <motion.div key={index} variants={scrollVariants}>
                <Card
                  className={`p-6 relative hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 ${
                    pkg.popular
                      ? "border-primary shadow-lg border-2 bg-gradient-to-b from-card via-card to-primary/5"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold rounded-full shadow-md">
                      Best Value
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <Bot className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-3xl font-bold text-primary">{formatPrice(pkg.price)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{pkg.ram} RAM</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{pkg.storage}</span>
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground italic">{pkg.note}</p>
                    </div>
                  </div>

                  <Link to="/client/register">
                    <Button
                      className={`w-full ${
                        pkg.popular ? "shadow-md hover:shadow-lg" : ""
                      }`}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Order Now
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Bot Hosting?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">24/7 Uptime</h3>
              <p className="text-sm text-muted-foreground">Your bot stays online around the clock with our reliable infrastructure</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Auto Restart</h3>
              <p className="text-sm text-muted-foreground">Automatic restart if your bot crashes to ensure minimal downtime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Easy Setup</h3>
              <p className="text-sm text-muted-foreground">Simple deployment process to get your bot running in minutes</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingBot;