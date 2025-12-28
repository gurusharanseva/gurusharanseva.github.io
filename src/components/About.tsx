import { Award, FileCheck, MapPin, Calendar } from "lucide-react";
import certificateImage from "@/assets/ngo-darpan-certificate.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-saffron-light text-primary rounded-full text-sm font-medium mb-4">
            About Our Trust
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            A Legacy of Compassionate Service
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Shri Guru Sharan Sewa Trust is a registered charitable organization dedicated to 
            improving the health and welfare of underserved communities in Varanasi and surrounding 
            rural areas of Uttar Pradesh, India.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Certificate and credentials */}
          <div className="space-y-6 animate-fade-up animation-delay-200">
            {/* Certificate Image */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <img
                src={certificateImage}
                alt="NGO Darpan Certificate - NITI Aayog Enrollment"
                className="relative rounded-xl shadow-card w-full"
              />
            </div>

            {/* Trust Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-xl shadow-soft border border-border">
                <Award className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground">Registration</h4>
                <p className="text-sm text-muted-foreground">Reg. No: 43991 (India)</p>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft border border-border">
                <FileCheck className="h-8 w-8 text-secondary mb-2" />
                <h4 className="font-semibold text-foreground">NITI Aayog</h4>
                <p className="text-sm text-muted-foreground">UP/2024/0390051</p>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft border border-border">
                <MapPin className="h-8 w-8 text-accent mb-2" />
                <h4 className="font-semibold text-foreground">Location</h4>
                <p className="text-sm text-muted-foreground">Varanasi, UP</p>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-soft border border-border">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground">80G Certified</h4>
                <p className="text-sm text-muted-foreground">Tax Benefits</p>
              </div>
            </div>
          </div>

          {/* Right: Mission and Vision */}
          <div className="space-y-8 animate-fade-up animation-delay-400">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To provide accessible, free healthcare services to rural and underserved populations, 
                promote health awareness, and support communities during times of disaster and need. 
                We believe that quality healthcare is a fundamental right, not a privilege.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः — "May all be happy, may all be free from illness."
              </p>
            </div>

            <div>
              <h3 className="font-playfair text-2xl font-bold text-secondary mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A healthy India where every person, regardless of economic status or location, 
                has access to quality healthcare and lives with dignity. We envision thriving 
                rural communities empowered with health awareness and preventive care.
              </p>
            </div>

            <div className="bg-healing-light p-6 rounded-xl border border-secondary/20">
              <h4 className="font-semibold text-foreground mb-2">Healthcare Facility</h4>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Shri Guru Sharan Health Care</strong> — Our charitable hospital 
                and <strong className="text-foreground">Harsh Hospital</strong> provide ongoing medical services 
                to the community at affordable and subsidized rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
