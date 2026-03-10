import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { masterProfiles } from "@/data/masterProfiles";
import { masterPrices } from "@/data/siteData";

// Build unified tabs: master profiles first (detailed), then remaining from siteData
const buildPriceTabs = () => {
  const tabs: {
    id: string;
    name: string;
    role: string;
    categories: { title: string; items: { service: string; price: string; duration?: string }[] }[];
  }[] = [];

  // Add masters with full profiles
  masterProfiles.forEach((mp) => {
    tabs.push({
      id: mp.id,
      name: mp.name,
      role: mp.role,
      categories: mp.services,
    });
  });

  // Add remaining from siteData that don't have profiles
  masterPrices.forEach((mp) => {
    if (!tabs.some((t) => t.id === mp.masterId)) {
      tabs.push({
        id: mp.masterId,
        name: mp.masterName,
        role: mp.masterRole,
        categories: mp.categories.map((c) => ({
          title: c.title,
          items: c.items.map((i) => ({ service: i.service, price: i.price })),
        })),
      });
    }
  });

  return tabs;
};

const PricesSection = () => {
  const tabs = buildPriceTabs();
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

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
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-3 font-body text-sm uppercase tracking-wider border transition-all duration-300 ${
                activeTab === index
                  ? "border-gold text-gold bg-gold/10"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
              }`}
            >
              <span className="block text-xs text-muted-foreground mb-1">{tab.role}</span>
              {tab.name}
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
            className="max-w-2xl mx-auto space-y-6"
          >
            <p className="text-muted-foreground font-body text-xs text-center">
              *ціни на послуги залежать від густоти та стану вашого волосся
            </p>
            {current.categories.map((cat, catIdx) => (
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricesSection;
