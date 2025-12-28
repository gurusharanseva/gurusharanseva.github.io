import { Users, Stethoscope, MapPin, Heart, Calendar, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Patients Treated",
    description: "Free healthcare to rural communities",
  },
  {
    icon: Stethoscope,
    value: "50+",
    label: "Medical Camps",
    description: "Across villages of Uttar Pradesh",
  },
  {
    icon: MapPin,
    value: "100+",
    label: "Villages Covered",
    description: "Rural outreach programs",
  },
  {
    icon: Heart,
    value: "500+",
    label: "Blood Donations",
    description: "Lives saved through drives",
  },
  {
    icon: Calendar,
    value: "365",
    label: "Days Active",
    description: "Year-round service commitment",
  },
  {
    icon: Award,
    value: "80G",
    label: "Tax Certified",
    description: "Government recognized NGO",
  },
];

const Impact = () => {
  return (
    <section id="impact" className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-primary-foreground/10 text-primary-foreground rounded-full text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Measurable Change, Real Lives
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Every number represents a life touched, a family helped, a community strengthened. 
            Your support makes this possible.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-4">
                <stat.icon className="h-6 w-6 text-foreground" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-primary-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-primary-foreground/60">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-up animation-delay-600">
          <p className="text-primary-foreground/80 mb-4">
            Help us expand our reach and impact more lives
          </p>
          <a
            href="#membership"
            className="inline-flex items-center gap-2 bg-accent text-foreground px-8 py-3 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <Heart className="h-5 w-5" />
            Join Our Mission
          </a>
        </div>
      </div>
    </section>
  );
};

export default Impact;
