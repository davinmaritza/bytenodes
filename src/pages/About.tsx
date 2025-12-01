import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Server, Shield, Users, Award, Globe, Zap } from "lucide-react";

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
            <p className="text-lg text-foreground leading-relaxed mb-6">
              ByteNodes began with 2 people named Salman and Davin from SMK Negeri 13 Bandung, VBAP class. 
              What started as a passion project between two vocational students has grown into a trusted 
              hosting provider serving clients across Indonesia and beyond.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Founded on the principles of reliability, affordability, and excellent customer service, 
              ByteNodes has evolved from a simple idea in a classroom to a full-fledged hosting company. 
              Our journey reflects our commitment to making professional hosting accessible to everyone, 
              from individual developers to growing businesses.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Today, we leverage cutting-edge technology and infrastructure to deliver enterprise-grade 
              hosting solutions. Our team continuously works to ensure your digital presence remains 
              secure, fast, and always available. We understand the challenges of running online services 
              because we've been there ourselves.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
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

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan/10 flex items-center justify-center">
                <Globe className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                Serving clients worldwide with localized support and infrastructure
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Performance</h3>
              <p className="text-muted-foreground">
                Optimized servers and network for blazing-fast loading speeds
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
