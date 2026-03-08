import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { salonInfo } from "@/data/siteData";

const ContactsSection = () => {
  return (
    <section id="contacts" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            <span className="text-gold italic">Контакти</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-body text-sm uppercase tracking-wider text-foreground mb-1">
                  Адреса
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  {salonInfo.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone size={20} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-body text-sm uppercase tracking-wider text-foreground mb-1">
                  Телефон
                </h3>
                <a
                  href={`tel:${salonInfo.phone}`}
                  className="text-muted-foreground font-body text-sm hover:text-gold transition-colors"
                >
                  {salonInfo.phoneFormatted}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock size={20} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-body text-sm uppercase tracking-wider text-foreground mb-1">
                  Графік роботи
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  {salonInfo.workHours}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Instagram size={20} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-body text-sm uppercase tracking-wider text-foreground mb-1">
                  Instagram
                </h3>
                <a
                  href={`https://instagram.com/${salonInfo.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold font-body text-sm hover:underline"
                >
                  @{salonInfo.instagram}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-sm overflow-hidden border border-border h-64 md:h-auto"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.0!2d30.79!3d50.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDMwJzM2LjAiTiAzMMKwNDcnMjQuMCJF!5e0!3m2!1suk!2sua!4v1!5m2!1suk!2sua"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "250px", filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Beauty Color на карті"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
