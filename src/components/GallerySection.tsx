import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "@/data/siteData";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const GallerySection = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="gallery" className="py-20 md:py-28 gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Наші <span className="text-gold italic">роботи</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-sm" ref={emblaRef}>
            <div className="flex">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33.333%] min-w-0 px-2"
                >
                  <div
                    className="group cursor-pointer relative overflow-hidden rounded-sm aspect-[3/4]"
                    onClick={() => setSelected(item.image)}
                  >
                    <img
                      src={item.image}
                      alt={item.caption || "Робота салону"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-300 flex items-end">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 font-body text-sm text-foreground">
                        {item.caption}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-gold hover:border-gold transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-gold hover:border-gold transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-foreground hover:text-gold transition-colors"
            >
              <X size={28} />
            </button>
            <motion.img
              src={selected}
              alt="Gallery"
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
