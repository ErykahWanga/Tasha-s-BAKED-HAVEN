import { useState } from "react";
import { X, Camera } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import heroBentoCake from "@/assets/hero-bento-cake.jpg";
import chocolateBento from "@/assets/chocolate-bento.jpg";
import redvelvetBento from "@/assets/redvelvet-bento.jpg";
import vanillaBento from "@/assets/vanilla-bento.jpg";
import valentineSpecial from "@/assets/valentine-special.jpg";
import divasPackage from "@/assets/divas-package.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import waridiPackage from "@/assets/waridi-package.jpg";

const galleryImages = [
  { src: heroBentoCake, alt: "Pink bento cake with rose decorations", category: "Custom Made" },
  { src: chocolateBento, alt: "Rich chocolate cake with gold leaf", category: "Custom Made" },
  { src: redvelvetBento, alt: "Red velvet cake with cream cheese frosting", category: "Custom Made" },
  { src: vanillaBento, alt: "Elegant vanilla bento cake", category: "Custom Made" },
  { src: valentineSpecial, alt: "Valentine's cupcakes and gift box", category: "Custom Made" },
  { src: divasPackage, alt: "Diva gift package with cake and accessories", category: "Custom Made" },
  { src: cupcakes, alt: "Pink frosted cupcakes on cake stand", category: "Custom Made" },
  { src: waridiPackage, alt: "Waridi package with roses and cake", category: "Custom Made" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-rose/30 px-4 py-2 rounded-full mb-4">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Our Work</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Custom Made for <span className="text-primary italic">Customers</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-xl mx-auto">
            Every cake tells a story. Browse our gallery of custom creations made
            with love for our wonderful customers.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-in-up ${
                index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className={`aspect-square overflow-hidden ${
                index === 0 || index === 5 ? "md:aspect-auto md:h-full" : ""
              }`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-primary-foreground">
                  <span className="text-xs font-medium uppercase tracking-wider bg-primary/80 px-2 py-1 rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-10 right-0 text-primary-foreground hover:text-primary transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery image"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
