import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Check } from "lucide-react";
import { getMasterProfile } from "@/data/masterProfiles";
import { salonInfo } from "@/data/siteData";
import { useState, useEffect } from "react";

const MasterPage = () => {
  const { id } = useParams<{ id: string }>();
  const master = getMasterProfile(id || "");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Dynamic SEO meta tags
  useEffect(() => {
    if (master) {
      const title = `${master.name} — Майстер салону Beauty Color у Броварах`;
      const desc = `${master.name} — ${master.role} у салоні Beauty Color, м. Бровари. ${master.bio.slice(0, 120)}`;
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
    }
    return () => {
      document.title = 'Beauty Color — Салон краси у Броварах | Фарбування, стрижки, кератин';
    };
  }, [master]);

  if (!master) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Майстра не знайдено</h1>
          <Link to="/" className="text-gold hover:text-gold-light transition-colors font-body">
            ← Повернутися на головну
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Link>
          <span className="font-display text-lg text-gold">{salonInfo.name}</span>
          <a
            href={salonInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-gold transition-colors font-body text-sm"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Hero / Bio */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={master.portrait}
                  alt={master.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold rounded-sm -z-10" />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div>
                <p className="text-gold font-body text-xs uppercase tracking-[0.25em] mb-2">
                  {master.role}
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
                  {master.fullName}
                </h1>
              </div>
              <div className="w-12 h-px bg-gold" />
              {master.bio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-muted-foreground font-body text-sm md:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
              <a
                href={`https://www.instagram.com/${salonInfo.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold hover:bg-gold/10 transition-all font-body text-sm uppercase tracking-wider"
              >
                Записатися
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
              Прайс-<span className="text-gold italic">лист</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
            {master.services.length > 0 && (
              <p className="text-muted-foreground font-body text-xs mt-4 max-w-md mx-auto">
                *ціни на послуги залежать від густоти та стану вашого волосся
              </p>
            )}
          </motion.div>

          {master.services.length === 0 ? (
            <div className="text-center py-12 border border-border rounded-sm max-w-lg mx-auto">
              <p className="text-foreground font-body text-base mb-3">
                Прайс-лист формується
              </p>
              <p className="text-muted-foreground font-body text-sm mb-5">
                За актуальним прайсом звертайтесь в Instagram
              </p>
              <a
                href={salonInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold hover:bg-gold/10 transition-all font-body text-sm uppercase tracking-wider"
              >
                @{salonInfo.instagram}
              </a>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              {master.services.map((cat, catIdx) => (
                <motion.div
                  key={catIdx}
                  className="border border-border rounded-sm p-5 md:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.05, duration: 0.4 }}
                >
                  <h3 className="font-display text-lg md:text-xl text-gold italic mb-5">
                    {cat.title}
                  </h3>
                  <div className="space-y-3">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-end justify-between gap-2">
                        <span className="font-body text-sm text-foreground/80 flex-1">
                          {item.service}
                        </span>
                        {item.duration && (
                          <span className="flex items-center gap-1 text-muted-foreground font-body text-xs mr-3 whitespace-nowrap">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </span>
                        )}
                        <span className="font-body text-sm text-gold font-medium whitespace-nowrap">
                          {item.price} грн
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Special Services */}
      {master.specialServices.length > 0 && (
        <section className="py-16 md:py-24 gradient-dark">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
                Додаткові <span className="text-gold italic">послуги</span>
              </h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {master.specialServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  className="border border-border rounded-sm p-6 md:p-8 bg-card/50 flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-5">
                    {service.title}
                  </h3>
                  <ul className="space-y-2.5 flex-1">
                    {service.description.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground font-body text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {service.includes && (
                    <p className="text-muted-foreground font-body text-xs mt-4 border-t border-border pt-3">
                      У вартість включені: {service.includes}
                    </p>
                  )}
                  <div className="mt-5 pt-4 border-t border-border">
                    <span className="font-display text-2xl md:text-3xl text-gold">
                      {service.price} грн
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Work Gallery */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
              Мої <span className="text-gold italic">роботи</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {master.workGallery.map((work, idx) => (
              <motion.div
                key={idx}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setLightboxImg(work.image)}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-sm relative">
                  <img
                    src={work.image}
                    alt={work.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                    <span className="font-body text-xs text-foreground/90">
                      {work.caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Готові <span className="text-gold italic">записатися?</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-8 max-w-md mx-auto">
              Зв'яжіться зі мною через Instagram або за телефоном для запису
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={salonInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gold text-accent-foreground hover:bg-gold-light transition-colors font-body text-sm uppercase tracking-wider"
              >
                Instagram
              </a>
              <a
                href={`tel:${salonInfo.phone}`}
                className="px-8 py-3 border border-gold text-gold hover:bg-gold/10 transition-colors font-body text-sm uppercase tracking-wider"
              >
                {salonInfo.phoneFormatted}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              src={lightboxImg}
              alt="Робота"
              className="max-w-full max-h-[90vh] object-contain rounded-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MasterPage;
