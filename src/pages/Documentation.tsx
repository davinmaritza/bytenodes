import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Book, Server, Shield, CreditCard, MessageSquare, Settings, ArrowRight } from "lucide-react";

const docCategories = [
  {
    icon: Server,
    title: "Getting Started",
    description: "Panduan dasar untuk memulai menggunakan layanan ByteNodes",
    articles: [
      { title: "Cara Membuat Akun", slug: "create-account" },
      { title: "Memilih Paket yang Tepat", slug: "choose-package" },
      { title: "Proses Pembayaran", slug: "payment-process" },
      { title: "Aktivasi Layanan", slug: "service-activation" }
    ]
  },
  {
    icon: Settings,
    title: "Panel & Management",
    description: "Cara menggunakan panel kontrol dan manajemen server",
    articles: [
      { title: "Menggunakan Pterodactyl Panel", slug: "pterodactyl-guide" },
      { title: "Akses SSH ke VPS", slug: "ssh-access" },
      { title: "Remote Desktop (RDP)", slug: "rdp-guide" },
      { title: "File Manager", slug: "file-manager" }
    ]
  },
  {
    icon: Shield,
    title: "Security",
    description: "Tips dan panduan keamanan untuk server Anda",
    articles: [
      { title: "Konfigurasi Firewall", slug: "firewall-config" },
      { title: "SSL Certificate", slug: "ssl-certificate" },
      { title: "Backup Strategy", slug: "backup-strategy" },
      { title: "DDoS Protection", slug: "ddos-protection" }
    ]
  },
  {
    icon: Server,
    title: "Game Server",
    description: "Panduan khusus untuk game server hosting",
    articles: [
      { title: "Setup Minecraft Server", slug: "minecraft-setup" },
      { title: "Install Plugins & Mods", slug: "plugins-mods" },
      { title: "Optimasi Performa", slug: "performance-optimization" },
      { title: "Multiplayer Configuration", slug: "multiplayer-config" }
    ]
  },
  {
    icon: CreditCard,
    title: "Billing",
    description: "Informasi tentang pembayaran dan tagihan",
    articles: [
      { title: "Metode Pembayaran", slug: "payment-methods" },
      { title: "Invoice & Receipt", slug: "invoice-receipt" },
      { title: "Upgrade & Downgrade", slug: "upgrade-downgrade" },
      { title: "Refund Policy", slug: "refund-policy" }
    ]
  },
  {
    icon: MessageSquare,
    title: "Support",
    description: "Cara mendapatkan bantuan dari tim kami",
    articles: [
      { title: "Membuat Support Ticket", slug: "create-ticket" },
      { title: "Menghubungi via Discord", slug: "discord-support" },
      { title: "Live Chat Support", slug: "live-chat" },
      { title: "Emergency Contact", slug: "emergency-contact" }
    ]
  }
];

const Documentation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <Book className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Panduan lengkap untuk menggunakan semua layanan ByteNodes
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Card key={idx} className="hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIdx) => (
                        <li key={articleIdx}>
                          <Link 
                            to={`/blog`}
                            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                          >
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-6">Butuh Bantuan Lebih?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tickets">
              <Badge variant="outline" className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <MessageSquare className="w-4 h-4 mr-2" />
                Buat Support Ticket
              </Badge>
            </Link>
            <a href="https://discord.gg/2PMmPp6Yx8" target="_blank" rel="noopener noreferrer">
              <Badge variant="outline" className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                Join Discord Community
              </Badge>
            </a>
            <a href="https://wa.me/6285126080236" target="_blank" rel="noopener noreferrer">
              <Badge variant="outline" className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                WhatsApp Support
              </Badge>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentation;
