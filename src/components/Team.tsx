import { User } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. R. K. Bakshi",
    nameHindi: "डॉ. आर. के. बख्शी",
    role: "Founder",
    roleHindi: "संस्थापक",
    description: "Visionary leader dedicated to bringing quality healthcare to underserved communities.",
  },
  {
    name: "Balram Pandey",
    nameHindi: "बलराम पाण्डेय",
    role: "Manager",
    roleHindi: "व्यवस्थापक",
    description: "Ensures smooth operations and coordination of all trust activities.",
  },
  {
    name: "Ranjan Chatterjee",
    nameHindi: "रंजन चटर्जी",
    role: "Vice President",
    roleHindi: "उपाध्यक्ष",
    description: "Leads strategic initiatives and community outreach programs.",
  },
  {
    name: "Ritu Verma",
    nameHindi: "रितु वर्मा",
    role: "Secretary",
    roleHindi: "सचिव",
    description: "Manages communications, documentation, and administrative functions.",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-saffron-light text-primary rounded-full text-sm font-medium mb-4">
            Our Leadership
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            Dedicated to Service
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our team of passionate volunteers and professionals work selflessly to bring 
            healthcare and hope to those in need.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group bg-card rounded-2xl p-6 text-center shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="h-10 w-10 text-primary" />
              </div>

              {/* Name */}
              <h3 className="font-playfair text-lg font-bold text-foreground mb-0.5">
                {member.name}
              </h3>
              <p className="text-sm text-primary/80 mb-2">{member.nameHindi}</p>

              {/* Role */}
              <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-1">
                {member.role}
              </div>
              <p className="text-xs text-muted-foreground mb-3">{member.roleHindi}</p>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
