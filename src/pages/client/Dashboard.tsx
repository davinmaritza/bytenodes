import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, HardDrive, Activity, DollarSign, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  name: string;
  type: string;
  status: string;
  ip: string;
  sshPort?: string;
  expires: string;
}

const USERS_KEY = 'bytenodes_users';

const Dashboard = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (user) {
      // Load user's services from localStorage
      const storedUsers = localStorage.getItem(USERS_KEY);
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const currentUser = users.find((u: any) => u.id === user.id);
        if (currentUser?.services) {
          setServices(currentUser.services);
        }
      }
    }
  }, [user]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to your <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Manage your services and account</p>
        </div>

        {/* User Info Card */}
        <Card className="p-6 mb-8 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-primary font-mono">User ID: #{user?.id}</p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan/10">
                <Server className="w-6 h-6 text-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan/10">
                <HardDrive className="w-6 h-6 text-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{services.length > 0 ? '—' : '0GB'}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan/10">
                <Activity className="w-6 h-6 text-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold">{services.length > 0 ? '99.9%' : '—'}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan/10">
                <DollarSign className="w-6 h-6 text-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold">{formatPrice(user?.balance || 0)}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Services</h2>
            <div className="space-y-4">
              {services.length === 0 ? (
                <div className="text-center py-8">
                  <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">You don't have any active services yet.</p>
                  <p className="text-sm text-muted-foreground">
                    Order your first service to get started!
                  </p>
                </div>
              ) : (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-lg border border-border hover:border-cyan/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.type}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                        {service.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">IP: </span>
                        <span className="font-mono">{service.ip}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Port: </span>
                        <span className="font-mono">{service.sshPort || '22'}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Expires: </span>
                        <span>{service.expires}</span>
                      </div>
                    </div>
                    <a 
                      href={`ssh://${service.ip}:${service.sshPort || '22'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline" className="w-full mt-3 border-cyan/30">
                        Manage (SSH/RDP)
                      </Button>
                    </a>
                  </div>
                ))
              )}
              <Link to="/client/order">
                <Button className="w-full gradient-cyan-navy">
                  Order New Service
                </Button>
              </Link>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/tickets">
                  <Button variant="outline" className="w-full border-cyan/30">
                    Open Ticket
                  </Button>
                </Link>
                <Link to="/docs">
                  <Button variant="outline" className="w-full border-cyan/30">
                    Documentation
                  </Button>
                </Link>
                <a href="https://discord.gg/bytenodes" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-cyan/30">
                    Discord
                  </Button>
                </a>
                <Link to="/faq">
                  <Button variant="outline" className="w-full border-cyan/30">
                    FAQs
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 border-primary/20 bg-primary/5">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our support team via Discord or open a support ticket.
              </p>
              <a href="https://discord.gg/bytenodes" target="_blank" rel="noopener noreferrer">
                <Button className="w-full">
                  Join Discord Server
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;