import { CreditCard, Building2, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Donations = () => {
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    accountHolder: "SHRI GURUSHARAN SEWA TRUST",
    accountNumber: "50200099213758",
    ifsc: "HDFC0009454",
    branch: "BHELUPUR, VARANASI",
    accountType: "Current Account",
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "Copied!",
      description: `${field} copied to clipboard`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="donate" className="py-20 bg-saffron-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Support Our Cause
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            Make a Donation
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your generous contribution helps us provide free medical services to rural communities 
            and support those in need. Every donation makes a difference.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            आपका उदार योगदान हमें ग्रामीण समुदायों को मुफ्त चिकित्सा सेवाएं प्रदान करने और जरूरतमंदों की सहायता करने में मदद करता है।
          </p>
        </div>

        {/* Bank Details Card */}
        <div className="max-w-2xl mx-auto animate-fade-up animation-delay-200">
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8" />
                <div>
                  <h3 className="font-playfair text-xl font-bold">Bank Transfer Details</h3>
                  <p className="text-white/80 text-sm">Direct bank transfer for donations</p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="p-6 space-y-4">
              {[
                { label: "Account Holder", value: bankDetails.accountHolder, field: "Account Holder" },
                { label: "Account Number", value: bankDetails.accountNumber, field: "Account Number" },
                { label: "IFSC Code", value: bankDetails.ifsc, field: "IFSC Code" },
                { label: "Branch", value: bankDetails.branch, field: "Branch" },
                { label: "Account Type", value: bankDetails.accountType, field: "Account Type" },
              ].map((item) => (
                <div
                  key={item.field}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(item.value, item.field)}
                    className="text-primary hover:text-primary/80"
                  >
                    {copiedField === item.field ? (
                      <CheckCircle className="h-5 w-5 text-secondary" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="px-6 pb-6">
              <div className="bg-healing-light p-4 rounded-xl border border-secondary/20">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground font-medium">80G Tax Benefits Available</p>
                    <p className="text-sm text-muted-foreground">
                      All donations are eligible for tax deduction under Section 80G of the Income Tax Act.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donations;
