import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { fetchFromCloudinary, CloudinaryResource, CLOUDINARY_CLOUD_NAME } from "@/lib/cloudinary";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

const NewsEvents = () => {
  const [events, setEvents] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromCloudinary("ssgst/events")
      .then(data => setEvents(data.sort((a, b) => new Date(b.context.date || b.createdAt).getTime() - new Date(a.context.date || a.createdAt).getTime())))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && events.length === 0) return null;

  return (
    <section id="news" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-healing-green-light text-secondary rounded-full text-sm font-medium mb-4">
            Latest Updates
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">News & Events</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Stay updated with our latest activities, camps, and community initiatives.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[...Array(3)].map((_, i) => <div key={i} className="rounded-2xl bg-muted animate-pulse h-64" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {events.map((event, index) => (
              <div
                key={event.publicId}
                className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_600,h_400,c_fill/${event.publicId}`}
                    alt={event.context.title || "Event"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                    <Calendar className="h-3.5 w-3.5 text-secondary" />
                    <span>{formatDate(event.context.date) || formatDate(event.createdAt)}</span>
                  </div>
                  <h3 className="font-playfair text-base font-bold text-foreground leading-snug">
                    {event.context.title || "Event"}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsEvents;
