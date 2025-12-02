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
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why Choose ByteNodes
          </h2>
          <p className="text-base text-foreground/60 max-w-2xl mx-auto">
            We provide enterprise-grade infrastructure with the flexibility and support your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-110 transition-all duration-500 cursor-pointer"
            >
              <div className="mb-6 mx-auto w-20 h-20 rounded-2xl bg-card flex items-center justify-center group-hover:bg-primary/20 border border-border/50 group-hover:border-primary transition-all duration-500 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-primary/20">
                <feature.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
