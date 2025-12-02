import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Server, HardDrive, Cpu, ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getServerProducts, getVPSProducts, formatPrice } from "@/lib/dataService";

const OrderServer = () => {
  const [selectedCategory, setSelectedCategory] = useState<"servers" | "vps">("servers");
  const [ordering, setOrdering] = useState<number | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const serverProducts = getServerProducts();
  const vpsProducts = getVPSProducts();
  const products = selectedCategory === "servers" ? serverProducts : vpsProducts;

  const handleOrder = async (productId: number, productName: string, price: number) => {
    if (!user) {
      navigate('/client/login');
      return;
    }

    setOrdering(productId);
    
    // Simulate order creation
    setTimeout(() => {
      toast.success(`Order untuk ${productName} berhasil dibuat! Silahkan lakukan pembayaran.`);
      setOrdering(null);
      // For now, redirect to WhatsApp for payment
      const message = encodeURIComponent(`Halo ByteNodes, saya ingin order ${productName} dengan harga ${formatPrice(price)}/bulan. Email: ${user.email}`);
      window.open(`https://wa.me/6285126080236?text=${message}`, '_blank');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <Link to="/client/dashboard" className="inline-flex items-center text-cyan hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            Order <span className="text-gradient">Server</span>
          </h1>
          <p className="text-muted-foreground">Pilih paket server sesuai kebutuhan Anda</p>
        </div>

        {/* Category Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-lg p-1.5 shadow-lg border border-border/50">
            <button
              onClick={() => setSelectedCategory("servers")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "servers"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Game Servers
            </button>
            <button
              onClick={() => setSelectedCategory("vps")}
              className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                selectedCategory === "vps"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              VPS & RDP
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-primary/10 text-primary">{product.category}</Badge>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span>{product.cpu}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive className="w-4 h-4 text-primary" />
                  <span>{product.ram} RAM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive className="w-4 h-4 text-primary" />
                  <span>{product.storage}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-3 h-3 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                  <span className="text-sm text-muted-foreground font-normal">/bulan</span>
                </div>
              </div>

              <Button
                onClick={() => handleOrder(product.id, product.name, product.price)}
                disabled={ordering === product.id}
                className="w-full"
              >
                {ordering === product.id ? 'Processing...' : 'Order Now'}
              </Button>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada produk tersedia saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderServer;
