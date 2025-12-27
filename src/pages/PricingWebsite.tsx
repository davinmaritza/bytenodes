import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Globe, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, scrollVariants, staggerContainer } from "@/hooks/useScrollAnimation";

const DISCORD_URL = "https://discord.gg/2PMmPp6Yx8";

// Web Ptero (Container) Packages
const webPteroPackages = [
  { name: "Web Starter", priceRp: 5000, priceUsd: 0.30, ram: "512 MB", storage: "1 GB", cpuLimit: "50%", database: 1, features: ["Free SSL", "Auto Backup"], note: "Cocok untuk Bot Discord, Web Portfolio, PHP Script Ringan", popular: false },
  { name: "Web Basic", priceRp: 10000, priceUsd: 0.60, ram: "1 GB", storage: "3 GB", cpuLimit: "80%", database: 2, features: ["Free SSL", "Auto Backup", "Priority Support"], note: "Cocok untuk Node.js Apps, Medium Traffic Sites", popular: false },
  { name: "Web Pro", priceRp: 15000, priceUsd: 0.90, ram: "2 GB", storage: "5 GB", cpuLimit: "100%", database: 3, features: ["Free SSL", "Auto Backup", "Priority Support", "Custom Domain (Rp 10.000)"], note: "Best for multiple projects", popular: true }
];

// Turbo Web Hosting (Cloudflare Tunnel) Packages
const turboWebPackages = [
  { name: "Turbo 1", priceRp: 20000, priceUsd: 1.20, ram: "1 GB", cpu: "1 Core", storage: "10 GB", features: ["Free SSL (HTTPS)", "IP Teraliased", "Resource Terisolasi"], note: "Managed Hosting - No Root", popular: false },
  { name: "Turbo 2", priceRp: 35000, priceUsd: 2.10, ram: "2 GB", cpu: "1 Core", storage: "20 GB", features: ["Free SSL (HTTPS)", "IP Teraliased", "Resource Terisolasi"], note: "Managed Hosting - No Root", popular: false },
  { name: "Turbo 4", priceRp: 65000, priceUsd: 4.00, ram: "4 GB", cpu: "2 Core", storage: "40 GB", features: ["Free SSL (HTTPS)", "IP Teraliased", "Resource Terisolasi", "Priority Support"], note: "Managed Hosting - No Root", popular: true },
  { name: "Turbo 6", priceRp: 95000, priceUsd: 5.80, ram: "6 GB", cpu: "2 Core", storage: "60 GB", features: ["Free SSL (HTTPS)", "IP Teraliased", "Resource Terisolasi", "Priority Support"], note: "Managed Hosting - No Root", popular: false },
  { name: "Turbo 8", priceRp: 125000, priceUsd: 7.60, ram: "8 GB", cpu: "3 Core", storage: "80 GB", features: ["Free SSL (HTTPS)", "IP Teraliased", "Resource Terisolasi", "Premium Support"], note: "Managed Hosting - No Root", popular: false },
  { name: "Turbo 12", priceRp: 180000, priceUsd: 11.00, ram: "12 GB", cpu: "4 Core", storage: "120 GB", features: ["Free SSL (HTTPS)", "IP Teraliased", "Resource Terisolasi", "Premium Support"], note: "Managed Hosting - No Root", popular: false },
  { name: "Turbo 16", priceRp: 230000, priceUsd: 14.00, ram: "16 GB", cpu: "4 Core", storage: "160 GB", features: ["Free SSL (HTTPS)", "IP Teraliased", "Resource Terisolasi", "Premium Support", "Dedicated IP"], note: "Managed Hosting - No Root", popular: false }
];

// Website Development Service
const devServicePackage = {
  name: "One Page TS",
  priceRp: 15000,
  priceUsd: 0.90,
  features: [
    "1 Halaman (Single Page Application)",
    "TypeScript (HTML5 + CSS/Tailwind + TS)",
    "Source Code Full (Clean Code)",
    "Desain Responsif (HP & PC Aman)",
    "Animasi Ringan (Basic Animation)",
    "FREE Setup ke Hosting ByteNodes",
    "Revisi Maksimal 1x (Minor)"
  ],
  note: "Cocok untuk Portfolio Pribadi, Landing Page Server Minecraft, Tugas Sekolah"
};

type CategoryType = "web-ptero" | "turbo-web" | "dev-service";

const PricingWebsite = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("web-ptero");
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation();
  const { ref: packagesRef, isInView: packagesInView } = useScrollAnimation();

  const formatPrice = (priceRp: number, priceUsd: number) => ({
    rp: `Rp ${priceRp.toLocaleString('id-ID')}`,
    usd: `~$${priceUsd.toFixed(2)}`
  });

  const getTitle = () => {
    switch (selectedCategory) {
      case "web-ptero": return "Web Ptero (Container)";
      case "turbo-web": return "Turbo Web Hosting (Cloudflare Tunnel)";
      case "dev-service": return "Website Development Service";
    }
  };

  const getDescription = () => {
    switch (selectedCategory) {
      case "web-ptero": return "Jalan di atas Panel Pterodactyl biasa. Resource berbagi (Shared). Cocok untuk Bot Discord, Web Portfolio, PHP script ringan, Node.js Apps.";
      case "turbo-web": return "Managed Hosting (No Root). User terima beres, tinggal upload file via Panel. IP Teraliased, Resource Terisolasi, Auto SSL (HTTPS).";
      case "dev-service": return "Bikin Website Keren pake Teknologi Modern (TypeScript). Add-on Service untuk yang beli hosting tapi gak bisa bikin webnya.";
    }
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
            <span className="text-primary text-sm font-semibold">🌐 Website Hosting Indonesia</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
            WEBSITE <span className="text-primary">HOSTING</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Reliable and affordable hosting for your websites. Fast performance with free SSL and automatic backups.
          </p>

          {/* Category Toggle */}
          <div className="inline-flex flex-wrap items-center gap-2 bg-card rounded-lg p-1.5 shadow-lg border border-border/50 backdrop-blur-sm">
            <button
              onClick={() => setSelectedCategory("web-ptero")}
              className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "web-ptero"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Web Ptero
            </button>
            <button
              onClick={() => setSelectedCategory("turbo-web")}
              className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "turbo-web"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Turbo Web
            </button>
            <button
              onClick={() => setSelectedCategory("dev-service")}
              className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "dev-service"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Jasa Coding
            </button>
          </div>
        </div>
      </motion.div>

      {/* Packages */}
      <section ref={packagesRef} className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate={packagesInView ? "visible" : "hidden"}
            variants={scrollVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{getTitle()}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {getDescription()}
            </p>
          </motion.div>

          {selectedCategory === "dev-service" ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={packagesInView ? "visible" : "hidden"}
              className="max-w-lg mx-auto"
            >
              <motion.div variants={scrollVariants}>
                <Card className="p-8 border-primary shadow-lg border-2 bg-gradient-to-b from-card via-card to-primary/5">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold rounded-full shadow-md">
                    Add-on Service
                  </div>

                  <div className="text-center mb-6 mt-4">
                    <Code className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="text-2xl font-bold mb-2">{devServicePackage.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                      <span className="text-4xl font-bold text-primary">{formatPrice(devServicePackage.priceRp, devServicePackage.priceUsd).rp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatPrice(devServicePackage.priceRp, devServicePackage.priceUsd).usd} (Flat Rate)</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {devServicePackage.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground italic">{devServicePackage.note}</p>
                    </div>
                  </div>

                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full shadow-md hover:shadow-lg">
                      Order Now
                    </Button>
                  </a>
                </Card>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={packagesInView ? "visible" : "hidden"}
              className={`grid ${selectedCategory === "web-ptero" ? "md:grid-cols-3 max-w-5xl" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl"} gap-6 mx-auto`}
            >
              {(selectedCategory === "web-ptero" ? webPteroPackages : turboWebPackages).map((pkg, index) => {
                const price = formatPrice(pkg.priceRp, pkg.priceUsd);
                return (
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
                        <Globe className="w-10 h-10 text-primary mx-auto mb-3" />
                        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                        <div className="flex items-baseline justify-center gap-1 mb-1">
                          <span className="text-3xl font-bold text-primary">{price.rp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{price.usd}/month</p>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{pkg.ram} RAM</span>
                        </div>
                        {'cpu' in pkg && (
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{pkg.cpu}</span>
                          </div>
                        )}
                        {'cpuLimit' in pkg && (
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">CPU Limit: {pkg.cpuLimit}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{pkg.storage} SSD</span>
                        </div>
                        {'database' in pkg && (
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{pkg.database} Database</span>
                          </div>
                        )}
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

                      <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                        <Button
                          className={`w-full ${
                            pkg.popular ? "shadow-md hover:shadow-lg" : ""
                          }`}
                          variant={pkg.popular ? "default" : "outline"}
                        >
                          Order Now
                        </Button>
                      </a>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Website Hosting?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Free SSL</h3>
              <p className="text-sm text-muted-foreground">Secure your website with free SSL certificates for all domains</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Auto Backup</h3>
              <p className="text-sm text-muted-foreground">Automatic daily backups to protect your website data</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Fast Performance</h3>
              <p className="text-sm text-muted-foreground">NVMe SSD storage for blazing fast website loading speeds</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingWebsite;
