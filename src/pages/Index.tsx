import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { TechnologyStack } from "@/components/TechnologyStack";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <TechnologyStack />
      <Footer />
    </div>
  );
};

export default Index;
