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
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-navy">
            Why Choose ByteNodes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide enterprise-grade infrastructure with the flexibility and support your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-all duration-300"
            >
              <div className="mb-6 mx-auto w-20 h-20 rounded-3xl bg-navy/5 flex items-center justify-center group-hover:bg-navy group-hover:shadow-xl transition-all">
                <feature.icon className="w-10 h-10 text-navy group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy group-hover:text-navy-dark transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
