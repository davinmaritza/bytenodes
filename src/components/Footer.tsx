import { Link } from "react-router-dom";
import { Server, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-navy-dark text-foreground py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Server className="w-6 h-6 text-cyan" />
              <span className="text-gradient">ByteNodes</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Professional hosting solutions for businesses of all sizes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-cyan">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-cyan transition-colors">
                  Hosting Dedicated
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-cyan transition-colors">
                  VPS KVM
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-cyan transition-colors">
                  Domain Registration
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-cyan transition-colors">
                  Game Server
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-cyan">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-cyan transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-cyan transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-cyan transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-cyan">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-cyan transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="text-muted-foreground hover:text-cyan transition-colors">
                  Support Tickets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-cyan transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-cyan transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ByteNodes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
