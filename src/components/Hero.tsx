import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/5 via-transparent to-cyan/5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-navy" />
            <span className="text-sm text-navy font-semibold">Professional Hosting Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up text-navy leading-tight">
            Power Your Digital
            <span className="block bg-gradient-to-r from-navy to-cyan bg-clip-text text-transparent">Presence</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Enterprise-grade hosting solutions with 99.9% uptime guarantee.
            Deploy your applications with confidence on ByteNodes infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/services">
              <Button size="lg" className="bg-navy hover:bg-navy-dark text-white rounded-full text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all">
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="rounded-full text-lg px-10 py-6 border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all">
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up bg-secondary/30 rounded-3xl p-8" style={{ animationDelay: '0.6s' }}>
            <div>
              <div className="text-4xl font-bold text-navy mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground font-medium">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy mb-2">24/7</div>
              <div className="text-sm text-muted-foreground font-medium">Expert Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy mb-2">1000+</div>
              <div className="text-sm text-muted-foreground font-medium">Happy Clients</div>
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
