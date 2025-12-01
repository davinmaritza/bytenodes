import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Cloud, Globe, Monitor, Gamepad2, Code, Check } from "lucide-react";
import { Link } from "react-router-dom";

const servicesDetail = [
  {
    icon: Server,
    title: "Dedicated Hosting",
    description: "Get the ultimate performance and control with our dedicated servers.",
    price: "Starting at $99/month",
    features: [
      "Full Root Access",
      "Choice of Linux or Windows",
      "Up to 128GB RAM",
      "Multiple CPU Options",
      "DDoS Protection Included",
      "Free Server Management",
      "24/7 Monitoring",
      "99.9% Uptime SLA",
    ],
  },
  {
    icon: Cloud,
    title: "VPS KVM",
    description: "Flexible and scalable virtual private servers with KVM technology.",
    price: "Starting at $19/month",
    features: [
      "KVM Virtualization",
      "Full Root Access",
      "SSD Storage",
      "Instant Provisioning",
      "Scalable Resources",
      "Multiple OS Choices",
      "Free Backup",
      "Control Panel Included",
    ],
  },
  {
    icon: Globe,
    title: "Domain Registration",
    description: "Register your perfect domain name with competitive pricing.",
    price: "Starting at $9.99/year",
    features: [
      "Free WHOIS Privacy",
      "Easy DNS Management",
      "Domain Transfer Support",
      "Auto-Renewal Options",
      "Email Forwarding",
      "Domain Locking",
      "24/7 Support",
      "Bulk Discounts Available",
    ],
  },
  {
    icon: Monitor,
    title: "RDP Services",
    description: "Windows Remote Desktop servers for your business needs.",
    price: "Starting at $29/month",
    features: [
      "Windows Server 2019/2022",
      "Admin Access",
      "High Bandwidth",
      "SSD Storage",
      "Instant Setup",
      "Multiple Locations",
      "DDoS Protected",
      "24/7 Technical Support",
    ],
  },
  {
    icon: Gamepad2,
    title: "Game Servers",
    description: "Optimized game hosting with low latency and high performance.",
    price: "Starting at $15/month",
    features: [
      "One-Click Game Install",
      "DDoS Protection",
      "Low Latency Network",
      "Mod Support",
      "FTP Access",
      "Free MySQL Database",
      "Game Switching",
      "99.9% Uptime",
    ],
  },
  {
    icon: Code,
    title: "Website Services",
    description: "Professional website development and maintenance services.",
    price: "Custom Pricing",
    features: [
      "Custom Design",
      "Responsive Layout",
      "SEO Optimization",
      "CMS Integration",
      "E-commerce Solutions",
      "Maintenance Plans",
      "Security Updates",
      "Performance Optimization",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive range of hosting and infrastructure solutions
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {servicesDetail.map((service, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-2xl transition-all duration-300 border-border/50 hover:border-cyan/50 bg-card"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-cyan/10">
                    <service.icon className="w-8 h-8 text-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-2">{service.description}</p>
                    <p className="text-cyan font-semibold text-lg">{service.price}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-cyan flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/pricing">
                  <Button className="w-full gradient-cyan-navy">
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
