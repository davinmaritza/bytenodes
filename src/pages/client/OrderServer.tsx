import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Server, HardDrive, Cpu, Network, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { servicesApi, paymentApi } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: number;
  name: string;
  type: string;
  description: string;
  specs: {
    cpu?: string;
    ram?: string;
    storage?: string;
    bandwidth?: string;
  };
  pricing: {
    monthly: number;
    quarterly: number;
    semi_annually: number;
    annually: number;
  };
}

const OrderServer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await servicesApi.getAvailableProducts();
      setProducts(data.products);
      
      // Initialize billing cycles to monthly
      const initialCycles: { [key: number]: string } = {};
      data.products.forEach((product: Product) => {
        initialCycles[product.id] = 'monthly';
      });
      setBillingCycle(initialCycles);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (productId: number) => {
    if (!user) {
      navigate('/client/login');
      return;
    }

    setOrdering(productId);
    try {
      const cycle = billingCycle[productId];
      const orderData = await servicesApi.createOrder(productId, cycle);
      
      // Create payment intent for the order
      const paymentData = await paymentApi.createPaymentIntent(
        orderData.amount,
        orderData.order_id
      );

      // Redirect to Stripe checkout
      if (paymentData.checkout_url) {
        window.location.href = paymentData.checkout_url;
      } else {
        toast.success('Order created successfully!');
        navigate('/client/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create order');
    } finally {
      setOrdering(null);
    }
  };

  const getPrice = (product: Product) => {
    const cycle = billingCycle[product.id] || 'monthly';
    return product.pricing[cycle as keyof typeof product.pricing];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan"></div>
      </div>
    );
  }

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
          <p className="text-muted-foreground">Choose a server that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-6 hover:border-cyan/50 transition-all">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-cyan/10 text-cyan">{product.type}</Badge>
                  <div className="p-2 rounded-lg bg-cyan/10">
                    <Server className="w-5 h-5 text-cyan" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {product.specs.cpu && (
                  <div className="flex items-center gap-2 text-sm">
                    <Cpu className="w-4 h-4 text-cyan" />
                    <span>{product.specs.cpu}</span>
                  </div>
                )}
                {product.specs.ram && (
                  <div className="flex items-center gap-2 text-sm">
                    <HardDrive className="w-4 h-4 text-cyan" />
                    <span>{product.specs.ram} RAM</span>
                  </div>
                )}
                {product.specs.storage && (
                  <div className="flex items-center gap-2 text-sm">
                    <HardDrive className="w-4 h-4 text-cyan" />
                    <span>{product.specs.storage} Storage</span>
                  </div>
                )}
                {product.specs.bandwidth && (
                  <div className="flex items-center gap-2 text-sm">
                    <Network className="w-4 h-4 text-cyan" />
                    <span>{product.specs.bandwidth} Bandwidth</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Billing Cycle</label>
                <Select
                  value={billingCycle[product.id]}
                  onValueChange={(value) => 
                    setBillingCycle(prev => ({ ...prev, [product.id]: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly (Save 5%)</SelectItem>
                    <SelectItem value="semi_annually">Semi-Annually (Save 10%)</SelectItem>
                    <SelectItem value="annually">Annually (Save 15%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-cyan">
                  ${getPrice(product).toFixed(2)}
                  <span className="text-sm text-muted-foreground font-normal">
                    /{billingCycle[product.id] === 'monthly' ? 'mo' : billingCycle[product.id]}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => handleOrder(product.id)}
                disabled={ordering === product.id}
                className="w-full gradient-cyan-navy glow-cyan"
              >
                {ordering === product.id ? 'Processing...' : 'Order Now'}
              </Button>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderServer;
