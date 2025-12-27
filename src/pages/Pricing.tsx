import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingFAQ } from "@/components/PricingFAQ";
import { GuaranteeBanner } from "@/components/GuaranteeBanner";
import { AnimatedStats } from "@/components/AnimatedStats";
import { FloatingShapes } from "@/components/FloatingShapes";
import { TechnologyStack } from "@/components/TechnologyStack";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Server, Bot, Globe, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { GameSupportLogos } from "@/components/GameSupportLogos";

const DISCORD_URL = "https://discord.gg/2PMmPp6Yx8";

const pricingCategories = [
  {
    name: "Game Server",
    icon: Gamepad2,
    startingPriceRp: 8000,
    startingPriceUsd: 0.50,
    description: "Minecraft, FiveM, Rust, dan game lainnya",
    features: [
      "Shared & Premium Options",
      "DDoS Protection",
      "24/7 Uptime",
      "Pterodactyl Panel"
    ],
    link: "/pricing/servers",
    popular: true
  },
  {
    name: "Discord Bot",
    icon: Bot,
    startingPriceRp: 10000,
    startingPriceUsd: 0.60,
    description: "Hosting bot Discord dengan uptime 24/7",
    features: [
      "Auto Restart",
      "Multiple Instances",
      "Database Support",
      "Easy Deployment"
    ],
    link: "/pricing/bot",
    popular: false
  },
  {
    name: "Website Hosting",
    icon: Globe,
    startingPriceRp: 5000,
    startingPriceUsd: 0.30,
    description: "Web Ptero, Turbo Web, & Jasa Coding",
    features: [
      "Free SSL (HTTPS)",
      "Auto Backup",
      "Cloudflare Tunnel",
      "Managed Hosting"
    ],
    link: "/pricing/website",
    popular: false
  },
  {
    name: "VPS & Dedicated",
    icon: Server,
    startingPriceRp: 65000,
    startingPriceUsd: 4.00,
    description: "Dedicated server dengan performa tinggi",
    features: [
      "NVMe Storage",
      "Anti-Lag Performance",
      "Full Root Access",
      "24/7 Support"
    ],
    link: "/pricing/vps",
    popular: false
  }
];

const formatPrice = (priceRp: number, priceUsd: number) => ({
  rp: `Rp ${priceRp.toLocaleString('id-ID')}`,
  usd: `~$${priceUsd.toFixed(2)}`
});

const Pricing = () => {
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
            <span className="text-primary text-sm font-semibold">💰 Harga Terjangkau, Kualitas Premium</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground animate-fade-in">
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in">
            Pilih paket yang sesuai dengan kebutuhan. Semua paket termasuk support 24/7, uptime 99.9%, dan free migration.
          </p>

          <AnimatedStats />
        </div>
      </div>

      <section className="py-16 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Katalog Layanan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semua harga dalam Rupiah (IDR) dengan konversi USD sebagai referensi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricingCategories.map((category, index) => {
              const price = formatPrice(category.startingPriceRp, category.startingPriceUsd);
              const IconComponent = category.icon;
              
              return (
                <Card
                  key={index}
                  className={`p-6 relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                    category.popular
                      ? "border-primary shadow-lg border-2 bg-gradient-to-b from-card via-card to-primary/5"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  {category.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <IconComponent className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-muted-foreground">Mulai dari</span>
                    </div>
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                      <span className="text-3xl font-bold text-primary">{price.rp}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">{price.usd}/month</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={category.link}>
                    <Button
                      className={`w-full ${
                        category.popular ? "shadow-md hover:shadow-lg" : ""
                      }`}
                      variant={category.popular ? "default" : "outline"}
                    >
                      Lihat Paket
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>

          <GameSupportLogos />

          <div className="mt-16 text-center space-y-8">
            <div className="pt-8 border-t border-border/50">
              <p className="text-muted-foreground mb-4">
                Butuh bantuan memilih paket? Hubungi tim kami di Discord.
              </p>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  Join Discord
                </Button>
              </a>
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
