import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import BookingModal from "./BookingModal";

const BookingFab = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 group flex items-center gap-2 pl-4 pr-5 py-3 md:py-4 gradient-gold text-background rounded-full shadow-gold font-body text-xs md:text-sm uppercase tracking-[0.2em] font-semibold"
            aria-label="Записатись"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>Записатись</span>
            <span className="absolute inset-0 rounded-full ring-2 ring-gold/40 animate-ping pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default BookingFab;
