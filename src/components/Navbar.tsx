import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Головна", href: "#hero" },
  { label: "Майстри", href: "#masters" },
  { label: "Прайс", href: "#prices" },
  { label: "Галерея", href: "#gallery" },
  { label: "Магазин", href: "#shop" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contacts" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="site-navbar fixed top-0 left-0 right-0 z-50 border-b border-border touch-manipulation">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleClick("#hero"); }} className="flex items-center gap-3 touch-manipulation">
          <img src={logo} alt="Beauty Color" className="h-10 md:h-14 w-auto" />
          <span className="font-display text-lg md:text-xl tracking-wider text-foreground">
            Beauty <span className="text-gold">Color</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="text-sm font-body tracking-wide text-muted-foreground hover:text-gold transition-colors duration-300 uppercase"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://instagram.com/beautycolor_brovary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-gold transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground p-3 -mr-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="text-base font-body tracking-wide text-muted-foreground hover:text-gold active:text-gold transition-colors uppercase touch-manipulation py-2 px-4 min-h-[44px] flex items-center justify-center"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://instagram.com/beautycolor_brovary"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gold mt-2"
              >
                <Instagram size={18} />
                <span className="text-sm">beautycolor_brovary</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
