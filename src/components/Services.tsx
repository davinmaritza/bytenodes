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
    <section className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-navy">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive hosting solutions designed to meet all your infrastructure needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white group rounded-2xl"
            >
              <div className="mb-6 p-4 rounded-2xl bg-navy/5 w-fit group-hover:bg-navy group-hover:scale-110 transition-all">
                <service.icon className="w-10 h-10 text-navy group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-navy group-hover:text-navy-dark transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-navy mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/pricing">
                <Button variant="outline" className="w-full rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold transition-all">
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
