import { Card } from "@/components/ui/card";
import { Server, Cloud, Globe, Monitor, Gamepad2, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Server,
    title: "Hosting Dedicated",
    description: "High-performance dedicated servers with full root access and guaranteed resources.",
    features: ["Full Root Access", "DDoS Protection", "24/7 Monitoring"],
  },
  {
    icon: Cloud,
    title: "VPS KVM",
    description: "Scalable virtual private servers with KVM virtualization for maximum performance.",
    features: ["KVM Technology", "SSD Storage", "Instant Deploy"],
  },
  {
    icon: Globe,
    title: "Domain",
    description: "Register and manage your domain names with competitive pricing and free WHOIS privacy.",
    features: ["Free WHOIS Privacy", "Easy DNS Management", "Domain Transfer"],
  },
  {
    icon: Monitor,
    title: "RDP",
    description: "Windows Remote Desktop servers for your business applications and remote work needs.",
    features: ["Windows Server", "High Bandwidth", "Admin Access"],
  },
  {
    icon: Gamepad2,
    title: "Game Server",
    description: "Optimized game servers with low latency and automatic mod installation support.",
    features: ["One-Click Install", "DDoS Protection", "99.9% Uptime"],
  },
  {
    icon: Code,
    title: "Website Service",
    description: "Professional website development and maintenance services tailored to your needs.",
    features: ["Custom Design", "SEO Optimized", "Mobile Responsive"],
  },
];

export const Services = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive hosting solutions designed to meet all your infrastructure needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-cyan/50 bg-card group"
            >
              <div className="mb-4 p-3 rounded-lg bg-cyan/10 w-fit group-hover:bg-cyan/20 transition-colors">
                <service.icon className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-cyan transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/pricing">
                <Button variant="outline" className="w-full border-cyan/30 hover:bg-cyan/10">
                  Learn More
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
