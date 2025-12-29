import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MessageCircle, Instagram as InstagramIcon } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with us through your preferred channel
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <a 
                href="https://wa.me/6285126080236" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-cyan transition-colors">WhatsApp</h3>
                  <p className="text-muted-foreground">+62 851-2608-0236</p>
                  <p className="text-sm text-cyan mt-1">Chat with us directly</p>
                </div>
              </a>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <a 
                href="mailto:support@bytenodes.id"
                className="flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                  <Mail className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-cyan transition-colors">Email</h3>
                  <p className="text-muted-foreground">support@bytenodes.id</p>
                  <p className="text-sm text-cyan mt-1">Send us an email</p>
                </div>
              </a>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <a 
                href="tel:+6285126080236"
                className="flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                  <Phone className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-cyan transition-colors">Phone</h3>
                  <p className="text-muted-foreground">+62 851-2608-0236</p>
                  <p className="text-sm text-cyan mt-1">Call us anytime</p>
                </div>
              </a>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <a 
                href="https://www.instagram.com/bytenodeshost"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                  <InstagramIcon className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-cyan transition-colors">Instagram</h3>
                  <p className="text-muted-foreground">@bytenodes</p>
                  <p className="text-sm text-cyan mt-1">Follow us on Instagram</p>
                </div>
              </a>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow md:col-span-2">
              <a 
                href="https://discord.gg/2PMmPp6Yx8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                  <FaDiscord className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-cyan transition-colors">Discord</h3>
                  <p className="text-muted-foreground">Join our Discord server</p>
                  <p className="text-sm text-cyan mt-1">Community support and announcements</p>
                </div>
              </a>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
