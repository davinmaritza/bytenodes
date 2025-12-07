import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import legalData from "@/data/legal.json";

const PrivacyPolicy = () => {
  const { privacyPolicy } = legalData;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{privacyPolicy.title}</h1>
          <p className="text-muted-foreground">Last Updated: {privacyPolicy.lastUpdated}</p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {privacyPolicy.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
