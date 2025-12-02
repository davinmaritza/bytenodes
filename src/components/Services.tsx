import { Card } from "@/components/ui/card";
import { Server, Cloud, Globe, Monitor, Gamepad2, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollAnimation, scrollVariants, staggerContainer } from "@/hooks/useScrollAnimation";

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
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={scrollVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Our Services
          </h2>
          <p className="text-base text-foreground/60 max-w-2xl mx-auto">
            Comprehensive hosting solutions designed to meet all your infrastructure needs
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={scrollVariants}>
              <Card className="p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 bg-card border-border/50 hover:border-primary/50 group h-full"
              >
              <div className="mb-6 p-4 rounded-xl bg-primary/5 w-fit group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-foreground/80">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                    {feature}
                  </li>
                ))}
              </ul>
                <Link to="/pricing">
                  <Button variant="outline" className="w-full text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
