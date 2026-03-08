import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { masterPrices } from "@/data/siteData";

const PricesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="prices" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Прайс-<span className="text-gold italic">лист</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Master tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {masterPrices.map((mp, index) => (
            <button
              key={mp.masterId}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-body text-sm uppercase tracking-wider border transition-all duration-300 ${
                activeTab === index
                  ? "border-gold text-gold bg-gold/10"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
              }`}
            >
              <span className="block text-xs text-muted-foreground mb-1">{mp.masterRole}</span>
              {mp.masterName}
            </button>
          ))}
        </div>

        {/* Price categories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            {masterPrices[activeTab].categories.map((cat, catIdx) => (
              <motion.div
                key={catIdx}
                className="border border-border rounded-sm p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.4 }}
              >
                <h3 className="font-display text-xl md:text-2xl text-gold italic mb-6">
                  {cat.title}
                </h3>
                <div className="space-y-3">
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-end justify-between gap-2"
                    >
                      <span className="font-body text-sm text-foreground/80">
                        {item.service}
                      </span>
                      <span className="flex-1 border-b border-dotted border-border/50 mx-2 mb-1" />
                      <span className="font-body text-sm text-gold font-medium whitespace-nowrap">
                        {item.price} грн
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricesSection;
