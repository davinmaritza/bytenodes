import { Clock, Shield, Headphones, Zap, Award, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Optimized Performance",
    description: "Experience fast server speeds with our optimized infrastructure and premium hardware."
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Your data is protected with multiple layers of security measures."
  },
  {
    icon: Zap,
    title: "Reliable Uptime",
    description: "Our network is designed for reliability with proactive monitoring systems."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our support team is available to assist you whenever needed."
  },
  {
    icon: Award,
    title: "Developer Friendly",
    description: "Built with developers in mind, featuring powerful tools and intuitive interfaces."
  },
  {
    icon: TrendingUp,
    title: "Growing Community",
    description: "Join our community of developers and access exclusive resources."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose ByteNodes?
          </h2>
          <p className="text-base text-foreground/60 max-w-2xl mx-auto">
            Discover what makes our hosting service stand out
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="group p-6 bg-card rounded-xl border border-border hover:border-cyan/50 transition-all duration-300 hover:bg-card/80"
              >
                <div className="w-12 h-12 bg-cyan/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                  <Icon className="w-6 h-6 text-cyan" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};