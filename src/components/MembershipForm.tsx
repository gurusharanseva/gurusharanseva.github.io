import { Heart, CheckCircle2, FileCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const MembershipForm = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdQk_Y7RqRQKQHQoQ4q8FqXVhKQXMpQdQZ_XqQ8FqQdQZ_Xq/viewform?embedded=true";
  const googleFormDirectUrl = "https://docs.google.com/forms/d/1NOjhKwuieTbHVmn0m9opvFLTMvaGSgJqQMS5AH-C7hM/viewform";

  return (
    <section id="membership" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Join Us
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Become a Member
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Join our family of changemakers. As a member, you'll receive regular updates 
              on our activities, opportunities to volunteer, and the satisfaction of knowing 
              you're making a real difference.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Regular Updates</h4>
                  <p className="text-sm text-muted-foreground">Stay informed about our camps, activities, and impact stories</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Volunteer Opportunities</h4>
                  <p className="text-sm text-muted-foreground">Participate in medical camps and community outreach</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Impact Reports</h4>
                  <p className="text-sm text-muted-foreground">Transparent reporting on how your support helps</p>
                </div>
              </div>
            </div>

            {/* 80G Info */}
            <div className="bg-healing-light p-6 rounded-xl border border-secondary/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/20 rounded-xl">
                  <FileCheck className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h4 className="font-playfair text-xl font-bold text-foreground mb-2">
                    80G Tax Benefits
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All donations to Shri Guru Sharan Sewa Trust are eligible for tax deduction 
                    under Section 80G of the Income Tax Act. You will receive an official 80G 
                    certificate for your contributions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Google Form Embed */}
          <div className="bg-card rounded-2xl shadow-card p-6 border border-border animate-fade-up animation-delay-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-foreground">
                    Membership Application
                  </h3>
                  <p className="text-sm text-muted-foreground">सदस्यता आवेदन पत्र</p>
                </div>
              </div>
              <a 
                href={googleFormDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            {/* Embedded Google Form */}
            <div className="w-full rounded-lg overflow-hidden bg-background">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfQoKwuieTbHVmn0m9opvFLTMvaGSgJqQMS5AH-C7hM/viewform?embedded=true"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full min-h-[600px]"
                title="Membership Application Form"
              >
                Loading…
              </iframe>
            </div>

            {/* Fallback Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Having trouble viewing the form?
              </p>
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a 
                  href={googleFormDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Form in New Tab
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipForm;
