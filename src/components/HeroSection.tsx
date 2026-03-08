import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { salonInfo } from "@/data/siteData";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20">
        <motion.img
          src={logo}
          alt="Beauty Color"
          className="w-48 md:w-64 lg:w-72 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.p
          className="text-gold font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {salonInfo.services.join(" • ")}
        </motion.p>
        <motion.p
          className="text-foreground/80 font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {salonInfo.description}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <a
            href="#masters"
            className="inline-block px-8 py-3 border border-gold text-gold font-body text-sm uppercase tracking-wider hover:bg-gold hover:text-accent-foreground transition-all duration-300"
          >
            Наші майстри
          </a>
          <a
            href="#prices"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-body text-sm uppercase tracking-wider hover:bg-dark-green-light transition-all duration-300"
          >
            Прайс-лист
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
