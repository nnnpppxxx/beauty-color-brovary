import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { masters, teamInfo } from "@/data/siteData";
import { masterProfiles } from "@/data/masterProfiles";

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
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-gradient-to-br from-secondary via-card to-background p-4 md:p-6 shadow-card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/60" />
              <img
                src={teamInfo.image}
                alt="Команда Beauty Color"
                className="relative z-10 w-full h-auto object-cover rounded-[1.25rem]"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
                {teamInfo.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
                {teamInfo.description}
              </p>
              <ul className="space-y-3">
                {teamInfo.highlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span className="text-foreground/90 font-body text-sm md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-gold font-body text-sm md:text-base italic border-l-2 border-gold pl-4">
                {teamInfo.footer}
              </p>
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
              {masterProfiles.some((mp) => mp.id === master.id) && (
                <Link
                  to={`/master/${master.id}`}
                  className="inline-block mt-2 px-1 text-gold font-body text-xs uppercase tracking-wider hover:text-gold-light transition-colors"
                >
                  Детальніше →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MastersSection;
