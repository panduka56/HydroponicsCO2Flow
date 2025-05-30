import { Link, useLocation } from "wouter";
import { 
  FaSeedling as Sprout, 
  FaCalculator as Calculator, 
  FaShieldAlt as ShieldAlert, 
  FaBook as BookOpen, 
  FaQuestionCircle as HelpCircle, 
  FaInfoCircle as Info,
  FaBars as Menu,
  FaTimes as X,
  FaHome as Home,
  FaLeaf as Leaf
} from "react-icons/fa";
import { useState } from "react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { path: "/", label: "Calculator", icon: <Calculator className="h-4 w-4" /> },
    { path: "/guide", label: "Growing Guide", icon: <BookOpen className="h-4 w-4" /> },
    { path: "/safety", label: "CO₂ Safety", icon: <ShieldAlert className="h-4 w-4" /> },
    { path: "/faq", label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
    { path: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <header className="bg-background-card backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sprout className="text-primary-foreground text-xl" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">CO₂ Flow Estimator</h1>
                <p className="text-xs lg:text-sm text-foreground-muted font-medium">Professional Hydroponics Calculator</p>
              </div>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <div className="bg-background-muted rounded-xl p-1 border border-border">
              <div className="flex space-x-1">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a className={`px-4 py-2.5 text-sm font-medium flex items-center space-x-2 rounded-lg transition-all duration-200 ${
                      location === item.path 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-foreground-secondary hover:text-foreground hover:bg-background-card'
                    }`}>
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-background-card border border-border text-foreground-secondary hover:text-foreground hover:bg-background-muted transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 bg-background-card backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      location === item.path 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-foreground-secondary hover:text-foreground hover:bg-background-muted'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
