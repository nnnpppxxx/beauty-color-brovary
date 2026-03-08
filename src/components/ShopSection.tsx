import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { products } from "@/data/siteData";

const ShopSection = () => {
  return (
    <section id="shop" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            <span className="text-gold italic">Магазин</span> косметики
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-4" />
          <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
            Професійна косметика для догляду за волоссям у домашніх умовах
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group border border-border rounded-sm overflow-hidden hover:border-gold/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="aspect-square overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-display text-lg text-foreground mt-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground font-body mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gold font-body font-semibold">
                    {product.price} грн
                  </span>
                  <a
                    href="https://www.instagram.com/beautycolor_brovary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-border rounded-sm hover:border-gold hover:text-gold transition-colors text-muted-foreground"
                  >
                    <ShoppingBag size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground font-body text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Для замовлення зв'яжіться з нами в{" "}
          <a
            href="https://www.instagram.com/beautycolor_brovary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Instagram
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default ShopSection;
