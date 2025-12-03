import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollAnimation, scrollVariants, staggerContainer } from "@/hooks/useScrollAnimation";
import { GameSupportLogos } from "@/components/GameSupportLogos";

// Minecraft logo as inline SVG component
const MinecraftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h16V4H4zm2 2h4v4H6V6zm0 6h4v4H6v-4zm6-6h4v4h-4V6zm0 6h4v4h-4v-4zm-3 3h2v2H9v-2z" className="text-primary"/>
  </svg>
);

const sharedPackages = [
  {
    name: "Shared 1",
    price: 5000,
    ram: "1 GB",
    storage: "6 GB",
    note: "Shared Resource / Fair Usage"
  },
  {
    name: "Shared 2",
    price: 10000,
    ram: "2 GB",
    storage: "6 GB",
    note: "Shared Resource / Fair Usage"
  },
  {
    name: "Shared 3",
    price: 15000,
    ram: "3 GB",
    storage: "9 GB",
    note: "Shared Resource / Fair Usage"
  },
  {
    name: "Shared 4",
    price: 20000,
    ram: "4 GB",
    storage: "9 GB",
    note: "Shared Resource / Fair Usage",
    popular: true
  }
];

const premiumPackages = [
  {
    name: "Premium 1",
    price: 38000,
    ram: "2.5 GB",
    storage: "6 GB",
    note: "Dedicated Performance / Anti Lag",
    popular: false
  },
  {
    name: "Premium 2",
    price: 61000,
    ram: "4 GB",
    storage: "10 GB",
    note: "Dedicated Performance / Anti Lag",
    popular: true
  },
  {
    name: "Premium 3",
    price: 78000,
    ram: "6 GB",
    storage: "14 GB",
    note: "Dedicated Performance / Anti Lag",
    popular: false
  },
  {
    name: "Premium 4",
    price: 101000,
    ram: "8 GB",
    storage: "18 GB",
    note: "Dedicated Performance / Anti Lag",
    popular: false
  },
  {
    name: "Premium 5",
    price: 134000,
    ram: "10 GB",
    storage: "22 GB",
    note: "Dedicated Performance / Anti Lag",
    popular: false
  }
];

const PricingServer = () => {
  const [selectedCategory, setSelectedCategory] = useState<"shared" | "premium">("shared");
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation();
  const { ref: sharedRef, isInView: sharedInView } = useScrollAnimation();
  const { ref: premiumRef, isInView: premiumInView } = useScrollAnimation();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const renderPackages = (packages: any[], inView: boolean) => {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
      >
        {packages.map((pkg, index) => (
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
                  Best Seller
                </div>
              )}

              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 text-primary">
                  <MinecraftIcon />
                </div>
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
                  <span className="text-sm">{pkg.storage} Storage</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">DDoS Protection</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">24/7 Support</span>
                </div>
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
    );
  };

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
            <span className="text-primary text-sm font-semibold">🎮 Game Server Hosting Indonesia</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
            GAME <span className="text-primary">SERVER</span> PACKAGES
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            High-quality game server hosting with the best hardware. From Shared to Premium with dedicated performance.
          </p>

          {/* Category Toggle */}
          <div className="inline-flex items-center gap-2 bg-card rounded-lg p-1.5 shadow-lg border border-border/50 backdrop-blur-sm">
            <button
              onClick={() => setSelectedCategory("shared")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "shared"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Shared
            </button>
            <button
              onClick={() => setSelectedCategory("premium")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "premium"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Premium
            </button>
          </div>
        </div>
      </motion.div>

      {/* Shared Packages */}
      {selectedCategory === "shared" && (
        <section ref={sharedRef} className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate={sharedInView ? "visible" : "hidden"}
              variants={scrollVariants}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shared Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Budget-friendly packages with shared resources, perfect for small projects and testing
              </p>
            </motion.div>
            {renderPackages(sharedPackages, sharedInView)}
          </div>
        </section>
      )}

      {/* Premium Packages */}
      {selectedCategory === "premium" && (
        <section ref={premiumRef} className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate={premiumInView ? "visible" : "hidden"}
              variants={scrollVariants}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dedicated performance with anti-lag technology for heavy workloads
              </p>
            </motion.div>
            {renderPackages(premiumPackages, premiumInView)}
          </div>
        </section>
      )}

      <GameSupportLogos />

      <Footer />
    </div>
  );
};

export default PricingServer;