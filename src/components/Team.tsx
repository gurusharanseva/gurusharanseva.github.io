import { useState, useEffect } from "react";
import { User } from "lucide-react";
import rajeshPhoto from "@/assets/team-rajesh-bakshi.jpeg";
import nitaPhoto from "@/assets/team-nita-mishra.jpeg";
import rituPhoto from "@/assets/team-ritu-verma.jpeg";
import siddharthaPhoto from "@/assets/team-kumar-siddhartha.jfif";
import balaramPhoto from "@/assets/team-balaram-pandey.jfif";
import mritunjayPhoto from "@/assets/team-mritunjay-chakraborty.jfif";
import { fetchConfig } from "@/lib/cloudinary";

export const teamMembers = [
  {
    id: "1",
    name: "Dr. R. K. Bakshi",
    nameHindi: "डॉ. आर. के. बख्शी",
    role: "Founder & President",
    roleHindi: "संस्थापक / अध्यक्ष",
    description: "Visionary leader dedicated to bringing quality healthcare to underserved communities.",
    photoUrl: rajeshPhoto,
  },
  {
    id: "2",
    name: "Dr. Nita Mitra",
    nameHindi: "डॉ. नीता मित्रा",
    role: "Vice President",
    roleHindi: "उपाध्यक्ष",
    description: "Leads strategic initiatives and community outreach programs.",
    photoUrl: nitaPhoto,
  },
  {
    id: "3",
    name: "Smt. Ritu Verma",
    nameHindi: "श्रीमती रितु वर्मा",
    role: "Secretary",
    roleHindi: "सचिव",
    description: "Manages communications, documentation, and administrative functions.",
    photoUrl: rituPhoto,
  },
  {
    id: "4",
    name: "Kumar Siddhartha",
    nameHindi: "कुमार सिद्धार्थ",
    role: "Treasurer",
    roleHindi: "कोषाध्यक्ष",
    description: "Oversees financial management and ensures transparent use of funds.",
    photoUrl: siddharthaPhoto,
  },
  {
    id: "5",
    name: "Sri Baloram Pandey",
    nameHindi: "श्री बलोराम पाण्डेय",
    role: "Patron / Sanrakshak",
    roleHindi: "संरक्षक",
    description: "Ensures smooth operations and coordination of all trust activities.",
    photoUrl: balaramPhoto,
  },
  {
    id: "6",
    name: "Mritunjay Chakraborty",
    nameHindi: "मृत्युंजय चक्रवर्ती",
    role: "Life Member",
    roleHindi: "आजीवन सदस्य",
    description: "Committed lifelong member supporting the trust's mission and vision.",
    photoUrl: mritunjayPhoto,
  },
];

type TeamOverrides = Record<string, { name?: string; role?: string; roleHindi?: string; photoUrl?: string }>;

const Team = () => {
  const [members, setMembers] = useState(teamMembers);

  useEffect(() => {
    fetchConfig<TeamOverrides>("team").then(overrides => {
      if (!overrides) return;
      setMembers(teamMembers.map(m => ({ ...m, ...overrides[m.id] })));
    });
  }, []);

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="group bg-card rounded-2xl p-6 text-center shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="h-10 w-10 text-primary" />
                )}
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
