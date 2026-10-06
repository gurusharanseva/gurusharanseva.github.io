import { useState, useEffect } from "react";
import { X, Images } from "lucide-react";
import { fetchFromCloudinary, CloudinaryResource, CLOUDINARY_CLOUD_NAME } from "@/lib/cloudinary";

const Gallery = () => {
  const [items, setItems] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    fetchFromCloudinary("ssgst/gallery")
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-4 py-1 bg-saffron-light text-primary rounded-full text-sm font-medium mb-4">
            Our Work in Pictures
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">Gallery</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Moments of service, compassion, and community from our work across Varanasi and beyond.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {items.map((item, index) => (
              <div
                key={item.publicId}
                className="group relative rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer animate-fade-up aspect-video"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setLightbox(item.url)}
              >
                <img
                  src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_600,h_400,c_fill/${item.publicId}`}
                  alt={item.context.caption || "Gallery"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {item.context.caption && (
                  <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.context.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {items.length === 0 && !loading && (
          <div className="text-center py-12 text-muted-foreground">
            <Images className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Gallery coming soon.</p>
          </div>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-accent" onClick={() => setLightbox(null)}>
            <X className="h-8 w-8" />
          </button>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[90vh] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default Gallery;
