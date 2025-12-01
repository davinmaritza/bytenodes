import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, HardDrive, Activity, DollarSign, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const services = [
    {
      name: "VPS Server - US East",
      type: "VPS KVM",
      status: "Active",
      ip: "192.168.1.100",
      expires: "2024-12-31",
    },
    {
      name: "Game Server - Minecraft",
      type: "Game Server",
      status: "Active",
      ip: "192.168.1.101",
      expires: "2024-11-30",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to your <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Manage your services and account</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan/10">
                <Server className="w-6 h-6 text-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold">2</p>
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
                <p className="text-2xl font-bold">45GB</p>
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
                <p className="text-2xl font-bold">99.9%</p>
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
                <p className="text-2xl font-bold">$150</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Services</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
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
                      <span className="text-muted-foreground">Expires: </span>
                      <span>{service.expires}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3 border-cyan/30">
                    Manage
                  </Button>
                </div>
              ))}
              <Link to="/services">
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
                <Button variant="outline" className="border-cyan/30">
                  Add Funds
                </Button>
                <Button variant="outline" className="border-cyan/30">
                  Open Ticket
                </Button>
                <Button variant="outline" className="border-cyan/30">
                  View Invoices
                </Button>
                <Button variant="outline" className="border-cyan/30">
                  Documentation
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Payment Reminder</h3>
                  <p className="text-sm text-muted-foreground">
                    Your VPS Server invoice is due in 5 days. Make sure to renew on time to avoid service interruption.
                  </p>
                  <Button size="sm" className="mt-3 bg-yellow-500 hover:bg-yellow-600">
                    Pay Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
