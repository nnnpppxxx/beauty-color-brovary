// ============================================
// CMS-READY DATA LAYER
// All content is centralized here for easy Strapi/CMS integration.
// Replace static imports with API calls when connecting to Strapi.
// ============================================

export interface Master {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  instagram?: string;
}

export interface PriceCategory {
  title: string;
  items: { service: string; price: string }[];
}

export interface MasterPrices {
  masterId: string;
  masterName: string;
  masterRole: string;
  categories: PriceCategory[];
}

export interface GalleryItem {
  id: string;
  image: string;
  caption?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  avatar?: string;
  rating: number;
}

// --- MASTERS ---
export const masters: Master[] = [
  {
    id: "natalia",
    name: "Наталія",
    role: "ТОП Майстер / Засновниця",
    description: "Засновниця студії Beauty Color. Спеціалізується на складних техніках фарбування, хімічній завивці та реконструкції волосся. Багаторічний досвід та індивідуальний підхід до кожного клієнта.",
    image: "/images/natalia-portrait.jpg",
  },
  {
    id: "katya",
    name: "Катерина",
    role: "Майстер-універсал",
    description: "Багатогранна, творча і позитивна. Візажист, колорист, майстер з нарощення та відновлення волосся. Чує бажання клієнта і тримає професіоналізм.",
    image: "/images/katya-portrait.jpg",
  },
  {
    id: "kateryna-n",
    name: "Катерина Н.",
    role: "Колорист / Модифікація волосся",
    description: "8 років досвіду, з яких 5 — спеціалізація на колористиці. Створює яскраві індивідуальні фарбування, виконує кератин, ботокс та стрижки.",
    image: "/images/kateryna-n-portrait.jpg",
  },
  {
    id: "olena",
    name: "Олена",
    role: "Майстер-колорист",
    description: "Майстер точного кольору та м'яких технік фарбування. Спеціалізується на балаяжі, шатуші та природних переходах кольору.",
    image: "/images/master-olena.jpg",
  },
];

// --- TEAM INFO ---
export const teamInfo = {
  image: "/images/team.jpg",
  title: "П'ять майстрів. П'ять характерів. Одна сильна команда.",
  description: `Нас об'єднує любов до колористики та найвищі стандарти роботи.

У нашій студії ви не потрапляєте просто до майстра — ви потрапляєте в команду професіоналів.`,
  highlights: [
    "Працюємо зі складними випадками",
    "Робимо чисті блонди без компромісів",
    "Безпечний вихід з темного кольору",
    "Володіємо складними техніками фарбування",
    "Виправляємо невдалі експерименти",
  ],
  footer: "Для нас важливий не просто колір — важливий результат і здорове волосся.",
};

// --- PRICE LISTS ---
export const masterPrices: MasterPrices[] = [
  {
    masterId: "natalia",
    masterName: "Наталія",
    masterRole: "ТОП Майстер",
    categories: [
      {
        title: "Складні техніки фарбування (мілірування, тотал блонд, вихід з темного, air touch, balayage, shatush)",
        items: [
          { service: "1-2 довжина", price: "1200-1600" },
          { service: "3-4 довжина", price: "3500-4000" },
          { service: "5-6 довжина", price: "від 4000" },
        ],
      },
      {
        title: "Хімічна завивка (стрижка, відновлення)",
        items: [
          { service: "1-2 довжина", price: "1200-1600" },
          { service: "3-4 довжина", price: "3500-4000" },
          { service: "5-6 довжина", price: "від 4000" },
        ],
      },
      {
        title: "Стрижка комплекс (миття голови + сушка)",
        items: [
          { service: "1 довжина", price: "400" },
          { service: "2 довжина", price: "500" },
          { service: "3 довжина", price: "600" },
          { service: "4 довжина", price: "від 700" },
        ],
      },
      {
        title: "Реконструкція волосся, окудрення, пілінги",
        items: [
          { service: "1 довжина", price: "500-800" },
          { service: "2 довжина", price: "800-1200" },
          { service: "3 довжина", price: "1200-1600" },
          { service: "4 довжина", price: "від 1600" },
        ],
      },
      {
        title: "Одноетапне фарбування (корінь + довжина)",
        items: [
          { service: "1-2 довжина", price: "800-1400" },
          { service: "3-4 довжина", price: "1400-2000" },
          { service: "5-6 довжина", price: "від 2000" },
        ],
      },
      {
        title: "Двоетапне фарбування (корінь + довжина)",
        items: [
          { service: "1-2 довжина", price: "1400-1600" },
          { service: "3-4 довжина", price: "1600-2200" },
          { service: "5-6 довжина", price: "від 2200" },
        ],
      },
    ],
  },
  {
    masterId: "katya",
    masterName: "Катерина",
    masterRole: "Майстер-універсал",
    categories: [
      {
        title: "Стрижки",
        items: [
          { service: "Жіноча (1 довжина)", price: "300" },
          { service: "Жіноча (2 довжина)", price: "400" },
          { service: "Жіноча (3-4 довжина)", price: "500-550" },
          { service: "Чоловіча (насадка)", price: "200" },
          { service: "Чоловіча (модельна)", price: "300-350" },
        ],
      },
      {
        title: "Фарбування",
        items: [
          { service: "Однотонне (1 довжина)", price: "650" },
          { service: "Однотонне (2 довжина)", price: "750" },
          { service: "Складні техніки (2 довжина)", price: "від 1500" },
          { service: "Складні техніки (3-4 довжина)", price: "від 3000" },
        ],
      },
      {
        title: "Кератин + Холодне відновлення",
        items: [
          { service: "до 30 см", price: "3300" },
          { service: "до 40 см", price: "3900" },
          { service: "до 50 см", price: "4500" },
          { service: "до 60 см", price: "5100" },
          { service: "до 70 см", price: "5400" },
        ],
      },
      {
        title: "Макіяж та зачіски",
        items: [
          { service: "Денний макіяж", price: "1100" },
          { service: "Вечірній макіяж", price: "1250" },
          { service: "Весільний макіяж", price: "1500" },
          { service: "Локони", price: "від 1000" },
          { service: "Голівуд", price: "1500" },
        ],
      },
      {
        title: "Брови, вії, нарощення",
        items: [
          { service: "Фарбування + корекція брів", price: "300" },
          { service: "Ламінування вій", price: "700" },
          { service: "Ламі вій + брів", price: "1300" },
          { service: "Нарощення (1 капсула)", price: "17" },
        ],
      },
    ],
  },
];

// --- GALLERY ---
export const galleryItems: GalleryItem[] = [
  { id: "1", image: "/images/gallery-1.jpg", caption: "До / Після — Вихід з темного" },
  { id: "2", image: "/images/gallery-2.jpg", caption: "До / Після — Тотал блонд" },
  { id: "3", image: "/images/gallery-3.jpg", caption: "До / Після — Чистий блонд" },
  { id: "4", image: "/images/gallery-4.jpg", caption: "До / Після — Холодний блонд" },
  { id: "5", image: "/images/gallery-5.jpg", caption: "До / Після — Натуральний блонд" },
  { id: "6", image: "/images/gallery-6.jpg", caption: "До / Після — Air Touch" },
  { id: "7", image: "/images/gallery-7.jpg", caption: "Бездоганний блонд" },
  { id: "8", image: "/images/gallery-8.jpg", caption: "Холодний платиновий блонд" },
  { id: "9", image: "/images/gallery-9.jpg", caption: "Натуральний теплий блонд" },
  { id: "10", image: "/images/gallery-10.jpg", caption: "Макіяж від Beauty Color" },
  { id: "11", image: "/images/gallery-11.jpg", caption: "Хімічна завивка — кучері" },
];

// --- PRODUCTS ---
export const products: Product[] = [
  {
    id: "1",
    name: "Шампунь відновлюючий",
    description: "Професійний шампунь для пошкодженого волосся",
    price: 450,
    image: "/images/product-1.jpg",
    category: "Догляд",
  },
  {
    id: "2",
    name: "Маска для волосся",
    description: "Інтенсивне живлення та зволоження",
    price: 580,
    image: "/images/product-2.jpg",
    category: "Догляд",
  },
  {
    id: "3",
    name: "Олія для кінчиків",
    description: "Захист та блиск для вашого волосся",
    price: 350,
    image: "/images/product-3.jpg",
    category: "Стайлінг",
  },
  {
    id: "4",
    name: "Термозахист спрей",
    description: "Захист волосся від високих температур",
    price: 420,
    image: "/images/product-4.jpg",
    category: "Стайлінг",
  },
];

// --- REVIEWS ---
export const reviews: Review[] = [
  {
    id: "1",
    name: "Олена К.",
    text: "Неймовірний результат! Наталія зробила мені балаяж, і я просто в захваті. Волосся виглядає природно та розкішно. Обов'язково прийду ще!",
    rating: 5,
  },
  {
    id: "2",
    name: "Марина С.",
    text: "Ходжу до Каті вже рік на кератин. Волосся як шовк після кожної процедури. Дуже рекомендую!",
    rating: 5,
  },
  {
    id: "3",
    name: "Ірина П.",
    text: "Нарешті знайшла свій салон! Атмосфера, професіоналізм, результат — все на вищому рівні. Дякую Beauty Color!",
    rating: 5,
  },
  {
    id: "4",
    name: "Анна Д.",
    text: "Робила складне фарбування у Наталії — вийшла зі слізьми щастя. Саме той колір, про який мріяла!",
    rating: 5,
  },
  {
    id: "5",
    name: "Вікторія Л.",
    text: "Катя — чудовий майстер! Стрижка ідеальна, враховує всі побажання. Атмосфера в салоні дуже затишна.",
    rating: 5,
  },
  {
    id: "6",
    name: "Тетяна М.",
    text: "Купую косметику тільки тут. Завжди професійна консультація та якісні засоби. Волосся вдячне!",
    rating: 5,
  },
];

// --- SALON INFO ---
export const salonInfo = {
  name: "Beauty Color",
  subtitle: "by Natalia Yasenchuk",
  description: "Ваша краса — наша професія. Ми — автори вашого образу. Ми покажимо, якою красивою ти можеш бути.",
  address: "Ярослава Мудрого 14Б, Бровари",
  phone: "+380976088548",
  phoneFormatted: "+380 97 608 85 48",
  instagram: "beautycolor_brovary",
  instagramUrl: "https://www.instagram.com/beautycolor_brovary",
  services: ["Фарбування", "Стрижки", "Кератин", "Ботокс"],
  workHours: "Пн-Пт: 9:00–19:00 | Сб-Нд: 10:00–18:00",
};
