import { Heart, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import trustLogo from "@/assets/trust-logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={trustLogo}
                alt="Shri Guru Sharan Sewa Trust"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-playfair text-xl font-bold">
                  Shri Guru Sharan Sewa Trust
                </h3>
                <p className="text-sm text-primary-foreground/70">
                  श्री गुरू शरण सेवा ट्रस्ट
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-4 max-w-md">
              A registered Health and Family Welfare NGO dedicated to providing free healthcare, 
              disaster relief, and community support to underserved communities in Varanasi and beyond.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
              <span>Reg. No: 43991</span>
              <span>|</span>
              <span>NITI Aayog: UP/2024/0390051</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#impact" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#team" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Leadership Team
                </a>
              </li>
              <li>
                <a href="#membership" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Become a Member
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  B 12/120-A-8-2, Harsh Hospital
                  <br />
                  Bhelupur, Varanasi – 221001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent" />
                <a href="tel:9919800108" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  9919800108
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent" />
                <a href="tel:9415449536" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  9415449536
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/shrigurusharansewatrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent hover:text-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/shrigurusharansewatrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>
              © {currentYear} Shri Guru Sharan Sewa Trust. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
