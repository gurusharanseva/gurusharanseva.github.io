import { Award, FileCheck, MapPin, Calendar, Target, Heart, Droplets } from "lucide-react";
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
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Shri Gurusharan Seva Trust is a non-profit organization committed to standing with people 
            in need, supporting human health and education, and aiding the welfare of the country.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            श्री गुरुशरण सेवा ट्रस्ट एक गैर-लाभकारी संगठन है। संगठन का वास्तविक उद्देश्य मानव स्वास्थ्य 
            और शिक्षा की आवश्यकता वाले लोगों के साथ खड़ा होना और देश के कल्याण में हर संभव मदद करना है।
          </p>
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-up">
          <div className="bg-card p-8 rounded-2xl shadow-card border border-border">
            <h3 className="font-playfair text-2xl font-bold text-primary mb-4 text-center">What We Do</h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-center">
              In case of natural or unnatural disasters in rural areas or poor settlements, the trust 
              provides free medical services like sugar tests, BP tests, and free medicine distribution 
              every Sunday.
            </p>
            <p className="text-muted-foreground leading-relaxed text-center">
              प्राकृतिक आपदा अथवा अप्राकृतिक आपदा की आपात स्थिति में ग्रामीण क्षेत्रों, गरीब बस्तियों में 
              घूम-घूमकर निःशुल्क चिकित्सा सेवाएँ जैसे शुगर जाँच, बीपी जाँच एवं निःशुल्क औषधि वितरण 
              श्री गुरु शरण सेवा ट्रस्ट द्वारा प्रत्येक रविवार को किया जाता है।
            </p>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="max-w-5xl mx-auto mb-16 animate-fade-up animation-delay-200">
          <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 text-center">Our Objectives</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-3">Main Objective</h4>
              <p className="text-sm text-muted-foreground">
                Provide and disseminate free medical services in rural areas, focusing on health and 
                family welfare, and create awareness about global disease prevention.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-7 w-7 text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground mb-3">Disaster Relief</h4>
              <p className="text-sm text-muted-foreground">
                Support people affected by natural disasters via food distribution, health tests, 
                blood donation, and other essential services.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-7 w-7 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-3">Festival Support</h4>
              <p className="text-sm text-muted-foreground">
                Provide assistance to devotees visiting from far places during Hindu festivals, 
                including drinking water and basic facilities.
              </p>
            </div>
          </div>
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
