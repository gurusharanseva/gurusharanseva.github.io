import { Button } from "@/components/ui/button";
import { Heart, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-medical-camp.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Medical camp serving rural communities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl animate-fade-up">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-soft">
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">
              Registered NGO | NITI Aayog ID: UP/2024/0390051
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Healing Communities,
            <br />
            <span className="text-accent">Transforming Lives</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
            श्री गुरू शरण सेवा ट्रस्ट — Bringing free healthcare, disaster relief, 
            and compassionate service to rural Varanasi and beyond since our founding. 
            Your support changes lives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button variant="hero" size="xl" asChild>
              <a href="#membership" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Become a Member
              </a>
            </Button>
            <Button variant="outline" size="xl" className="bg-card/10 border-primary-foreground/30 text-primary-foreground hover:bg-card/20 hover:text-primary-foreground" asChild>
              <a href="#services" className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Our Services
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 text-primary-foreground/90">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">10,000+</div>
              <div className="text-sm">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
              <div className="text-sm">Medical Camps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">80G</div>
              <div className="text-sm">Tax Exemption</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-auto fill-background">
          <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
