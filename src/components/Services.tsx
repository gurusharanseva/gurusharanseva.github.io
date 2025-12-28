import { Stethoscope, Building2, Leaf, AlertTriangle, Droplets, HeartHandshake } from "lucide-react";
import hospitalImage from "@/assets/hospital.jpg";
import disasterImage from "@/assets/disaster-relief.jpg";
import awarenessImage from "@/assets/health-awareness.jpg";

const services = [
  {
    icon: Stethoscope,
    title: "Free Medical Camps",
    titleHindi: "निशुल्क चिकित्सा शिविर",
    description: "Regular health camps in rural villages providing free consultations, medicines, and health screenings to thousands of patients.",
    image: awarenessImage,
    color: "primary",
  },
  {
    icon: Building2,
    title: "Charitable Hospital",
    titleHindi: "धर्मार्थ अस्पताल",
    description: "Shri Guru Sharan Health Care and Harsh Hospital offer affordable treatment, surgeries, and emergency care for underprivileged families.",
    image: hospitalImage,
    color: "secondary",
  },
  {
    icon: Leaf,
    title: "Rural Healthcare Access",
    titleHindi: "ग्रामीण स्वास्थ्य सेवा",
    description: "Bringing modern healthcare to remote villages through mobile medical units, trained volunteers, and community health workers.",
    image: awarenessImage,
    color: "accent",
  },
  {
    icon: AlertTriangle,
    title: "Disaster Relief",
    titleHindi: "आपदा राहत",
    description: "Immediate response during natural calamities with food, ration kits, medical checkups, and blood donation drives.",
    image: disasterImage,
    color: "primary",
  },
  {
    icon: Droplets,
    title: "Clean Water & Sanitation",
    titleHindi: "स्वच्छ जल एवं स्वच्छता",
    description: "Providing clean drinking water facilities and hygiene support during religious gatherings and community events.",
    image: hospitalImage,
    color: "secondary",
  },
  {
    icon: HeartHandshake,
    title: "Community Outreach",
    titleHindi: "सामुदायिक सेवा",
    description: "Health awareness programs, disease prevention workshops, and support for devotees during major religious festivals.",
    image: awarenessImage,
    color: "accent",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            How We Serve the Community
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From free medical camps to disaster relief, our dedicated team works tirelessly 
            to bring healthcare and support to those who need it most.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl shadow-card overflow-hidden border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className={`absolute bottom-4 left-4 p-3 rounded-xl bg-card shadow-lg`}>
                  <service.icon className={`h-6 w-6 ${
                    service.color === 'primary' ? 'text-primary' : 
                    service.color === 'secondary' ? 'text-secondary' : 'text-accent'
                  }`} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-foreground mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-primary/80 mb-3">{service.titleHindi}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
