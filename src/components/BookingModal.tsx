import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Calendar, Clock, User, Phone, MessageSquare, Scissors } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { masters, salonInfo } from "@/data/siteData";


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
  const [failed, setFailed] = useState(false);
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
    if (!form.date) return [];
    const [y, m, d] = form.date.split("-").map(Number);
    const day = new Date(y, m - 1, d).getDay(); // 0 = нд, 6 = сб
    const isWeekend = day === 0 || day === 6;
    const start = isWeekend ? 10 : 9;
    const end = isWeekend ? 18 : 19; // останній слот
    const slots: string[] = [];
    for (let h = start; h <= end; h++) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
      if (h < end) slots.push(`${String(h).padStart(2, "0")}:30`);
    }
    return slots;
  }, [form.date]);

  useEffect(() => {
    if (form.time && !timeSlots.includes(form.time)) {
      setForm((f) => ({ ...f, time: "" }));
    }
  }, [timeSlots, form.time]);

  const sendOnce = async (payload: Record<string, string>) => {
    const { data, error } = await supabase.functions.invoke("send-booking", { body: payload });
    if (error) throw error;
    if (!data?.ok) throw new Error(data?.error ?? "not_delivered");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Введіть ім'я");
    if (form.phone.trim().length < 6) return toast.error("Введіть номер телефону");

    setLoading(true);
    setFailed(false);
    const datetime = form.date && form.time ? `${form.date} ${form.time}` : "";
    const payload = { ...form, datetime };
    let lastErr: unknown = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await sendOnce(payload);
        toast.success("Заявку відправлено! Ми зв'яжемось з вами найближчим часом.");
        setForm({ name: "", phone: "", service: services[0], master: "", date: "", time: "", comment: "" });
        setLoading(false);
        onClose();
        return;
      } catch (err) {
        lastErr = err;
        await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
      }
    }
    console.error(lastErr);
    setLoading(false);
    setFailed(true);
  };

  const fallbackText = [
    "Запис Beauty Color",
    `Ім'я: ${form.name}`,
    `Телефон: ${form.phone}`,
    `Послуга: ${form.service}`,
    form.master && `Майстер: ${form.master}`,
    form.date && `Дата: ${form.date} ${form.time}`,
    form.comment && `Коментар: ${form.comment}`,
  ]
    .filter(Boolean)
    .join("\n");

  const copyFallback = async () => {
    try {
      await navigator.clipboard.writeText(fallbackText);
      toast.success("Дані заявки скопійовано");
    } catch {
      /* ignore */
    }
  };


  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full sm:max-w-lg max-h-[95dvh] overflow-y-auto overscroll-contain bg-card border border-gold/30 rounded-t-2xl sm:rounded-sm shadow-gold pb-[env(safe-area-inset-bottom)]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-gold transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Закрити"
            >
              <X size={24} />
            </button>

            <div className="px-5 py-6 sm:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-2 sm:mb-3">Reservation</p>
                <h2 className="font-display text-2xl sm:text-4xl text-foreground">
                  Ваш <span className="text-gold italic">Ідеальний Час</span>
                </h2>
                <div className="w-12 h-px bg-gold mx-auto mt-3 sm:mt-4" />
              </div>

              <form onSubmit={submit} className="space-y-4 sm:space-y-5">

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

                <div className="grid grid-cols-2 gap-3 sm:gap-5">
                  <Field icon={<Calendar size={14} />} label="Дата">
                    <input
                      type="date"
                      value={form.date}
                      min={todayStr}
                      onChange={(e) => update("date", e.target.value)}
                      className="input-field appearance-none"
                    />
                  </Field>
                  <Field icon={<Clock size={14} />} label="Час">
                    <select
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      disabled={!form.date}
                      className="input-field appearance-none disabled:opacity-50"
                    >
                      <option value="" className="bg-card">
                        {form.date ? "Оберіть час" : "Спочатку дата"}
                      </option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t} className="bg-card">{t}</option>
                      ))}
                    </select>
                    {form.date && (
                      <p className="mt-1.5 text-[10px] text-muted-foreground font-body">
                        {timeSlots[0]} – {timeSlots[timeSlots.length - 1]}
                      </p>
                    )}
                  </Field>
                </div>


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
