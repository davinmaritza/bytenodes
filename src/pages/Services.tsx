import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Globe, Bot, Gamepad2, Code, Check, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const DISCORD_URL = "https://discord.gg/2PMmPp6Yx8";

const servicesDetail = [
  {
    icon: Gamepad2,
    title: "Game Server Hosting",
    description: "Minecraft, FiveM, Rust, dan game lainnya dengan performa tinggi.",
    priceRp: "Mulai Rp 8.000",
    priceUsd: "~$0.50",
    link: "/pricing/servers",
    available: true,
    features: [
      "Shared & Premium Options",
      "DDoS Protection",
      "Pterodactyl Panel",
      "24/7 Uptime",
      "Auto Backup",
      "Multiple Game Support",
      "Low Latency Network",
      "Dedicated EU & SG Server"
    ],
  },
  {
    icon: Bot,
    title: "Discord Bot Hosting",
    description: "Hosting bot Discord dengan uptime 24/7 dan auto-restart.",
    priceRp: "Mulai Rp 10.000",
    priceUsd: "~$0.60",
    link: "/pricing/bot",
    available: true,
    features: [
      "24/7 Uptime",
      "Auto Restart",
      "Multiple Bot Instances",
      "Database Support",
      "Easy Deployment",
      "Priority Support",
      "Custom Domain Option",
      "Free SSL"
    ],
  },
  {
    icon: Globe,
    title: "Website Hosting",
    description: "Web Ptero (Container), Turbo Web (Cloudflare Tunnel), dan Jasa Coding.",
    priceRp: "Mulai Rp 5.000",
    priceUsd: "~$0.30",
    link: "/pricing/website",
    available: true,
    features: [
      "Web Ptero Container",
      "Turbo Web (Cloudflare)",
      "Free SSL (HTTPS)",
      "Auto Backup",
      "IP Teraliased",
      "Resource Terisolasi",
      "Jasa Coding Available",
      "Priority Support"
    ],
  },
  {
    icon: Server,
    title: "Dedicated Server",
    description: "Dedicated server dengan performa tinggi dan NVMe storage.",
    priceRp: "Mulai Rp 65.000",
    priceUsd: "~$4.00",
    link: "/pricing/vps",
    available: true,
    features: [
      "Anti-Lag Performance",
      "NVMe Storage",
      "Full Root Access",
      "Linux (Ubuntu/Debian)",
      "24/7 Uptime",
      "DDoS Protection",
      "Premium Support",
      "Dedicated IP Option"
    ],
  },
  {
    icon: Server,
    title: "VPS KVM",
    description: "Virtual Private Server dengan teknologi KVM untuk web server, bot, dan tunneling.",
    priceRp: "Coming Soon",
    priceUsd: "",
    link: "/pricing/vps",
    available: false,
    features: [
      "KVM Virtualization",
      "Full Root Access",
      "SSD Storage",
      "Linux OS",
      "DDoS Protection",
      "24/7 Uptime",
      "Multiple Locations",
      "Scalable Resources"
    ],
  },
  {
    icon: Code,
    title: "RDP Windows",
    description: "Windows Remote Desktop untuk browsing, botting, dan Android emulator.",
    priceRp: "Coming Soon",
    priceUsd: "",
    link: "/pricing/vps",
    available: false,
    features: [
      "Windows Server",
      "Admin Access",
      "High Bandwidth",
      "SSD Storage",
      "DDoS Protected",
      "Multiple Locations",
      "24/7 Support",
      "Instant Setup"
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <span className="text-primary text-sm font-semibold">🚀 Layanan Kami</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pilih dari berbagai layanan hosting dan infrastruktur yang kami sediakan
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesDetail.map((service, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-2xl transition-all duration-300 border-border/50 hover:border-primary/50 bg-card relative ${!service.available ? 'opacity-80' : ''}`}
              >
                {!service.available && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-muted rounded-full">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">Coming Soon</span>
                  </div>
                )}
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{service.description}</p>
                    <div>
                      <p className="text-primary font-bold text-lg">{service.priceRp}</p>
                      {service.priceUsd && <p className="text-muted-foreground text-xs">{service.priceUsd}/month</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 6).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {service.available ? (
                  <Link to={service.link}>
                    <Button className="w-full">
                      Lihat Paket
                    </Button>
                  </Link>
                ) : (
                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      Join Discord for Updates
                    </Button>
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Butuh Bantuan Memilih?</h2>
          <p className="text-muted-foreground mb-8">
            Tim kami siap membantu Anda memilih layanan yang tepat sesuai kebutuhan. Hubungi kami di Discord untuk konsultasi gratis.
          </p>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg">
              Join Discord
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
