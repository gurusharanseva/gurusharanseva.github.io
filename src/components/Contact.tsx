import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-saffron-light text-primary rounded-full text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Have questions? Want to volunteer or partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated transition-shadow animate-fade-up">
            <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-foreground mb-3">
              Head Office
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              B 12/120-A-8-2, Harsh Hospital
              <br />
              Bhelupur, Varanasi – 221001
              <br />
              Near Bholagiri Math / Bhelupur Thana
            </p>
            <p className="text-sm text-primary font-medium">
              कार्यालय: हर्ष हॉस्पिटल, भेलूपुर
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated transition-shadow animate-fade-up animation-delay-200">
            <div className="p-3 bg-secondary/10 rounded-xl w-fit mb-4">
              <Phone className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-foreground mb-3">
              Contact Numbers
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Helpline</p>
                <a href="tel:9919800108" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  9919800108
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Office</p>
                <a href="tel:9415449536" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  9415449536
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated transition-shadow animate-fade-up animation-delay-400">
            <div className="p-3 bg-accent/20 rounded-xl w-fit mb-4">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-foreground mb-3">
              Working Hours
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Saturday</span>
                <span className="font-medium text-foreground">9 AM - 6 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="font-medium text-foreground">By Appointment</span>
              </div>
              <p className="text-sm text-secondary mt-3">
                Hospital services available 24/7
              </p>
            </div>
          </div>
        </div>

        {/* Social Media & Map */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Social Media */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border animate-fade-up animation-delay-200">
            <h3 className="font-playfair text-xl font-bold text-foreground mb-4">
              Connect With Us
            </h3>
            <p className="text-muted-foreground mb-6">
              Follow us on social media for updates on our camps, events, and impact stories.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/shrigurusharansewatrust"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-card px-6 py-3 rounded-xl shadow-soft border border-border hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <Facebook className="h-5 w-5 text-primary" />
                <span className="font-medium">Facebook</span>
              </a>
              <a
                href="https://instagram.com/shrigurusharansewatrust"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-card px-6 py-3 rounded-xl shadow-soft border border-border hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <Instagram className="h-5 w-5 text-primary" />
                <span className="font-medium">Instagram</span>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              @shrigurusharansewatrust
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border animate-fade-up animation-delay-400">
            <iframe
              title="Trust Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.9476987366714!2d82.99076831501578!3d25.30285983536883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e31e8b3c4c00d%3A0x7a5f9e8f4f9f1f1f!2sBhelupur%2C%20Varanasi%2C%20Uttar%20Pradesh%20221001!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Emergency CTA */}
        <div className="mt-12 text-center bg-primary rounded-2xl p-8 animate-fade-up animation-delay-600">
          <h3 className="font-playfair text-2xl font-bold text-primary-foreground mb-4">
            Need Immediate Medical Assistance?
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Our helpline is available for medical emergencies and inquiries about our charitable hospital services.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href="tel:9919800108" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call Helpline: 9919800108
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
