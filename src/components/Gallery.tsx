import { useState } from "react";
import { X, Play } from "lucide-react";

// MOCK DATA — will be replaced by Firebase data later
const mockGalleryItems = [
  {
    id: "1",
    type: "image",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    caption: "Medical Camp — Varanasi",
  },
  {
    id: "2",
    type: "image",
    url: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&h=300&fit=crop",
    caption: "Free Health Checkup Drive",
  },
  {
    id: "3",
    type: "image",
    url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=300&fit=crop",
    caption: "Blood Donation Camp",
  },
  {
    id: "4",
    type: "image",
    url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    caption: "Rural Outreach Program",
  },
  {
    id: "5",
    type: "image",
    url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    caption: "Community Health Awareness",
  },
  {
    id: "6",
    type: "image",
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    caption: "Disaster Relief Operations",
  },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-saffron-light text-primary rounded-full text-sm font-medium mb-4">
            Our Work in Pictures
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            Gallery
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Moments of service, compassion, and community from our work across Varanasi and beyond.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {mockGalleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer animate-fade-up aspect-video"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setLightbox(item.url)}
            >
              {item.type === "video" ? (
                <div className="relative w-full h-full bg-foreground/10 flex items-center justify-center">
                  <Play className="h-12 w-12 text-primary" />
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent"
            onClick={() => setLightbox(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
