import { Shield, Zap, HeadphonesIcon, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Advanced DDoS protection and SSL certificates included with every plan.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "SSD storage and optimized infrastructure for maximum performance.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Expert technical support available around the clock to assist you.",
  },
  {
    icon: TrendingUp,
    title: "Easy Scaling",
    description: "Seamlessly upgrade your resources as your business grows.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-navy-dark/10 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">ByteNodes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide enterprise-grade infrastructure with the flexibility and support your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4 mx-auto w-16 h-16 rounded-2xl bg-cyan/10 flex items-center justify-center group-hover:bg-cyan/20 transition-colors glow-cyan">
                <feature.icon className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
