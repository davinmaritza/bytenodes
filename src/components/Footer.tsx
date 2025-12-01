import { Link } from "react-router-dom";
import { Server, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Server className="w-6 h-6 text-cyan" />
              <span className="text-gradient">ByteNodes</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Professional hosting solutions for businesses of all sizes. Reliable, fast, and secure infrastructure.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Products</h4>
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
                  Game Server
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-cyan transition-colors">
                  RDP
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-cyan transition-colors">
                  Domain Registration
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-cyan transition-colors">
                  Website Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Company</h4>
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
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Support</h4>
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
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  System Status
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  Acceptable Use
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  SLA
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 ByteNodes. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-cyan transition-colors">Payment Methods</Link>
              <Link to="#" className="hover:text-cyan transition-colors">Security</Link>
              <Link to="#" className="hover:text-cyan transition-colors">Compliance</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
