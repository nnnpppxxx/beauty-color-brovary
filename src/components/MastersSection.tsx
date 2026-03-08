import { motion } from "framer-motion";
import { masters } from "@/data/siteData";

const MastersSection = () => {
  return (
    <section id="masters" className="py-20 md:py-28 gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Наші <span className="text-gold italic">майстри</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {masters.map((master, index) => (
            <motion.div
              key={master.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="relative overflow-hidden rounded-sm mb-6">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={master.image}
                    alt={master.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold font-body text-xs uppercase tracking-[0.2em]">
                    {master.role}
                  </span>
                  <h3 className="font-display text-3xl text-foreground mt-1">
                    {master.name}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed px-1">
                {master.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MastersSection;
