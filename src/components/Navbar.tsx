import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Server, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Server className="w-6 h-6 text-cyan" />
            <span className="text-gradient">ByteNodes</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-cyan transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm font-medium hover:text-cyan transition-colors">
              Services
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-cyan transition-colors">
              Pricing
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-cyan transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-cyan transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-cyan transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/client/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/client/register">
              <Button className="gradient-cyan-navy glow-cyan">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium hover:text-cyan transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-sm font-medium hover:text-cyan transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/pricing"
                className="text-sm font-medium hover:text-cyan transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/blog"
                className="text-sm font-medium hover:text-cyan transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-cyan transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-cyan transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link to="/client/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">Login</Button>
              </Link>
              <Link to="/client/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full gradient-cyan-navy">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
