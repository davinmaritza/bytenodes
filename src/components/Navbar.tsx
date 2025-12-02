import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src={logo} alt="ByteNodes" className="w-10 h-10 object-contain" />
            <span className="text-foreground">ByteNodes</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">
              Home
            </Link>
            <Link to="/services" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">
              Services
            </Link>
            <div className="relative group">
              <button className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">
                Pricing
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/pricing" className="block px-4 py-3 hover:bg-secondary hover:text-primary transition-all text-sm">
                  General Pricing
                </Link>
                <Link to="/pricing/servers" className="block px-4 py-3 hover:bg-secondary hover:text-primary transition-all text-sm">
                  Game Servers
                </Link>
                <Link to="/pricing/vps" className="block px-4 py-3 hover:bg-secondary hover:text-primary transition-all text-sm">
                  VPS & RDP
                </Link>
              </div>
            </div>
            <Link to="/blog" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">
              Blog
            </Link>
            <Link to="/about" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">
              About
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/client/dashboard'}>
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    {user.name}
                  </Button>
                </Link>
                <Button 
                  onClick={logout}
                  variant="outline" 
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/client/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/client/register">
                  <Button className="rounded-full px-6 font-semibold">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-sm font-medium hover:text-primary transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">Pricing</p>
                <Link
                  to="/pricing"
                  className="text-sm font-medium hover:text-primary transition-all duration-300 block pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  General Pricing
                </Link>
                <Link
                  to="/pricing/servers"
                  className="text-sm font-medium hover:text-primary transition-all duration-300 block pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Game Servers
                </Link>
                <Link
                  to="/pricing/vps"
                  className="text-sm font-medium hover:text-primary transition-all duration-300 block pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  VPS & RDP
                </Link>
              </div>
              <Link
                to="/blog"
                className="text-sm font-medium hover:text-primary transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-primary transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <Link 
                    to={user.role === 'admin' ? '/admin' : '/client/dashboard'} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full gap-2">
                      <User className="w-4 h-4" />
                      {user.name}
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline" 
                    className="w-full gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/client/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/client/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
