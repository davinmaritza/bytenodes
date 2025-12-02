import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-background to-cyan/10 animate-gradient"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan/20 via-transparent to-transparent"></div>
      
      {/* Particle Effects */}
      <ParticleBackground />

      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border backdrop-blur-sm">
              <span className="text-xs text-foreground/80 font-medium tracking-wide uppercase">Premium Hosting Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight uppercase">
              <span className="text-foreground">BYTENODES,</span>
              <br />
              <span className="text-foreground">
                A BYTE OF POWER
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
              All that you really have to do is Sign Up & Deploy your project. We'll take care of the rest, with enterprise-grade infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/client/register">
                <Button size="lg" className="text-base px-8 py-6 font-semibold">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 font-semibold">
                  Explore Premium Plans
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span>Read our reviews on Trustpilot</span>
            </div>
          </div>

          {/* Right Content - 3D Visual */}
          <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-cyan-dark/20 rounded-3xl blur-3xl"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="w-72 h-72 bg-gradient-to-br from-cyan/30 to-cyan-dark/30 rounded-full blur-2xl absolute"></div>
              <div className="relative text-9xl font-black text-foreground/5">
                BN
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
