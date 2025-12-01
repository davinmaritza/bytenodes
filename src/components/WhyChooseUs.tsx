import { Clock, Shield, Headphones, Zap, Award, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Instant Setup",
    description: "Get your server up and running in less than 5 minutes. Automated deployment for immediate access."
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Our expert team is always available to help you. Get answers via live chat, email, or tickets anytime."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "30-Day Money-Back",
    description: "Try risk-free with our guarantee. Not satisfied? Get a full refund within 30 days, no questions asked."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Enterprise SSD storage and premium network infrastructure ensure blazing-fast performance for your applications."
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "99.9% Uptime SLA",
    description: "Industry-leading uptime guarantee backed by redundant infrastructure and real-time monitoring."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Easy Scaling",
    description: "Grow effortlessly as your needs change. Upgrade or downgrade your resources with just a few clicks."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">ByteNodes</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the difference with our premium hosting solutions designed for performance, reliability, and ease of use
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-border hover:border-cyan/50 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan/10 to-navy/10 rounded-2xl flex items-center justify-center mb-6 text-cyan group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-navy group-hover:text-white transition-all duration-300">
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-navy transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 text-lg">
            Join thousands of satisfied customers who trust ByteNodes
          </p>
          <a
            href="/pricing"
            className="inline-block bg-navy hover:bg-navy-dark text-white px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};