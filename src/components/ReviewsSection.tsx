import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "@/data/siteData";

const ReviewsSection = () => {
  // Duplicate for infinite scroll
  const doubledReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-20 md:py-28 gradient-dark overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            <span className="text-gold italic">Відгуки</span> клієнтів
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>
      </div>

      {/* Scrolling ribbon */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-scroll-left gap-6 w-max">
          {doubledReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-80 md:w-96 flex-shrink-0 border border-border rounded-sm p-6 bg-card/50 backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/80 font-body text-sm leading-relaxed mb-4 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-body text-xs font-semibold">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <span className="font-body text-sm text-gold">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
