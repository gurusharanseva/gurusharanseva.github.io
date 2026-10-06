import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Heart, Mail, Linkedin } from "lucide-react";
import trustLogo from "@/assets/trust-logo.jpg";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: "about", label: "About Us" },
    { id: "services", label: "Our Work" },
    { id: "impact", label: "Impact" },
    { id: "team", label: "Team" },
    { id: "membership", label: "Join Us" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      {/* AI Services Banner */}
      <div className="bg-black/70 backdrop-blur-sm text-white/90 py-1.5 px-4 text-center text-xs">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <span>Need AI, Tech or Website services?</span>
          <a
            href="https://www.linkedin.com/in/bhawnarupani/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-yellow-300 hover:text-yellow-200 underline underline-offset-2 transition-colors"
          >
            Contact Bhawna Rupani
          </a>
          <span className="text-white/30">·</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-white/50">
            Made with <Heart className="h-3 w-3 text-rose-400 fill-rose-400" /> by Bhawna Rupani · Technical AI Architect
          </span>
          <span className="hidden sm:inline text-white/30">·</span>
          <a
            href="mailto:bhawna.rupani.ai@gmail.com"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors"
          >
            <Mail className="h-3 w-3" />
            <span>Email</span>
          </a>
          <a
            href="mailto:bhawna.rupani.ai@gmail.com"
            className="hidden md:inline text-white/60 hover:text-white transition-colors"
          >
            bhawna.rupani.ai@gmail.com
          </a>
          <span className="text-white/30">·</span>
          <a
            href="https://www.linkedin.com/in/bhawnarupani/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 transition-colors"
          >
            <Linkedin className="h-3 w-3" />
            <span>LinkedIn</span>
          </a>
        </span>
      </div>

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
          <a href="/#/" className="flex items-center gap-3 group">
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
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="healing" size="sm" onClick={() => scrollTo("donate")}>
              Donate Now
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
                <button
                  key={link.id}
                  onClick={() => { scrollTo(link.id); setIsMenuOpen(false); }}
                  className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button variant="healing" className="mt-2" onClick={() => { scrollTo("donate"); setIsMenuOpen(false); }}>
                Donate Now
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
