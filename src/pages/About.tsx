import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Server, Shield, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient">ByteNodes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in web hosting and infrastructure solutions
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              ByteNodes was founded with a simple mission: to provide reliable, high-performance hosting solutions that empower businesses to succeed online. With years of experience in the hosting industry, we understand what it takes to keep your digital infrastructure running smoothly.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Our team of expert engineers and support staff work around the clock to ensure your services are always available, secure, and performing at their best. We pride ourselves on delivering enterprise-grade infrastructure with the personal touch of a company that truly cares about its clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan/10 flex items-center justify-center">
                <Server className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Infrastructure</h3>
              <p className="text-muted-foreground">
                State-of-the-art data centers with redundant power and network connectivity
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Security</h3>
              <p className="text-muted-foreground">
                Advanced DDoS protection and security measures to keep your data safe
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Support</h3>
              <p className="text-muted-foreground">
                24/7 expert support team ready to assist you whenever you need help
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                99.9% uptime guarantee backed by our service level agreement
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
