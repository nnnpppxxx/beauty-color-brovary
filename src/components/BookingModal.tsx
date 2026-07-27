import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Calendar, Clock, User, Phone, MessageSquare, Scissors } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { masters } from "@/data/siteData";


const services = [
  "Стрижка",
  "Одноетапне фарбування",
  "Двоетапне фарбування / Складне фарбування",
  "Air Touch / Balayage / Shatush",
  "Тотал блонд / Вихід з темного",
  "Кератинове випрямлення",
  "Ботокс / Реконструкція волосся",
  "Хімічна завивка",
  "Макіяж",
  "Зачіска",
  "Брови / Вії",
  "Консультація колориста",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ open, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: services[0],
    master: "",
    date: "",
    time: "",
    comment: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const todayStr = useMemo(() => {
    const d = new Date();
    const tz = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tz).toISOString().slice(0, 10);
  }, []);

  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let h = 9; h <= 20; h++) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
      if (h < 20) slots.push(`${String(h).padStart(2, "0")}:30`);
    }
    return slots;
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Введіть ім'я");
    if (form.phone.trim().length < 6) return toast.error("Введіть номер телефону");

    setLoading(true);
    try {
      const datetime = form.date && form.time ? `${form.date} ${form.time}` : "";
      const { error } = await supabase.functions.invoke("send-booking", {
        body: { ...form, datetime },
      });
      if (error) throw error;
      toast.success("Заявку відправлено! Ми зв'яжемось з вами найближчим часом.");
      setForm({ name: "", phone: "", service: services[0], master: "", date: "", time: "", comment: "" });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Не вдалося відправити. Спробуйте ще раз або зателефонуйте нам.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-card border border-gold/30 rounded-sm shadow-gold"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-gold transition-colors z-10"
              aria-label="Закрити"
            >
              <X size={22} />
            </button>

            <div className="p-6 md:p-10">
              <div className="text-center mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Reservation</p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  Ваш <span className="text-gold italic">Ідеальний Час</span>
                </h2>
                <div className="w-12 h-px bg-gold mx-auto mt-4" />
              </div>

              <form onSubmit={submit} className="space-y-5">
                <Field icon={<Sparkles size={14} />} label="Оберіть послугу">
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className="input-field"
                  >
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-card">{s}</option>
                    ))}
                  </select>
                </Field>

                <Field icon={<Scissors size={14} />} label="Майстер (необов'язково)">
                  <select
                    value={form.master}
                    onChange={(e) => update("master", e.target.value)}
                    className="input-field"
                  >
                    <option value="" className="bg-card">Будь-який доступний</option>
                    {masters.map((m) => (
                      <option key={m.id} value={m.name} className="bg-card">
                        {m.name} — {m.role}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field icon={<Calendar size={14} />} label="Бажана дата та час">
                  <input
                    type="datetime-local"
                    value={form.datetime}
                    onChange={(e) => update("datetime", e.target.value)}
                    className="input-field"
                  />
                </Field>

                <div className="grid md:grid-cols-2 gap-5">
                  <Field icon={<User size={14} />} label="Ваше ім'я">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Наталія"
                      required
                      className="input-field"
                    />
                  </Field>
                  <Field icon={<Phone size={14} />} label="Телефон">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+380 __ ___ __ __"
                      required
                      className="input-field"
                    />
                  </Field>
                </div>

                <Field icon={<MessageSquare size={14} />} label="Коментар (необов'язково)">
                  <textarea
                    value={form.comment}
                    onChange={(e) => update("comment", e.target.value)}
                    rows={3}
                    placeholder="Ваші побажання..."
                    className="input-field resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-2 gradient-gold text-background font-body text-sm uppercase tracking-[0.2em] font-semibold rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Відправка..." : "Підтвердити запис"}
                </button>

                <p className="text-center text-xs text-muted-foreground font-body">
                  Заявка миттєво надійде нашим адміністраторам
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Field = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold mb-2 font-body">
      {icon}
      {label}
    </label>
    {children}
  </div>
);

export default BookingModal;
