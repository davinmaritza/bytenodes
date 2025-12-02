import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollAnimation, scrollVariants, staggerContainer } from "@/hooks/useScrollAnimation";

const sharedPackages = [
  {
    name: "Shared 1",
    price: 5000,
    cpu: "100% (1 Core)",
    ram: "1 GB",
    storage: "6 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Shared Resource / Fair Usage"
  },
  {
    name: "Shared 2",
    price: 10000,
    cpu: "150% (1.5 Core)",
    ram: "2 GB",
    storage: "6 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Shared Resource / Fair Usage"
  },
  {
    name: "Shared 3",
    price: 15000,
    cpu: "200% (2 Core)",
    ram: "3 GB",
    storage: "9 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Shared Resource / Fair Usage"
  },
  {
    name: "Shared 4",
    price: 20000,
    cpu: "250% (2.5 Core)",
    ram: "4 GB",
    storage: "9 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Shared Resource / Fair Usage"
  }
];

const mediumPackages = [
  {
    name: "Medium 1",
    price: 12000,
    cpu: "250% (2.5 Core)",
    ram: "1 GB",
    storage: "10 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Stabil / Limit Lebih Besar",
    popular: false
  },
  {
    name: "Medium 2",
    price: 24000,
    cpu: "350% (3.5 Core)",
    ram: "2 GB",
    storage: "15 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Stabil / Limit Lebih Besar",
    popular: true
  },
  {
    name: "Medium 3",
    price: 36000,
    cpu: "375% (3.75 Core)",
    ram: "3 GB",
    storage: "20 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Stabil / Limit Lebih Besar",
    popular: false
  },
  {
    name: "Medium 4",
    price: 48000,
    cpu: "400% (4 Core)",
    ram: "4 GB",
    storage: "25 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Stabil / Limit Lebih Besar",
    popular: false
  },
  {
    name: "Medium 6",
    price: 72000,
    cpu: "550% (5.5 Core)",
    ram: "6 GB",
    storage: "35 GB",
    hardware: "Xeon E5-2630 v4",
    note: "Stabil / Limit Lebih Besar",
    popular: false
  }
];

const premiumPackages = [
  {
    name: "Premium 1",
    price: 38000,
    cpu: "3 vCPU",
    ram: "2.5 GB",
    storage: "6 GB",
    hardware: "Intel i5 Gen 12",
    note: "Dedicated Performance / Anti Lag",
    popular: false
  },
  {
    name: "Premium 2",
    price: 61000,
    cpu: "4 vCPU",
    ram: "4 GB",
    storage: "10 GB",
    hardware: "Intel i5 Gen 12",
    note: "Dedicated Performance / Anti Lag",
    popular: true
  },
  {
    name: "Premium 3",
    price: 78000,
    cpu: "4.5 vCPU",
    ram: "6 GB",
    storage: "14 GB",
    hardware: "Intel i5 Gen 12",
    note: "Dedicated Performance / Anti Lag",
    popular: false
  },
  {
    name: "Premium 4",
    price: 101000,
    cpu: "5 vCPU",
    ram: "8 GB",
    storage: "18 GB",
    hardware: "Intel i5 Gen 12",
    note: "Dedicated Performance / Anti Lag",
    popular: false
  },
  {
    name: "Premium 5",
    price: 134000,
    cpu: "6 vCPU",
    ram: "10 GB",
    storage: "22 GB",
    hardware: "Intel i5 Gen 12",
    note: "Dedicated Performance / Anti Lag",
    popular: false
  }
];

const PricingServer = () => {
  const [selectedCategory, setSelectedCategory] = useState<"shared" | "medium" | "premium">("medium");
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation();
  const { ref: sharedRef, isInView: sharedInView } = useScrollAnimation();
  const { ref: mediumRef, isInView: mediumInView } = useScrollAnimation();
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
                <Server className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold text-primary">{formatPrice(pkg.price)}</span>
                </div>
                <p className="text-xs text-muted-foreground">/bulan</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{pkg.cpu}</span>
                </div>
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
                  <span className="text-sm">{pkg.hardware}</span>
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
            <span className="text-primary text-sm font-semibold">🚀 Server Hosting Indonesia</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
            PILIH PAKET <span className="text-primary">SERVER</span> ANDA
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Hosting server berkualitas tinggi dengan hardware terbaik. Dari Shared hingga Premium dengan performa dedicated.
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
              onClick={() => setSelectedCategory("medium")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "medium"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Medium
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
                Paket ekonomis dengan resource sharing, cocok untuk project kecil dan testing
              </p>
            </motion.div>
            {renderPackages(sharedPackages, sharedInView)}
          </div>
        </section>
      )}

      {/* Medium Packages */}
      {selectedCategory === "medium" && (
        <section ref={mediumRef} className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate={mediumInView ? "visible" : "hidden"}
              variants={scrollVariants}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Medium Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Performa stabil dengan limit lebih besar, ideal untuk aplikasi production
              </p>
            </motion.div>
            {renderPackages(mediumPackages, mediumInView)}
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
                Dedicated performance dengan Intel i5 Gen 12, anti-lag untuk beban tinggi
              </p>
            </motion.div>
            {renderPackages(premiumPackages, premiumInView)}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default PricingServer;
