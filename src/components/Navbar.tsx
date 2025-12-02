import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Server, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Server className="w-7 h-7 text-cyan" />
            <span className="text-foreground">ByteNodes</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold text-foreground hover:text-cyan transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm font-semibold text-foreground hover:text-cyan transition-colors">
              Services
            </Link>
            <Link to="/pricing" className="text-sm font-semibold text-foreground hover:text-cyan transition-colors">
              Pricing
            </Link>
            <Link to="/blog" className="text-sm font-semibold text-foreground hover:text-cyan transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-sm font-semibold text-foreground hover:text-cyan transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-foreground hover:text-cyan transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
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
            <ThemeToggle />
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
                    <Button className="w-full gradient-cyan-navy">Get Started</Button>
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
