import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-navy-dark via-navy to-background pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-cyan" />
            <span className="text-sm text-cyan font-medium">Professional Hosting Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up text-white">
            Power Your Digital
            <span className="text-cyan block">Presence</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Enterprise-grade hosting solutions with 99.9% uptime guarantee.
            Deploy your applications with confidence on ByteNodes infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/services">
              <Button size="lg" className="gradient-cyan-navy glow-cyan text-lg px-8">
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white text-navy hover:bg-white/90 border-white">
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div>
              <div className="text-3xl font-bold text-cyan">99.9%</div>
              <div className="text-sm text-white/70">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan">24/7</div>
              <div className="text-sm text-white/70">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan">1000+</div>
              <div className="text-sm text-white/70">Clients</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};
