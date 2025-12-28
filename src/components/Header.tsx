import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Heart } from "lucide-react";
import trustLogo from "@/assets/trust-logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Our Work" },
    { href: "#impact", label: "Impact" },
    { href: "#team", label: "Team" },
    { href: "#membership", label: "Join Us" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      {/* Top bar with contact */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              Helpline: 9919800108
            </span>
            <span className="hidden sm:inline">| Reg. No: 43991</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline">80G Tax Benefits Available</span>
            <Heart className="h-3 w-3 animate-pulse-gentle" />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={trustLogo}
              alt="Shri Guru Sharan Sewa Trust Logo"
              className="h-14 w-14 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <h1 className="font-playfair text-xl font-bold text-primary leading-tight">
                Shri Guru Sharan Sewa Trust
              </h1>
              <p className="text-xs text-muted-foreground">Health & Family Welfare</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="healing" size="sm" asChild>
              <a href="#donate">Donate Now</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="healing" className="mt-2" asChild>
                <a href="#donate">Donate Now</a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
