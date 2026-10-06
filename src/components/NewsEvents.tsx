import { Calendar } from "lucide-react";

// MOCK DATA — will be replaced by Firebase data later
const mockEvents = [
  {
    id: "1",
    title: "Free Eye Checkup Camp",
    date: "2024-10-15",
    imageUrl: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Blood Donation Drive — Gandhi Jayanti",
    date: "2024-10-02",
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Rural Health Awareness Workshop",
    date: "2024-09-20",
    imageUrl: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&h=400&fit=crop",
  },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

const NewsEvents = () => {
  return (
    <section id="news" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-healing-green-light text-secondary rounded-full text-sm font-medium mb-4">
            Latest Updates
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            News & Events
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Stay updated with our latest activities, camps, and community initiatives.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mockEvents.map((event, index) => (
            <div
              key={event.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Calendar className="h-3.5 w-3.5 text-secondary" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <h3 className="font-playfair text-base font-bold text-foreground leading-snug">
                  {event.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
