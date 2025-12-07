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
import minecraftLogo from "@/assets/minecraft-logo.png";

const sharedPackages = [
  { name: "Shared 1", price: 0.80, ram: "1 GB", storage: "6 GB", note: "Shared Resource / Fair Usage" },
  { name: "Shared 2", price: 1.50, ram: "2 GB", storage: "8 GB", note: "Shared Resource / Fair Usage" },
  { name: "Shared 3", price: 2.20, ram: "3 GB", storage: "10 GB", note: "Shared Resource / Fair Usage" },
  { name: "Shared 4", price: 3.00, ram: "4 GB", storage: "12 GB", note: "Shared Resource / Fair Usage", popular: true },
  { name: "Shared 5", price: 4.00, ram: "6 GB", storage: "15 GB", note: "Shared Resource / Fair Usage" }
];

const premiumPackages = [
  { name: "Premium 1", price: 4.00, ram: "2.5 GB", storage: "8 GB", note: "Dedicated Performance / Anti Lag" },
  { name: "Premium 2", price: 6.50, ram: "4 GB", storage: "12 GB", note: "Dedicated Performance / Anti Lag", popular: true },
  { name: "Premium 3", price: 9.00, ram: "6 GB", storage: "16 GB", note: "Dedicated Performance / Anti Lag" },
  { name: "Premium 4", price: 12.00, ram: "8 GB", storage: "20 GB", note: "Dedicated Performance / Anti Lag" },
  { name: "Premium 5", price: 15.00, ram: "10 GB", storage: "25 GB", note: "Dedicated Performance / Anti Lag" },
  { name: "Premium 6", price: 22.00, ram: "16 GB", storage: "40 GB", note: "Dedicated Performance / Anti Lag" }
];

const dedicatedPackages = [
  { name: "Dedicated 1", price: 18.00, ram: "8 GB", storage: "50 GB NVMe", note: "Full Dedicated Resources" },
  { name: "Dedicated 2", price: 30.00, ram: "16 GB", storage: "100 GB NVMe", note: "Full Dedicated Resources", popular: true },
  { name: "Dedicated 3", price: 50.00, ram: "32 GB", storage: "200 GB NVMe", note: "Full Dedicated Resources" },
  { name: "Dedicated 4", price: 85.00, ram: "64 GB", storage: "400 GB NVMe", note: "Full Dedicated Resources" }
];

const rdpPackages = [
  { name: "RDP Basic", price: 8.00, ram: "2 GB", storage: "40 GB SSD", note: "Windows Server / Remote Desktop" },
  { name: "RDP Standard", price: 14.00, ram: "4 GB", storage: "80 GB SSD", note: "Windows Server / Remote Desktop", popular: true },
  { name: "RDP Pro", price: 24.00, ram: "8 GB", storage: "160 GB SSD", note: "Windows Server / Remote Desktop" },
  { name: "RDP Ultra", price: 40.00, ram: "16 GB", storage: "300 GB SSD", note: "Windows Server / Remote Desktop" }
];

const PricingServer = () => {
  const [selectedCategory, setSelectedCategory] = useState<"shared" | "premium" | "dedicated" | "rdp">("shared");
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation();
  const { ref: packagesRef, isInView: packagesInView } = useScrollAnimation();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const getPackages = () => {
    switch (selectedCategory) {
      case "shared": return sharedPackages;
      case "premium": return premiumPackages;
      case "dedicated": return dedicatedPackages;
      case "rdp": return rdpPackages;
    }
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case "shared": return { title: "Shared Packages", desc: "Budget-friendly packages with shared resources" };
      case "premium": return { title: "Premium Packages", desc: "Dedicated performance with anti-lag technology" };
      case "dedicated": return { title: "Dedicated Packages", desc: "Full dedicated resources for maximum performance" };
      case "rdp": return { title: "RDP Windows Packages", desc: "Windows Server with Remote Desktop" };
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <motion.div ref={heroRef} initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={scrollVariants} className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <span className="text-primary text-sm font-semibold">🎮 Game Server Hosting</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">GAME <span className="text-primary">SERVER</span> PACKAGES</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">High-quality game server hosting with the best hardware.</p>
          <div className="inline-flex flex-wrap items-center gap-2 bg-card rounded-lg p-1.5 shadow-lg border border-border/50">
            {(["shared", "premium", "dedicated", "rdp"] as const).map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
                {cat === "rdp" ? "RDP Windows" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <section ref={packagesRef} className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div initial="hidden" animate={packagesInView ? "visible" : "hidden"} variants={scrollVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{getCategoryTitle().title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{getCategoryTitle().desc}</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" animate={packagesInView ? "visible" : "hidden"} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {getPackages().map((pkg, index) => (
              <motion.div key={index} variants={scrollVariants}>
                <Card className={`p-6 relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${pkg.popular ? "border-primary shadow-lg border-2 bg-gradient-to-b from-card to-primary/5" : "border-border/50 hover:border-primary/50"}`}>
                  {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">Best Seller</div>}
                  <div className="text-center mb-6">
                    <img src={minecraftLogo} alt="Minecraft" className="w-12 h-12 mx-auto mb-3 object-contain" />
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <span className="text-3xl font-bold text-primary">{formatPrice(pkg.price)}</span>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span className="text-sm">{pkg.ram} RAM</span></div>
                    <div className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span className="text-sm">{pkg.storage} Storage</span></div>
                    <div className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span className="text-sm">DDoS Protection</span></div>
                    <div className="flex items-start gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span className="text-sm">24/7 Support</span></div>
                    <div className="pt-2 border-t border-border/50"><p className="text-xs text-muted-foreground italic">{pkg.note}</p></div>
                  </div>
                  <Link to="/client/register"><Button className={`w-full ${pkg.popular ? "shadow-md" : ""}`} variant={pkg.popular ? "default" : "outline"}>Order Now</Button></Link>
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

export default PricingServer;
