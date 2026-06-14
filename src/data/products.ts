export type ProductStatus = "available" | "out-of-stock" | "coming-soon";
export type ProductLocation = "indoor" | "outdoor";

export interface ProductLocale {
  name?: string;
  tagline?: string;
  description?: string;
  materials?: string[];
  care?: string[];
  colors?: string[];
  leadTime?: string;
}

export type ProductCategory =
  | "Seating"
  | "Tables"
  | "Lighting"
  | "Storage"
  | "Decor"
  | "Shelving"
  | "Beds"
  | "Outdoor Seating"
  | "Outdoor Tables"
  | "Outdoor Lighting"
  | "Outdoor Decor";

export interface ProductDimensions {
  width: number;   // cm
  depth: number;   // cm
  height: number;  // cm
  weight: number;  // kg
}

export interface Product {
  id: string;
  name: string;
  slug: string;                    // for URL: /products/wabi-lounge-chair
  tagline: string;                 // short emotional sentence
  description: string;            // longer brand-voice paragraph
  price: number;                   // in MAD
  status: ProductStatus;
  location: ProductLocation;       // indoor | outdoor
  category: ProductCategory;
  collection: string;              // e.g. "Wabi Series", "Sahara Edit"
  materials: string[];             // e.g. ["Solid walnut", "Moroccan leather"]
  dimensions: ProductDimensions;
  colors: string[];                // available colorways
  care: string[];                  // care instructions
  leadTime: string;                // e.g. "3–4 weeks" (handcrafted)
  inStock: boolean;
  featured: boolean;
  images: string[];                // multiple images: [main, detail, lifestyle]
  tags: string[];                  // for filtering: ["bestseller", "new", "handcrafted"]
  stock: number;
  model?: string;                  // URL to .glb file for 3D viewer (optional)
  translations?: {
    fr?: ProductLocale;
    ar?: ProductLocale;
    ma?: ProductLocale;
  };
}

export const products: Product[] = [
  // ─── INDOOR ───────────────────────────────────────────────
  {
    id: "1",
    name: "Wabi Lounge Chair",
    slug: "wabi-lounge-chair",
    tagline: "Sit slower. Think deeper.",
    description:
      "Crafted by hand in the medina workshops of Marrakech, the Wabi Lounge Chair carries the memory of ancient craftsmanship into a contemporary silhouette. Its solid walnut frame and full-grain leather seat age beautifully — becoming more yours with every season.",
    price: 8900,
    status: "available",
    location: "indoor",
    category: "Seating",
    collection: "Wabi Series",
    materials: ["Solid walnut wood", "Full-grain Moroccan leather", "Brass hardware"],
    dimensions: { width: 72, depth: 80, height: 85, weight: 18 },
    colors: ["Tobacco", "Sand", "Charcoal"],
    care: [
      "Dust wood surfaces with a dry cloth",
      "Condition leather every 6 months with natural wax",
      "Avoid direct sunlight exposure",
      "Do not use chemical cleaners on leather",
    ],
    leadTime: "3–4 weeks",
    inStock: true,
    featured: true,
    images: [
      "/images/products/wabi-lounge-chair-main.webp",
      "/images/products/wabi-lounge-chair-detail.webp",
      "/images/products/wabi-lounge-chair-lifestyle.webp",
    ],
    tags: ["bestseller", "handcrafted", "new"],
    stock: 4,
    translations: {
      fr: {
        name: "Fauteuil Lounge Wabi",
        tagline: "S'asseoir plus lentement. Penser plus profondément.",
        description: "Façonné à la main dans les ateliers de la médina de Marrakech, le Fauteuil Lounge Wabi porte la mémoire de l'artisanat ancestral dans une silhouette contemporaine. Son cadre en noyer massif et son assise en cuir pleine fleur vieillissent magnifiquement — devenant davantage les vôtres à chaque saison.",
        materials: ["Bois de noyer massif", "Cuir marocain pleine fleur", "Quincaillerie en laiton"],
        colors: ["Tabac", "Sable", "Charbon"],
        care: [
          "Époussetez les surfaces en bois avec un chiffon sec",
          "Nourrissez le cuir tous les 6 mois avec de la cire naturelle",
          "Évitez l'exposition directe au soleil",
          "N'utilisez pas de nettoyants chimiques sur le cuir",
        ],
        leadTime: "3–4 semaines",
      },
      ar: {
        name: "كرسي وابي للاسترخاء",
        tagline: "اجلس بتأنٍّ. فكّر بعمق.",
        description: "مصنوع يدوياً في ورش مدينة مراكش، يحمل كرسي وابي ذاكرة الحرفة العريقة في خطوط معاصرة. إطاره من خشب الجوز الصلب ومقعده من الجلد المغربي الطبيعي يتحسّنان مع الزمن — ليصبحا أكثر ارتباطاً بك مع كل موسم.",
        materials: ["خشب الجوز الصلب", "الجلد المغربي الطبيعي", "تجهيزات نحاسية"],
        colors: ["التبغ", "الرمل", "الفحم"],
        care: [
          "انفض الأسطح الخشبية بقماش جاف",
          "رطّب الجلد كل 6 أشهر بالشمع الطبيعي",
          "تجنب التعرض المباشر لأشعة الشمس",
          "لا تستخدم منظفات كيميائية على الجلد",
        ],
        leadTime: "3–4 أسابيع",
      },
      ma: {
        name: "كرسي وابي ديال الاسترخاء",
        tagline: "قعد بهدوء. فكر بعمق.",
        description: "مصنوع بيدين فالأورشيات ديال المدينة بمراكش، كرسي وابي كيحمل ذاكرة الصنعة القديمة فشكل عصري. الكاركاص ديالو من الجوز الصلب والجلد المغربي الأصيل كيتحسنو مع الوقت — كيوليو ديالك أكثر مع كل فصل.",
        materials: ["خشب الجوز الصلب", "الجلد المغربي الأصيل", "بيجو نحاسية"],
        colors: ["التاباك", "السابلي", "الشاركول"],
        care: [
          "نضح السطوح الخشبية بشمالة جافة",
          "رطّب الجلد كل 6 شهور بالشمع الطبيعي",
          "بعّد على الشمس المباشرة",
          "ما تستعملش منظفات كيميائية على الجلد",
        ],
        leadTime: "3–4 أسابيع",
      },
    },
  },
  {
    id: "2",
    name: "Medina Coffee Table",
    slug: "medina-coffee-table",
    tagline: "Where mornings begin.",
    description:
      "Inspired by the geometric patterns of Moroccan zellige, the Medina Coffee Table translates centuries of craft into a minimal, functional object. The hand-poured concrete top carries natural variation — no two tables are identical.",
    price: 5400,
    status: "available",
    location: "indoor",
    category: "Tables",
    collection: "Medina Edit",
    materials: ["Hand-poured concrete", "Blackened steel base", "Natural wax finish"],
    dimensions: { width: 110, depth: 60, height: 38, weight: 32 },
    colors: ["Raw Concrete", "Warm Sand"],
    care: [
      "Wipe with damp cloth only",
      "Reseal concrete annually with provided wax",
      "Use coasters to avoid staining",
      "Avoid acidic liquids on surface",
    ],
    leadTime: "2–3 weeks",
    inStock: true,
    featured: true,
    images: [
      "/images/products/medina-coffee-table-main.webp",
      "/images/products/medina-coffee-table-detail.webp",
    ],
    tags: ["handcrafted", "new"],
    stock: 4,
    translations: {
      fr: {
        name: "Table Basse Medina",
        tagline: "Là où commencent les matins.",
        description: "Inspirée par les motifs géométriques du zellige marocain, la Table Basse Medina traduit des siècles de savoir-faire en un objet minimal et fonctionnel. Le plateau en béton coulé à la main présente des variations naturelles — aucune table n'est identique à une autre.",
        materials: ["Béton coulé à la main", "Pied en acier noirci", "Finition à la cire naturelle"],
        colors: ["Béton brut", "Sable chaud"],
        care: [
          "Essuyez uniquement avec un chiffon humide",
          "Rescellez le béton annuellement avec la cire fournie",
          "Utilisez des dessous de verre pour éviter les taches",
          "Évitez les liquides acides sur la surface",
        ],
        leadTime: "2–3 semaines",
      },
      ar: {
        name: "طاولة قهوة المدينة",
        tagline: "حيث تبدأ الصباحات.",
        description: "مستوحاة من الأنماط الهندسية للزليج المغربي، تُترجم طاولة قهوة المدينة قروناً من الحرف اليدوية في شيء بسيط ووظيفي. السطح المصبوب يدوياً من الخرسانة يحمل تنوعاً طبيعياً — لا توجد طاولتان متماثلتان.",
        materials: ["خرسانة مصبوبة يدوياً", "قاعدة من الفولاذ المؤكسد", "طلاء شمع طبيعي"],
        colors: ["الخرسانة الخام", "الرمل الدافئ"],
        care: [
          "امسح بقماش مبلل فقط",
          "أعد طلاء الخرسانة سنوياً بالشمع المرفق",
          "استخدم حوامل للأكواب لتجنب البقع",
          "تجنب السوائل الحمضية على السطح",
        ],
        leadTime: "2–3 أسابيع",
      },
      ma: {
        name: "طابلة المدينة للقهوة",
        tagline: "منين كيبدا الصباح.",
        description: "مستوحاة من الأنماط الهندسية ديال الزليج المغربي، طابلة المدينة كتترجم قرون من الصنعة فشيء بسيط وعملي. السطح المصبوب باليد من البيتون فيه تنوع طبيعي — ما كاين حتى جوج طاولتين متشابهتين.",
        materials: ["بيتون مسكوب باليد", "قاعدة من الحديد المؤكسد", "طلاء شمع طبيعي"],
        colors: ["البيتون الخام", "الرمل الدافئ"],
        care: [
          "مسح بقطعة قماش مبللة فقط",
          "تجديد طلاء البيتون كل عام بالشمع المرفق",
          "استعمال سينيات تحت الكيوسان",
          "بعّد على السوائل الحمضية",
        ],
        leadTime: "2–3 أسابيع",
      },
    },
  },
  {
    id: "3",
    name: "Atlas Shelf System",
    slug: "atlas-shelf-system",
    tagline: "Objects deserve a stage.",
    description:
      "The Atlas Shelf System is built for the collector, the reader, the slow thinker. Solid ashwood planks rest on adjustable blackened iron brackets, creating a modular composition that adapts to your wall and your world.",
    price: 4200,
    status: "available",
    location: "indoor",
    category: "Shelving",
    collection: "Atlas Series",
    materials: ["Solid ash wood", "Blackened iron brackets", "Raw steel hardware"],
    dimensions: { width: 160, depth: 25, height: 120, weight: 22 },
    colors: ["Natural Ash", "Smoked Ash"],
    care: [
      "Dust regularly with a dry cloth",
      "Oil wood annually with linseed oil",
      "Max load 25kg per shelf",
      "Fix to wall studs only",
    ],
    leadTime: "2–3 weeks",
    inStock: true,
    featured: false,
    images: [
      "/images/products/atlas-shelf-main.webp",
      "/images/products/atlas-shelf-detail.webp",
      "/images/products/atlas-shelf-lifestyle.webp",
    ],
    tags: ["handcrafted"],
    stock: 4,
    translations: {
      fr: {
        name: "Système d'Étagères Atlas",
        tagline: "Les objets méritent une scène.",
        description: "Le Système d'Étagères Atlas est conçu pour le collectionneur, le lecteur, le penseur lent. Des planches en frêne massif reposent sur des équerres en fer noirci ajustables, créant une composition modulaire qui s'adapte à votre mur et à votre univers.",
        materials: ["Bois de frêne massif", "Équerres en fer noirci", "Quincaillerie en acier brut"],
        colors: ["Frêne naturel", "Frêne fumé"],
        care: [
          "Dépoussiérez régulièrement avec un chiffon sec",
          "Huilez le bois annuellement avec de l'huile de lin",
          "Charge max 25 kg par étagère",
          "Fixez uniquement aux montants du mur",
        ],
        leadTime: "2–3 semaines",
      },
      ar: {
        name: "نظام أرفف أطلس",
        tagline: "الأشياء تستحق منصة عرض.",
        description: "نظام أرفف أطلس مصمم للمقتنين والقراء والمفكرين المتأنين. ألواح خشب الدردار الصلب ترتكز على أقواس من الحديد المؤكسد القابلة للضبط، مكوّنةً تركيباً معيارياً يتكيف مع جدارك وعالمك.",
        materials: ["خشب الدردار الصلب", "أقواس من الحديد المؤكسد", "تجهيزات من الفولاذ الخام"],
        colors: ["الدردار الطبيعي", "الدردار المدخّن"],
        care: [
          "نظّف بانتظام بقماش جاف",
          "ادهن الخشب سنوياً بزيت بذر الكتان",
          "الحمولة القصوى 25 كجم لكل رف",
          "ثبّت في الجدار بالتساميد فقط",
        ],
        leadTime: "2–3 أسابيع",
      },
      ma: {
        name: "نظام الرفوف أطلس",
        tagline: "الأشياء تستاهل منصة.",
        description: "نظام الرفوف أطلس مصنوع للمقتنين والقراء والناس اللي كيحبو يتأملو. ألواح من خشب الدردار الصلب كترتكز على بلاط من الحديد المؤكسد قابلة للضبط، كيتكوّن منهم تركيب معيار يتكيّف مع الجيط ديالك وعالمك.",
        materials: ["خشب الدردار الصلب", "بلاط حديد مؤكسد", "بيجو من الحديد الخام"],
        colors: ["الدردار الطبيعي", "الدردار المدخّن"],
        care: [
          "نضح بشمالة جافة بانتظام",
          "دهن الخشب بزيت الكتان مرة فالعام",
          "الحمل الأقصى 25 كيلو للرف الواحد",
          "تثبيت فالجدار فالتساميد فقط",
        ],
        leadTime: "2–3 أسابيع",
      },
    },
  },
  {
    id: "4",
    name: "Kasbah Floor Lamp",
    slug: "kasbah-floor-lamp",
    tagline: "Light as atmosphere.",
    description:
      "The Kasbah Floor Lamp draws from the pierced metalwork of southern Moroccan architecture. Its perforated brass shade casts intricate shadow patterns across walls at dusk — turning any corner into a small theatre of light.",
    price: 3800,
    status: "available",
    location: "indoor",
    category: "Lighting",
    collection: "Kasbah Edit",
    materials: ["Hand-pierced brass shade", "Solid walnut stem", "Fabric braided cord"],
    dimensions: { width: 35, depth: 35, height: 165, weight: 7 },
    colors: ["Antique Brass", "Brushed Chrome"],
    care: [
      "Polish brass with dry cloth only",
      "Use max 40W E27 bulb",
      "Keep away from moisture",
      "Do not touch shade when lit",
    ],
    leadTime: "3–4 weeks",
    inStock: false,
    featured: true,
    images: [
      "/images/products/kasbah-lamp-main.webp",
      "/images/products/kasbah-lamp-detail.webp",
      "/images/products/kasbah-lamp-lifestyle.webp",
    ],
    tags: ["bestseller"],
    stock: 8,
    translations: {
      fr: {
        name: "Lampadaire Kasbah",
        tagline: "La lumière comme atmosphère.",
        description: "Le Lampadaire Kasbah s'inspire du travail métallique ajouré de l'architecture du sud du Maroc. Son abat-jour en laiton perforé à la main projette des motifs d'ombres complexes sur les murs au crépuscule — transformant chaque coin en un petit théâtre de lumière.",
        materials: ["Abat-jour en laiton perforé à la main", "Tige en noyer massif", "Cordon tressé en tissu"],
        colors: ["Laiton antique", "Chrome brossé"],
        care: [
          "Polissez le laiton avec un chiffon sec uniquement",
          "Utilisez max ampoule 40W E27",
          "Maintenez à l'écart de l'humidité",
          "Ne touchez pas l'abat-jour lorsqu'il est allumé",
        ],
        leadTime: "3–4 semaines",
      },
      ar: {
        name: "مصباح قصبة الأرضي",
        tagline: "الضوء كجوٍّ.",
        description: "يستوحي مصباح قصبة الأرضي من النقش المعدني المخرم في عمارة جنوب المغرب. أباجورته النحاسية المثقوبة يدوياً تُلقي أنماطاً من الظلال المعقدة على الجدران عند الغسق — محوّلةً كل زاوية إلى مسرح صغير من الضوء.",
        materials: ["أباجورة نحاسية مخرمة يدوياً", "عمود من خشب الجوز الصلب", "سلك مجدول من القماش"],
        colors: ["النحاس العتيق", "الكروم المصقول"],
        care: [
          "لمّع النحاس بقماش جاف فقط",
          "استخدم مصباح 40 واط E27 كحد أقصى",
          "أبعد عن الرطوبة",
          "لا تلمس الأباجورة وهي مضاءة",
        ],
        leadTime: "3–4 أسابيع",
      },
      ma: {
        name: "لامبادير قصبة",
        tagline: "الضوء بحال الجو.",
        description: "لامبادير قصبة مستوحى من النقش المعدني المخرم ديال العمارة الجنوبية المغربية. الأباجورة النحاسية المخرمة باليد كتصنع أنماط من الظلال على الجيطان فالغشية — كتحول كل ركيزة لمسرح صغير من الضوء.",
        materials: ["أباجورة نحاسية مخرمة باليد", "عمود من الجوز الصلب", "كابل منسوج من القماش"],
        colors: ["النحاس العتيق", "الكروم المصقول"],
        care: [
          "لمّع النحاس بشمالة جافة فقط",
          "استعمل أقصى 40 واط E27",
          "بعّد على الرطوبة",
          "ما تمسّش الأباجورة منين تكون مضاءة",
        ],
        leadTime: "3–4 أسابيع",
      },
    },
  },
  {
    id: "5",
    name: "Sabil Ceramic Vase",
    slug: "sabil-ceramic-vase",
    tagline: "Emptiness as design.",
    description:
      "Thrown on the wheel in a small Fès atelier, each Sabil Vase is a quiet conversation between maker and clay. Its irregular form and matte glaze absorb light differently at every hour of the day.",
    price: 1200,
    status: "available",
    location: "indoor",
    category: "Decor",
    collection: "Sabil Objects",
    materials: ["Hand-thrown stoneware", "Matte oxide glaze"],
    dimensions: { width: 18, depth: 18, height: 42, weight: 2.4 },
    colors: ["Clay White", "Olive", "Warm Charcoal"],
    care: [
      "Hand wash only",
      "Not dishwasher safe",
      "Waterproof inside — safe for fresh flowers",
      "Handle with care, each piece is unique",
    ],
    leadTime: "1–2 weeks",
    inStock: true,
    featured: false,
    images: [
      "/images/products/sabil-vase-main.webp",
      "/images/products/sabil-vase-detail.webp",
      "/images/products/sabil-vase-lifestyle.webp",
    ],
    tags: ["new", "handcrafted"],
    stock: 6,
    translations: {
      fr: {
        name: "Vase Céramique Sabil",
        tagline: "Le vide comme design.",
        description: "Tourné sur le tour dans un petit atelier de Fès, chaque Vase Sabil est une conversation tranquille entre l'artisan et l'argile. Sa forme irrégulière et sa glaçure matte absorbent la lumière différemment à chaque heure de la journée.",
        materials: ["Grès tourné à la main", "Glaçure à l'oxyde mat"],
        colors: ["Blanc argile", "Olive", "Charbon chaud"],
        care: [
          "Lavage à la main uniquement",
          "Pas au lave-vaisselle",
          "Étanche à l'intérieur — sûr pour les fleurs fraîches",
          "Manipulez avec soin, chaque pièce est unique",
        ],
        leadTime: "1–2 semaines",
      },
      ar: {
        name: "مزهرية سبيل السيراميكية",
        tagline: "الفراغ كتصميم.",
        description: "مشكّل على الدولاب في ورشة صغيرة بفاس، كل مزهرية سبيل محادثة هادئة بين الصانع والطين. شكلها غير المنتظم وطلاؤها المطفأ يمتصان الضوء بشكل مختلف في كل ساعة من النهار.",
        materials: ["فخار خشن ملوّل يدوياً", "طلاء أكسيد مطفأ"],
        colors: ["الأبيض الطيني", "الزيتون", "الفحم الدافئ"],
        care: [
          "اغسل يدوياً فقط",
          "غير مناسب لغسالة الأطباق",
          "مقاوم للماء من الداخل — آمن للزهور الطازجة",
          "تعامل بحذر، كل قطعة فريدة",
        ],
        leadTime: "1–2 أسابيع",
      },
      ma: {
        name: "فاز سبيل السيراميكي",
        tagline: "الخواء بحال ديزاين.",
        description: "مشكّل على الدولاب فورشة صغيرة بفاس، كل فاز سبيل هو محادثة هادئة بين الصانع والطين. الشكل غير المنتظم ديالو والطلاء المطفأ كيمتصو الضوء بطريقة مختلفة كل ساعة من النهار.",
        materials: ["فخار خشن ملوّل باليد", "طلاء أكسيد مطفأ"],
        colors: ["الأبيض الطيني", "الزيتون", "الفحم الدافئ"],
        care: [
          "غسل باليد فقط",
          "ما تحطّش فغسالة الأطباق",
          "داخله ضد الماء — مناسب للورود الطازجة",
          "تعامل بزين، كل قطعة فريدة",
        ],
        leadTime: "1–2 أسابيع",
      },
    },
  },
];