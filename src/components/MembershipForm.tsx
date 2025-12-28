import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, Shield, CheckCircle2, FileCheck } from "lucide-react";

const MembershipForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    occupation: "",
    membershipType: "annual",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Membership Application Received!",
      description: "Thank you for your interest. Our team will contact you within 48 hours.",
    });

    setIsSubmitting(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      occupation: "",
      membershipType: "annual",
      message: "",
    });
  };

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

          {/* Right: Form */}
          <div className="bg-card rounded-2xl shadow-card p-8 border border-border animate-fade-up animation-delay-200">
            <div className="flex items-center gap-3 mb-6">
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Varanasi"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g., 221001"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Your profession"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="membershipType">Membership Type</Label>
                <select
                  id="membershipType"
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="annual">Annual Member</option>
                  <option value="lifetime">Lifetime Member</option>
                  <option value="volunteer">Volunteer Member</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Why do you want to join? (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your motivation or how you'd like to contribute..."
                  rows={3}
                />
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>Your information is secure and will only be used for membership purposes.</p>
              </div>

              <Button
                type="submit"
                variant="healing"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipForm;
