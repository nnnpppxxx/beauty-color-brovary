import { motion } from "framer-motion";
import { masters, teamInfo } from "@/data/siteData";

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
            Наша <span className="text-gold italic">команда</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Team photo + manifesto */}
        <motion.div
          className="max-w-5xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={teamInfo.image}
                alt="Команда Beauty Color"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
                {teamInfo.title}
              </h3>
              <div className="text-muted-foreground font-body text-sm leading-relaxed whitespace-pre-line">
                {teamInfo.description}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Individual masters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {masters.map((master, index) => (
            <motion.div
              key={master.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="relative overflow-hidden rounded-sm mb-3">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={master.image}
                    alt={master.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <span className="text-gold font-body text-[10px] md:text-xs uppercase tracking-[0.2em]">
                    {master.role}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-foreground mt-0.5">
                    {master.name}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground font-body text-xs md:text-sm leading-relaxed px-1 hidden md:block">
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
