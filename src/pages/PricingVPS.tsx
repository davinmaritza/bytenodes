import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GameSupportLogos } from "@/components/GameSupportLogos";

const vpsKvmPackages = [
  {
    name: "VPS Nano",
    price: 1.50,
    ram: "1 GB",
    storage: "15 GB SSD/HDD",
    os: "Linux (Ubuntu/Debian)",
    features: ["DDoS Protection", "24/7 Uptime", "Basic Support"],
    note: "Perfect for Tunneling/VPN/Learning",
    popular: false
  },
  {
    name: "VPS Micro",
    price: 2.50,
    ram: "2 GB",
    storage: "25 GB SSD",
    os: "Linux (Ubuntu/Debian)",
    features: ["DDoS Protection", "24/7 Uptime", "Priority Support"],
    note: "Best Seller: Light WA/Discord Bot",
    popular: true
  },
  {
    name: "VPS Turbo",
    price: 4.50,
    ram: "4 GB",
    storage: "50 GB SSD",
    os: "Linux (Ubuntu/Debian)",
    features: ["DDoS Protection", "24/7 Uptime", "Priority Support", "Custom Domain ($0.60)"],
    note: "Perfect for Web Server/Docker",
    popular: false
  },
  {
    name: "VPS Power",
    price: 8.00,
    ram: "8 GB",
    storage: "80 GB SSD",
    os: "Linux (Ubuntu/Debian)",
    features: ["DDoS Protection", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)"],
    note: "Perfect for Heavy Database",
    popular: false
  },
  {
    name: "VPS Ultra",
    price: 14.00,
    ram: "16 GB",
    storage: "150 GB SSD",
    os: "Linux (Ubuntu/Debian)",
    features: ["DDoS Protection", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)"],
    note: "Enterprise Applications",
    popular: false
  },
  {
    name: "VPS Extreme",
    price: 26.00,
    ram: "32 GB",
    storage: "300 GB SSD",
    os: "Linux (Ubuntu/Debian)",
    features: ["DDoS Protection", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)", "Dedicated IP"],
    note: "High Traffic / Big Projects",
    popular: false
  },
  {
    name: "VPS Storage 1",
    price: 3.00,
    ram: "1 GB",
    storage: "100 GB HDD",
    os: "Linux (Ubuntu/Debian)",
    features: ["DDoS Protection", "24/7 Uptime", "Basic Support"],
    note: "For File Server / Backup",
    popular: false
  },
  {
    name: "VPS Storage 2",
    price: 5.50,
    ram: "4 GB",
    storage: "250 GB HDD",
    os: "Linux (Ubuntu/Debian)",
    features: ["DDoS Protection", "24/7 Uptime", "Priority Support", "Custom Domain ($0.60)"],
    note: "For File Server / Backup",
    popular: false
  }
];

const dedicatedPackages = [
  {
    name: "Dedicated 1",
    price: 4.00,
    ram: "2 GB",
    storage: "20 GB NVMe",
    os: "Linux (Ubuntu/Debian)",
    features: ["Anti-Lag Performance", "24/7 Uptime", "Basic Support"],
    note: "High Single Core Performance",
    popular: false
  },
  {
    name: "Dedicated 2",
    price: 7.50,
    ram: "4 GB",
    storage: "40 GB NVMe",
    os: "Linux (Ubuntu/Debian)",
    features: ["Anti-Lag Performance", "24/7 Uptime", "Priority Support", "Custom Domain ($0.60)"],
    note: "High Single Core Performance",
    popular: true
  },
  {
    name: "Dedicated 3",
    price: 11.00,
    ram: "6 GB",
    storage: "60 GB NVMe",
    os: "Linux (Ubuntu/Debian)",
    features: ["Anti-Lag Performance", "24/7 Uptime", "Priority Support", "Custom Domain ($0.60)"],
    note: "High Single Core Performance",
    popular: false
  },
  {
    name: "Dedicated 4",
    price: 15.00,
    ram: "8 GB",
    storage: "80 GB NVMe",
    os: "Linux (Ubuntu/Debian)",
    features: ["Anti-Lag Performance", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)"],
    note: "High Single Core Performance",
    popular: false
  },
  {
    name: "Dedicated 5",
    price: 25.00,
    ram: "16 GB",
    storage: "150 GB NVMe",
    os: "Linux (Ubuntu/Debian)",
    features: ["Anti-Lag Performance", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)", "Dedicated IP"],
    note: "Enterprise Grade Performance",
    popular: false
  },
  {
    name: "Dedicated 6",
    price: 45.00,
    ram: "32 GB",
    storage: "300 GB NVMe",
    os: "Linux (Ubuntu/Debian)",
    features: ["Anti-Lag Performance", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)", "Dedicated IP"],
    note: "Maximum Power",
    popular: false
  }
];

const rdpWindowsPackages = [
  {
    name: "RDP Starter",
    price: 4.50,
    ram: "2 GB",
    storage: "30 GB SSD",
    os: "Windows Server 2012/2019",
    features: ["DDoS Protection", "24/7 Uptime", "Basic Support"],
    note: "Light Browsing / Idle",
    popular: false
  },
  {
    name: "RDP Worker",
    price: 7.00,
    ram: "4 GB",
    storage: "50 GB SSD",
    os: "Windows Server 2019/10",
    features: ["DDoS Protection", "24/7 Uptime", "Priority Support", "Custom Domain ($0.60)"],
    note: "Botting / Light Tools",
    popular: true
  },
  {
    name: "RDP Pro",
    price: 11.00,
    ram: "6 GB",
    storage: "60 GB SSD",
    os: "Windows Server 2019/2022",
    features: ["DDoS Protection", "24/7 Uptime", "Priority Support", "Custom Domain ($0.60)"],
    note: "Smooth Multitasking",
    popular: false
  },
  {
    name: "RDP Sultan",
    price: 15.00,
    ram: "8 GB",
    storage: "80 GB SSD",
    os: "Windows Server 2019/2022",
    features: ["DDoS Protection", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)"],
    note: "Light Android Emulator",
    popular: false
  },
  {
    name: "RDP Ultra",
    price: 20.00,
    ram: "12 GB",
    storage: "120 GB SSD",
    os: "Windows Server 2022",
    features: ["DDoS Protection", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)", "Database Included"],
    note: "Heavy Multitasking",
    popular: false
  },
  {
    name: "RDP Extreme",
    price: 28.00,
    ram: "16 GB",
    storage: "200 GB SSD",
    os: "Windows Server 2022",
    features: ["DDoS Protection", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)", "Database Included"],
    note: "Android Emulator / Heavy Apps",
    popular: false
  },
  {
    name: "RDP Beast",
    price: 50.00,
    ram: "32 GB",
    storage: "400 GB SSD",
    os: "Windows Server 2022",
    features: ["DDoS Protection", "24/7 Uptime", "Premium Support", "Custom Domain ($0.60)", "Database Included", "Dedicated IP"],
    note: "Multi-Instance Emulator",
    popular: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const PricingVPS = () => {
  const [selectedCategory, setSelectedCategory] = useState<"vps-kvm" | "dedicated" | "rdp">("vps-kvm");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedCategory]);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const getCurrentPackages = () => {
    switch (selectedCategory) {
      case "vps-kvm":
        return vpsKvmPackages;
      case "dedicated":
        return dedicatedPackages;
      case "rdp":
        return rdpWindowsPackages;
      default:
        return vpsKvmPackages;
    }
  };

  const getTitle = () => {
    switch (selectedCategory) {
      case "vps-kvm":
        return "VPS KVM Packages";
      case "dedicated":
        return "Dedicated Server Packages";
      case "rdp":
        return "RDP Windows Packages";
      default:
        return "VPS KVM Packages";
    }
  };

  const getDescription = () => {
    switch (selectedCategory) {
      case "vps-kvm":
        return "KVM-based Virtual Private Server with Linux OS, perfect for web servers, bots, and tunneling";
      case "dedicated":
        return "High-performance dedicated servers with NVMe storage, anti-lag with strong single core performance";
      case "rdp":
        return "Remote Desktop with Windows Server for browsing, botting, to Android emulator";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pt-32 pb-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <span className="text-primary text-sm font-semibold">🚀 VPS & RDP Hosting</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
            VPS & <span className="text-primary">RDP</span> PACKAGES
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            VPS KVM for Linux, Dedicated servers with high performance, and RDP Windows for various needs.
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
              onClick={() => setSelectedCategory("dedicated")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "dedicated"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dedicated
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

      {/* Packages Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            key={`title-${animationKey}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{getTitle()}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {getDescription()}
            </p>
          </motion.div>

          <motion.div
            key={`packages-${animationKey}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {getCurrentPackages().map((pkg, index) => (
              <motion.div key={`${selectedCategory}-${index}`} variants={itemVariants}>
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
                    <Server className="w-10 h-10 text-primary mx-auto mb-3" />
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
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{pkg.os}</span>
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

      <GameSupportLogos />

      <Footer />
    </div>
  );
};

export default PricingVPS;
