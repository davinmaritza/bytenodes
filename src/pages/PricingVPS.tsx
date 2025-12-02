import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollAnimation, scrollVariants, staggerContainer } from "@/hooks/useScrollAnimation";

const vpsKvmPackages = [
  {
    name: "VPS Nano",
    price: 15000,
    cpu: "1 Core",
    ram: "1 GB",
    storage: "15 GB",
    storageType: "SSD/HDD",
    hardware: "Xeon E5-2630 v4",
    os: "Linux (Ubuntu/Debian)",
    note: "Cocok untuk Tunneling/VPN/Belajar",
    popular: false
  },
  {
    name: "VPS Micro",
    price: 25000,
    cpu: "1 Core",
    ram: "2 GB",
    storage: "25 GB",
    storageType: "SSD",
    hardware: "Xeon E5-2630 v4",
    os: "Linux (Ubuntu/Debian)",
    note: "Best Seller: Bot WA/Discord Ringan",
    popular: true
  },
  {
    name: "VPS Turbo",
    price: 50000,
    cpu: "2 Core",
    ram: "4 GB",
    storage: "50 GB",
    storageType: "SSD",
    hardware: "Xeon E5-2630 v4",
    os: "Linux (Ubuntu/Debian)",
    note: "Cocok untuk Web Server/Docker",
    popular: false
  },
  {
    name: "VPS Power",
    price: 90000,
    cpu: "4 Core",
    ram: "8 GB",
    storage: "80 GB",
    storageType: "SSD",
    hardware: "Xeon E5-2630 v4",
    os: "Linux (Ubuntu/Debian)",
    note: "Cocok untuk Database Berat",
    popular: false
  },
  {
    name: "VPS Storage 1",
    price: 30000,
    cpu: "1 Core",
    ram: "1 GB",
    storage: "100 GB",
    storageType: "HDD",
    hardware: "Xeon E5-2630 v4",
    os: "Linux (Ubuntu/Debian)",
    note: "Khusus File Server / Backup",
    popular: false
  },
  {
    name: "VPS Storage 2",
    price: 60000,
    cpu: "2 Core",
    ram: "4 GB",
    storage: "250 GB",
    storageType: "HDD",
    hardware: "Xeon E5-2630 v4",
    os: "Linux (Ubuntu/Debian)",
    note: "Khusus File Server / Backup",
    popular: false
  }
];

const vpsPremiumPackages = [
  {
    name: "Hi-Speed 1",
    price: 45000,
    cpu: "2 Core (Gen 12)",
    ram: "2 GB",
    storage: "20 GB",
    storageType: "SSD NVMe",
    hardware: "Intel i5-12400",
    os: "Linux (Ubuntu/Debian)",
    note: "Anti-Lag / Single Core Tinggi",
    popular: false
  },
  {
    name: "Hi-Speed 2",
    price: 85000,
    cpu: "3 Core (Gen 12)",
    ram: "4 GB",
    storage: "40 GB",
    storageType: "SSD NVMe",
    hardware: "Intel i5-12400",
    os: "Linux (Ubuntu/Debian)",
    note: "Anti-Lag / Single Core Tinggi",
    popular: true
  }
];

const rdpWindowsPackages = [
  {
    name: "RDP Starter",
    price: 50000,
    cpu: "2 Core",
    ram: "2 GB",
    storage: "30 GB",
    storageType: "SSD",
    hardware: "Xeon E5-2630 v4",
    os: "Windows Server 2012/2019",
    note: "Browsing Ringan / Idle",
    popular: false
  },
  {
    name: "RDP Worker",
    price: 80000,
    cpu: "2 Core",
    ram: "4 GB",
    storage: "50 GB",
    storageType: "SSD",
    hardware: "Xeon E5-2630 v4",
    os: "Windows Server 2019/10",
    note: "Botting / Tool Ringan",
    popular: true
  },
  {
    name: "RDP Pro",
    price: 120000,
    cpu: "4 Core",
    ram: "6 GB",
    storage: "60 GB",
    storageType: "SSD",
    hardware: "Xeon E5-2630 v4",
    os: "Windows Server 2019/2022",
    note: "Multitasking Lancar",
    popular: false
  },
  {
    name: "RDP Sultan",
    price: 160000,
    cpu: "4 Core",
    ram: "8 GB",
    storage: "80 GB",
    storageType: "SSD",
    hardware: "Xeon E5-2630 v4",
    os: "Windows Server 2019/2022",
    note: "Emulator Android Ringan",
    popular: false
  }
];

const PricingVPS = () => {
  const [selectedCategory, setSelectedCategory] = useState<"vps-kvm" | "vps-premium" | "rdp">("vps-kvm");
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation();
  const { ref: vpsKvmRef, isInView: vpsKvmInView } = useScrollAnimation();
  const { ref: vpsPremiumRef, isInView: vpsPremiumInView } = useScrollAnimation();
  const { ref: rdpRef, isInView: rdpInView } = useScrollAnimation();

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
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
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
                  <span className="text-sm">{pkg.storage} {pkg.storageType}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{pkg.hardware}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{pkg.os}</span>
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
            <span className="text-primary text-sm font-semibold">🚀 VPS & RDP Hosting Indonesia</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
            VPS & <span className="text-primary">RDP</span> PACKAGES
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            VPS KVM untuk Linux, VPS Premium dengan Intel Gen 12, dan RDP Windows untuk berbagai kebutuhan.
          </p>

          {/* Category Toggle */}
          <div className="inline-flex items-center gap-2 bg-card rounded-lg p-1.5 shadow-lg border border-border/50 backdrop-blur-sm">
            <button
              onClick={() => setSelectedCategory("vps-kvm")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "vps-kvm"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              VPS KVM
            </button>
            <button
              onClick={() => setSelectedCategory("vps-premium")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "vps-premium"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              VPS Premium
            </button>
            <button
              onClick={() => setSelectedCategory("rdp")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "rdp"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              RDP Windows
            </button>
          </div>
        </div>
      </motion.div>

      {/* VPS KVM Packages */}
      {selectedCategory === "vps-kvm" && (
        <section ref={vpsKvmRef} className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate={vpsKvmInView ? "visible" : "hidden"}
              variants={scrollVariants}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">VPS KVM Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Virtual Private Server berbasis KVM dengan Linux OS, cocok untuk web server, bot, dan tunneling
              </p>
            </motion.div>
            {renderPackages(vpsKvmPackages, vpsKvmInView)}
          </div>
        </section>
      )}

      {/* VPS Premium Packages */}
      {selectedCategory === "vps-premium" && (
        <section ref={vpsPremiumRef} className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate={vpsPremiumInView ? "visible" : "hidden"}
              variants={scrollVariants}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">VPS Premium Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                VPS dengan Intel i5 Gen 12 dan NVMe storage, performa tinggi dengan single core kuat
              </p>
            </motion.div>
            {renderPackages(vpsPremiumPackages, vpsPremiumInView)}
          </div>
        </section>
      )}

      {/* RDP Windows Packages */}
      {selectedCategory === "rdp" && (
        <section ref={rdpRef} className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate={rdpInView ? "visible" : "hidden"}
              variants={scrollVariants}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">RDP Windows Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Remote Desktop dengan Windows Server untuk browsing, botting, hingga emulator Android
              </p>
            </motion.div>
            {renderPackages(rdpWindowsPackages, rdpInView)}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default PricingVPS;
