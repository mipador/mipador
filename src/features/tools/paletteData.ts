// Palette data with embedded multilingual vibe content.
// Names and vibe copy live here (not in i18n) because they're content-heavy
// and tightly coupled to the palette identity.

export type PaletteId =
  | "warm-cozy" | "fresh-bright" | "bold-dramatic" | "natural-minimal"
  | "riad-blue" | "tadelakt-soul" | "atlas-cedar" | "zahra-dusk"
  | "golden-hour" | "medina-soul" | "pure-breath" | "new-medina";

export type RoomId =
  | "living-room" | "bedroom" | "workspace" | "dining-room"
  | "terrace" | "reading-corner" | "bathroom" | "kitchen";

export type PaletteLang = "en" | "fr" | "ar" | "ma";

export interface Swatch {
  hex: string;
  roleKey: string; // points to colorPicker.results.* in i18n
}

export interface VibeContent {
  headline: string;
  desc: string;
  feel: string[];
  bestFor: string[];
}

export interface PaletteEntry {
  id: PaletteId;
  name: Record<PaletteLang, string>;
  swatches: Swatch[];
  productSlugs: string[];
  vibe: Record<PaletteLang, VibeContent>;
}

// ── Room → product preference order ──────────────────────────────────────────
export const ROOM_PRODUCTS: Record<RoomId, string[]> = {
  "living-room":    ["wabi-lounge-chair", "medina-coffee-table", "kasbah-floor-lamp", "atlas-shelf-system", "sabil-ceramic-vase"],
  "bedroom":        ["kasbah-floor-lamp", "sabil-ceramic-vase", "atlas-shelf-system", "wabi-lounge-chair", "medina-coffee-table"],
  "workspace":      ["atlas-shelf-system", "medina-coffee-table", "kasbah-floor-lamp", "sabil-ceramic-vase", "wabi-lounge-chair"],
  "dining-room":    ["sabil-ceramic-vase", "kasbah-floor-lamp", "medina-coffee-table", "atlas-shelf-system", "wabi-lounge-chair"],
  "terrace":        ["kasbah-floor-lamp", "sabil-ceramic-vase", "medina-coffee-table", "wabi-lounge-chair", "atlas-shelf-system"],
  "reading-corner": ["wabi-lounge-chair", "kasbah-floor-lamp", "atlas-shelf-system", "sabil-ceramic-vase", "medina-coffee-table"],
  "bathroom":       ["sabil-ceramic-vase", "kasbah-floor-lamp", "atlas-shelf-system", "medina-coffee-table", "wabi-lounge-chair"],
  "kitchen":        ["sabil-ceramic-vase", "medina-coffee-table", "atlas-shelf-system", "kasbah-floor-lamp", "wabi-lounge-chair"],
};

// ── 12 palettes ───────────────────────────────────────────────────────────────
export const PALETTES: PaletteEntry[] = [
  // 1 ─ Warm & Cozy ────────────────────────────────────────────────────────────
  {
    id: "warm-cozy",
    name: {
      en: "Marrakech Warmth",
      fr: "Chaleur de Marrakech",
      ar: "دفء مراكش",
      ma: "دفء مراكش",
    },
    swatches: [
      { hex: "#E8C4A0", roleKey: "results.wall" },
      { hex: "#C4845A", roleKey: "results.accentWall" },
      { hex: "#6B3A2A", roleKey: "results.woodTone" },
      { hex: "#F0E0C8", roleKey: "results.textiles" },
      { hex: "#C49A6C", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["wabi-lounge-chair", "kasbah-floor-lamp", "sabil-ceramic-vase"],
    vibe: {
      en: {
        headline: "A space that holds you like an embrace at dusk.",
        desc: "These colors carry the warmth of Marrakech's golden hour into your home. Terracotta walls echo centuries of medina plaster. Deep walnut anchors the room with quiet authority. Warm brass catches light like lanterns in a riad courtyard — every evening feels like an occasion.",
        feel: ["Calm", "Safe", "Inspired", "Grounded"],
        bestFor: ["Evening conversations", "Rest & recovery", "Family gatherings", "Reading"],
      },
      fr: {
        headline: "Un espace qui vous enveloppe comme une étreinte au crépuscule.",
        desc: "Ces couleurs apportent la chaleur de l'heure dorée de Marrakech dans votre intérieur. Les murs en terre cuite évoquent des siècles de plâtre de médina. Le noyer sombre ancre la pièce avec une autorité tranquille. Le laiton chaud capte la lumière comme des lanternes dans une cour de riad — chaque soir devient une occasion.",
        feel: ["Calme", "Sécurisé", "Inspiré", "Ancré"],
        bestFor: ["Conversations du soir", "Repos & récupération", "Réunions en famille", "Lecture"],
      },
      ar: {
        headline: "فضاء يحتضنك كعناق دافئ عند الغسق.",
        desc: "تحمل هذه الألوان دفء الساعة الذهبية في مراكش إلى منزلك. جدران التيراكوتا تعكس قرونًا من جص المدينة. خشب الجوز الداكن يرسّخ الغرفة بهدوء راسخ. يلتقط النحاس الدافئ الضوء كالفوانيس في فناء الرياض — كل مساء يصبح مناسبة.",
        feel: ["هدوء", "أمان", "إلهام", "رسوخ"],
        bestFor: ["أحاديث المساء", "الراحة والتعافي", "التجمعات العائلية", "القراءة"],
      },
      ma: {
        headline: "بلاصة كتحضنك بحال العناق فالغروب.",
        desc: "هاد الألوان كيجيبو دفء الساعة الذهبية ديال مراكش لداركم. الجيطان بلون التيراكوتا كيرجعوك لقرون من الجبس ديال المدينة. الجوز الداكن كيثبت البيت بهدوء. النحاس الدافئ كيمسك الضوء بحال الفانوسات فصحن الرياض — كل عشية كتولي مناسبة.",
        feel: ["هدوء", "أمان", "إلهام", "ثبات"],
        bestFor: ["أحاديث الليل", "الراحة", "التجمعات العائلية", "القراية"],
      },
    },
  },

  // 2 ─ Fresh & Bright ─────────────────────────────────────────────────────────
  {
    id: "fresh-bright",
    name: {
      en: "Atlas Spring",
      fr: "Printemps de l'Atlas",
      ar: "ربيع الأطلس",
      ma: "ربيع الأطلس",
    },
    swatches: [
      { hex: "#F2EFEA", roleKey: "results.wall" },
      { hex: "#7A9E82", roleKey: "results.accentWall" },
      { hex: "#C8B090", roleKey: "results.woodTone" },
      { hex: "#D4E4D8", roleKey: "results.textiles" },
      { hex: "#9AB4A0", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["atlas-shelf-system", "medina-coffee-table", "sabil-ceramic-vase"],
    vibe: {
      en: {
        headline: "Clean air. A clear mind. A space that lets you breathe.",
        desc: "Sage and linen work together the way morning light works with cedar — effortlessly. This palette opens a room without emptying it. Natural ash tones keep warmth alive while muted greens bring life without demanding your attention. You'll notice yourself thinking more clearly in here.",
        feel: ["Clear", "Energized", "Focused", "At ease"],
        bestFor: ["Morning rituals", "Home offices", "Creative thinking", "Spring & summer"],
      },
      fr: {
        headline: "Air pur. Esprit clair. Un espace qui vous laisse respirer.",
        desc: "La sauge et le lin fonctionnent ensemble comme la lumière du matin avec le cèdre — sans effort. Cette palette ouvre une pièce sans la vider. Les tons frêne naturel maintiennent la chaleur en vie, tandis que les verts discrets apportent de la vie sans exiger l'attention. Vous penserez plus clairement ici.",
        feel: ["Clair", "Énergisé", "Concentré", "Détendu"],
        bestFor: ["Rituels matinaux", "Bureaux à domicile", "Créativité", "Printemps & été"],
      },
      ar: {
        headline: "هواء نقي. عقل صافٍ. فضاء يمنحك حرية التنفس.",
        desc: "تعمل المريمية والكتان معًا كما تعمل أضواء الصباح مع الأرز — بلا جهد. تفتح هذه اللوحة الغرفة دون إفراغها. تحافظ أطوان الرماد الطبيعي على الدفء، بينما يضيف الأخضر الهادئ حياةً دون أن يسرق الانتباه. ستلاحظ أنك تفكر بوضوح أكبر هنا.",
        feel: ["وضوح", "نشاط", "تركيز", "ارتياح"],
        bestFor: ["الطقوس الصباحية", "مساحات العمل", "التفكير الإبداعي", "الربيع والصيف"],
      },
      ma: {
        headline: "هواء نقي. بال صافي. بلاصة كتخليك تتنفس.",
        desc: "السالفية والكتان كيخدمو مع بعضهم بحال ضوء الصباح مع الأرز — بسهولة. هاد البالطة كتفتح البلاصة من غير ما تفرغها. الألوان الفاتحة ديال الخشب كتحافظ على الدفء والخضرة الهادئة كتزيد حياة. كتلاحظ راسك كتفكر بوضوح أكثر هنا.",
        feel: ["وضوح", "نشاط", "تركيز", "ارتياح"],
        bestFor: ["الصباحات", "بلاصة الخدمة", "الإبداع", "الربيع والصيف"],
      },
    },
  },

  // 3 ─ Bold & Dramatic ────────────────────────────────────────────────────────
  {
    id: "bold-dramatic",
    name: {
      en: "Saharan Night",
      fr: "Nuit Saharienne",
      ar: "ليل الصحراء",
      ma: "ليل الصحرا",
    },
    swatches: [
      { hex: "#2A3C4E", roleKey: "results.wall" },
      { hex: "#1A2834", roleKey: "results.accentWall" },
      { hex: "#3D1A12", roleKey: "results.woodTone" },
      { hex: "#3C3535", roleKey: "results.textiles" },
      { hex: "#C49445", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["wabi-lounge-chair", "kasbah-floor-lamp", "medina-coffee-table"],
    vibe: {
      en: {
        headline: "The feeling of looking up at a Saharan sky full of stars.",
        desc: "Deep navy and midnight tones create a space that commands presence. The tobacco wood tone pulls the earth back into the darkness, keeping it grounded. Antique brass punctuates the room like distant candlelight — quiet, golden, deliberate. This palette turns any room into a space of intention.",
        feel: ["Powerful", "Focused", "Inspired", "Distinctive"],
        bestFor: ["Evening living", "Creative studios", "Home offices", "Art collectors"],
      },
      fr: {
        headline: "L'impression de contempler un ciel saharien étoilé.",
        desc: "Les tons bleu marine et minuit créent un espace qui impose la présence. Le bois tabac ramène la terre dans l'obscurité, gardant la pièce ancrée. Le laiton antique la ponctue comme une bougie lointaine — silencieuse, dorée, délibérée. Cette palette transforme n'importe quelle pièce en espace d'intention.",
        feel: ["Puissant", "Concentré", "Inspiré", "Distinctif"],
        bestFor: ["Vie nocturne", "Studios créatifs", "Bureaux à domicile", "Collectionneurs"],
      },
      ar: {
        headline: "الشعور برفع رأسك نحو سماء صحراوية ممتلئة بالنجوم.",
        desc: "تخلق أطوان الأزرق الداكن والليلي فضاءً يفرض الحضور. يعيد طون خشب التبغ الأرض إلى الظلام، محافظًا على الثبات. يوقّع النحاس العتيق الغرفة كشمعة بعيدة — هادئة، ذهبية، متعمدة. تحول هذه اللوحة أي غرفة إلى فضاء من القصد والإرادة.",
        feel: ["قوة", "تركيز", "إلهام", "تميز"],
        bestFor: ["المعيشة المسائية", "الاستوديوهات الإبداعية", "المكاتب المنزلية", "جامعو الفنون"],
      },
      ma: {
        headline: "بحال ما تشوف السما الصحراوية مليانة نجوم.",
        desc: "الألوان الداكنة كتخلق بلاصة كتفرض الحضور. خشب التاباك كيجيب الأرض للظلام كيحافظ على الثبات. النحاس العتيق كيرسم البيت بحال شمعة بعيدة — هادئة، ذهبية، متعمدة. هاد البالطة كتحول أي بيت لفضاء من القصد.",
        feel: ["قوة", "تركيز", "إلهام", "تميز"],
        bestFor: ["العيشة ديال الليل", "الستوديوهات", "البيرو المنزلي", "جامعو الفن"],
      },
    },
  },

  // 4 ─ Natural & Minimal ──────────────────────────────────────────────────────
  {
    id: "natural-minimal",
    name: {
      en: "Desert Calm",
      fr: "Calme du Désert",
      ar: "هدوء البادية",
      ma: "هدوء الصحرا",
    },
    swatches: [
      { hex: "#ECEAE3", roleKey: "results.wall" },
      { hex: "#D4C9B5", roleKey: "results.accentWall" },
      { hex: "#B5A08A", roleKey: "results.woodTone" },
      { hex: "#C8C0B2", roleKey: "results.textiles" },
      { hex: "#8C7B68", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["atlas-shelf-system", "medina-coffee-table", "sabil-ceramic-vase"],
    vibe: {
      en: {
        headline: "Silence made visible. A room that asks nothing of you.",
        desc: "Raw linen, warm stone, and clay — these are the colors of earth before it's been shaped into anything. This palette strips a space down to its essence, leaving only what is honest. Nothing competes. Everything coheres. You arrive here and feel, somehow, that you've been expected.",
        feel: ["Still", "Restored", "Present", "Free"],
        bestFor: ["Meditation & yoga", "Minimalist living", "Quiet bedrooms", "Year-round"],
      },
      fr: {
        headline: "Le silence rendu visible. Une pièce qui ne vous demande rien.",
        desc: "Lin brut, pierre chaude et argile — ce sont les couleurs de la terre avant d'être façonnée. Cette palette réduit un espace à son essence, ne laissant que ce qui est honnête. Rien ne rivalise. Tout est cohérent. Vous arrivez ici et sentez, d'une certaine façon, que vous étiez attendu.",
        feel: ["Calme", "Ressourcé", "Présent", "Libre"],
        bestFor: ["Méditation & yoga", "Vie minimaliste", "Chambres calmes", "Toute l'année"],
      },
      ar: {
        headline: "صمت مرئي. غرفة لا تطلب منك شيئًا.",
        desc: "الكتان الخام والحجر الدافئ والطين — هذه ألوان الأرض قبل أن تُشكَّل في أي شيء. تجرد هذه اللوحة الفضاء إلى جوهره، تاركةً فقط ما هو صادق. لا شيء يتنافس. كل شيء متسق. تصل إلى هنا وتشعر، بطريقة ما، أنك كنت متوقعًا.",
        feel: ["سكون", "استجمام", "حضور", "حرية"],
        bestFor: ["التأمل واليوغا", "العيش البسيط", "غرف النوم الهادئة", "طوال العام"],
      },
      ma: {
        headline: "الصمت ظاهر. بلاصة ما كتطلبش منك والو.",
        desc: "كتان خام وحجر دافئ وتراب — هاد ألوان الأرض قبل ما تتشكل. هاد البالطة كتقلص البلاصة لأصلها، غير الصادق يبقى. ما كاين حتى حاجة تتنافس. كلشي متجانس. كتوصل هنا وكتحس، بطريقة، بيلا كنت منتظر.",
        feel: ["سكون", "راحة", "حضور", "حرية"],
        bestFor: ["التأمل", "العيشة البسيطة", "الغرف الهادئة", "طول العام"],
      },
    },
  },

  // 5 ─ Mediterranean Blue ─────────────────────────────────────────────────────
  {
    id: "riad-blue",
    name: {
      en: "Riad Blue",
      fr: "Bleu Riad",
      ar: "أزرق الرياض",
      ma: "بلو الرياض",
    },
    swatches: [
      { hex: "#4A7B9D", roleKey: "results.wall" },
      { hex: "#2E5F7A", roleKey: "results.accentWall" },
      { hex: "#E8E0D0", roleKey: "results.woodTone" },
      { hex: "#B8C4CC", roleKey: "results.textiles" },
      { hex: "#F0E8D8", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["sabil-ceramic-vase", "kasbah-floor-lamp", "medina-coffee-table"],
    vibe: {
      en: {
        headline: "The feeling of afternoon light on Fès zellige tiles.",
        desc: "Blue carries memory in Morocco — the color of Chefchaouen's washed walls, of Atlantic light at midday, of fountain water in a silent riad. Paired with warm ivory and pale linen, it transforms any room into a place of serene clarity. You'll find yourself thinking better, breathing slower, seeing further.",
        feel: ["Free", "Clear", "Serene", "Inspired"],
        bestFor: ["Coastal & rooftop spaces", "Bathrooms & hammams", "Workspaces", "Meditation"],
      },
      fr: {
        headline: "La lumière de l'après-midi sur les zellige de Fès.",
        desc: "Le bleu porte la mémoire au Maroc — la couleur des murs lavés de Chefchaouen, de la lumière atlantique à midi, de l'eau des fontaines dans un riad silencieux. Associé à l'ivoire chaud et au lin pâle, il transforme n'importe quelle pièce en lieu de clarté sereine. Vous penserez mieux, respirerez plus lentement.",
        feel: ["Libre", "Clair", "Serein", "Inspiré"],
        bestFor: ["Espaces côtiers & toits", "Salles de bain & hammams", "Espaces de travail", "Méditation"],
      },
      ar: {
        headline: "الشعور بضوء العصر على بلاط زليج فاس.",
        desc: "يحمل الأزرق ذاكرة في المغرب — لون جدران شفشاون المغسولة، ونور المحيط الأطلسي في منتصف النهار، ومياه النافورات في رياض صامت. مقترنًا بالعاج الدافئ والكتان الشاحب، يحوّل أي غرفة إلى مكان من الصفاء الهادئ.",
        feel: ["حرية", "وضوح", "هدوء", "إلهام"],
        bestFor: ["الأسطح والفضاءات الساحلية", "الحمامات", "مساحات العمل", "التأمل"],
      },
      ma: {
        headline: "ضوء العصر على الزليج ديال فاس.",
        desc: "الأزرق كيحمل الذاكرة فالمغرب — لون جيطان شفشاون، وضوء البحر الأطلسي، وماء السبيل فالرياض الهادئ. مع العاج الدافئ والكتان الفاتح، كيحول أي بلاصة لمكان هادئ وصافي. كتفكر مزيان أكثر، كتتنفس أهدى.",
        feel: ["حرية", "وضوح", "هدوء", "إلهام"],
        bestFor: ["الأسطح والبلاصات الساحلية", "الحمامات", "بلاصة الخدمة", "التأمل"],
      },
    },
  },

  // 6 ─ Earthy & Raw ───────────────────────────────────────────────────────────
  {
    id: "tadelakt-soul",
    name: {
      en: "Tadelakt Soul",
      fr: "Âme Tadelakt",
      ar: "روح التادلاكت",
      ma: "روح التادلاكت",
    },
    swatches: [
      { hex: "#C4956A", roleKey: "results.wall" },
      { hex: "#8B6045", roleKey: "results.accentWall" },
      { hex: "#E8D5B5", roleKey: "results.woodTone" },
      { hex: "#7A5C40", roleKey: "results.textiles" },
      { hex: "#D4B896", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["wabi-lounge-chair", "sabil-ceramic-vase", "medina-coffee-table"],
    vibe: {
      en: {
        headline: "Ancient walls. Honest materials. A space with memory.",
        desc: "This is the palette of tadelakt plaster, hand-thrown clay, and spaces that feel lived-in on the very first day. The ochre and umber tones create warmth without sweetness — primal, grounded, deeply honest. A room built from this palette doesn't need art on the walls. The walls are the art.",
        feel: ["Rooted", "Authentic", "Calm", "Connected"],
        bestFor: ["Living & dining rooms", "Artisan aesthetic", "Organic interiors", "Collectors"],
      },
      fr: {
        headline: "Des murs anciens. Des matières honnêtes. Un espace avec mémoire.",
        desc: "C'est la palette du plâtre tadelakt, de l'argile tourné à la main, des espaces qui semblent habités dès le premier jour. Les tons ocre et terre créent une chaleur sans douceur — primaire, ancré, profondément honnête. Une pièce construite avec cette palette n'a pas besoin d'art sur les murs. Les murs sont l'art.",
        feel: ["Enraciné", "Authentique", "Calme", "Connecté"],
        bestFor: ["Salons & salles à manger", "Esthétique artisanale", "Intérieurs organiques", "Collectionneurs"],
      },
      ar: {
        headline: "جدران قديمة. مواد صادقة. فضاء يحمل الذاكرة.",
        desc: "هذه هي لوحة جص التادلاكت والطين المشكّل يدويًا والفضاءات التي تشعر بأنها مسكونة منذ اليوم الأول. تخلق أطوان الأوكر والأمبر دفئًا دون حلاوة — بدائي، راسخ، صادق في عمقه. الغرفة المبنية بهذه اللوحة لا تحتاج لوحات على الجدران — الجدران هي اللوحة.",
        feel: ["جذور", "أصالة", "هدوء", "انتماء"],
        bestFor: ["الصالونات وغرف الطعام", "الجماليات الحرفية", "الديكور العضوي", "المقتنين"],
      },
      ma: {
        headline: "جيطان قديمة. مواد صادقة. بلاصة فيها ذاكرة.",
        desc: "هادي هي البالطة ديال التادلاكت والصلصال المصنوع باليد والبلاصات اللي كتحس فيها بالعيش من أول يوم. الألوان الأوكر والأمبر كيخلقو دفء بلا حلاوة — أصيل وثابت وصادق. البيت المبني بهاد البالطة ما محتاجش لوحات — الجيطان هيا اللوحة.",
        feel: ["جذور", "أصالة", "هدوء", "انتماء"],
        bestFor: ["الصالونات وبيت الماكلة", "الديكور الحرفي", "الداخلية العضوية", "المقتنين"],
      },
    },
  },

  // 7 ─ Dark Forest ────────────────────────────────────────────────────────────
  {
    id: "atlas-cedar",
    name: {
      en: "Atlas Cedar",
      fr: "Cèdre de l'Atlas",
      ar: "أرز الأطلس",
      ma: "أرز الأطلس",
    },
    swatches: [
      { hex: "#2D3B2A", roleKey: "results.wall" },
      { hex: "#1E2B1C", roleKey: "results.accentWall" },
      { hex: "#4A6340", roleKey: "results.woodTone" },
      { hex: "#C8B890", roleKey: "results.textiles" },
      { hex: "#8B9E7A", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["atlas-shelf-system", "kasbah-floor-lamp", "wabi-lounge-chair"],
    vibe: {
      en: {
        headline: "Step into the Atlas Mountains. The air changes.",
        desc: "Forest greens anchor the soul the way cedar wood anchors a room — with permanence and quiet pride. Against natural oak and warm linen, these deep greens create a sanctuary that feels entirely separate from the outside world. This is the palette for people who need their home to feel like a true refuge.",
        feel: ["Protected", "Alive", "Deep", "Focused"],
        bestFor: ["Bedrooms", "Reading corners", "Home offices", "Autumn & winter"],
      },
      fr: {
        headline: "Entrez dans les montagnes de l'Atlas. L'air change.",
        desc: "Les verts de forêt ancrent l'âme de la même façon que le bois de cèdre ancre une pièce — avec permanence et fierté tranquille. Sur des accents de chêne naturel et de lin chaud, ces verts profonds créent un sanctuaire entièrement séparé du monde extérieur. C'est la palette pour ceux qui ont besoin d'un vrai refuge.",
        feel: ["Protégé", "Vivant", "Profond", "Concentré"],
        bestFor: ["Chambres", "Coins lecture", "Bureaux", "Automne & hiver"],
      },
      ar: {
        headline: "ادخل جبال الأطلس. يتغير الهواء.",
        desc: "تُرسّخ الخضرة الغابية الروح كما يُرسّخ خشب الأرز الغرفة — بديمومة وفخر هادئ. مع لمسات البلوط الطبيعي والكتان الدافئ، تخلق هذه الخضرة العميقة ملاذًا يبدو منفصلًا تمامًا عن العالم الخارجي. هذه اللوحة لمن يحتاجون بيتًا يشعرهم بالملجأ الحقيقي.",
        feel: ["حماية", "حيوية", "عمق", "تركيز"],
        bestFor: ["غرف النوم", "أركان القراءة", "المكاتب المنزلية", "الخريف والشتاء"],
      },
      ma: {
        headline: "دخل جبال الأطلس. الهواء كيتبدل.",
        desc: "الخضرة ديال الغابة كترسّخ الروح بحال خشب الأرز كيرسّخ البيت — بثبات وفخر هادئ. مع ألوان البلوط الطبيعي والكتان الدافئ، هاد الخضرة العميقة كتخلق ملجأ منفصل عن العالم. هادي البالطة ديال الناس اللي محتاجين بيتهم يكون ملجأ حقيقي.",
        feel: ["حماية", "حيوية", "عمق", "تركيز"],
        bestFor: ["الغرفة", "ركن القراية", "البيرو", "الخريف والشتاء"],
      },
    },
  },

  // 8 ─ Dusty Rose ─────────────────────────────────────────────────────────────
  {
    id: "zahra-dusk",
    name: {
      en: "Zahra at Dusk",
      fr: "Zahra au Crépuscule",
      ar: "زهرة عند الغسق",
      ma: "الزهرة فالغروب",
    },
    swatches: [
      { hex: "#D4A5A0", roleKey: "results.wall" },
      { hex: "#B8847E", roleKey: "results.accentWall" },
      { hex: "#F0E4E0", roleKey: "results.woodTone" },
      { hex: "#8C6560", roleKey: "results.textiles" },
      { hex: "#E8D0C8", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["sabil-ceramic-vase", "kasbah-floor-lamp", "wabi-lounge-chair"],
    vibe: {
      en: {
        headline: "The softness of a rose petal pressed between old book pages.",
        desc: "Dusty rose isn't sweet — it's weathered, mature, and deeply romantic without trying. These tones create rooms where you exhale without noticing. Gentle, enveloping, like the quality of light that falls just before the Moroccan sunset — when everything turns soft and nothing feels urgent anymore.",
        feel: ["Tender", "Restored", "Intimate", "At home"],
        bestFor: ["Bedrooms", "Living rooms", "Reading corners", "Intimate gatherings"],
      },
      fr: {
        headline: "La douceur d'un pétale de rose pressé entre de vieilles pages de livre.",
        desc: "Le rose poudré n'est pas sucré — il est patiné, mature et profondément romantique sans le chercher. Ces tons créent des pièces où vous expirez sans vous en rendre compte. Doux, enveloppant, comme la qualité de lumière qui tombe juste avant le coucher de soleil marocain — quand tout devient doux et rien ne semble plus urgent.",
        feel: ["Tendre", "Ressourcé", "Intime", "Chez soi"],
        bestFor: ["Chambres", "Salons", "Coins lecture", "Réunions intimes"],
      },
      ar: {
        headline: "نعومة بتلة وردة مضغوطة بين صفحات كتاب قديم.",
        desc: "الوردي المتربّد ليس حلوًا — إنه متقادم وناضج ورومانسي بعمق دون قصد. تخلق هذه الأطوان غرفًا تزفر فيها دون أن تدرك. ناعم ومحيط، كجودة الضوء الذي يسقط قبيل غروب الشمس المغربي — حين يلين كل شيء ولا يبدو أي شيء عاجلًا بعد الآن.",
        feel: ["رقة", "استجمام", "حميمية", "أُلفة"],
        bestFor: ["غرف النوم", "الصالونات", "أركان القراءة", "التجمعات الحميمة"],
      },
      ma: {
        headline: "نعومة بتلة الوردة بين صفحات كتاب قديم.",
        desc: "الوردي المتربّد مش حلو — ناضج ورومانسي بعمق من غير ما يحاول. هاد الألوان كتخلق بلاصات كتتنفس فيها بعمق من غير ما تحس. ناعم ومحيط، بحال الضوء اللي كيوقع قبيل الغروب — منين كيلين كلشي وما كاين حتى حاجة مستعجلة.",
        feel: ["رقة", "راحة", "حميمية", "دفء"],
        bestFor: ["الغرفة", "الصالون", "ركن القراية", "التجمعات الحميمة"],
      },
    },
  },

  // 9 ─ Saharan Gold ───────────────────────────────────────────────────────────
  {
    id: "golden-hour",
    name: {
      en: "Golden Hour",
      fr: "L'Heure Dorée",
      ar: "الساعة الذهبية",
      ma: "الساعة الذهبية",
    },
    swatches: [
      { hex: "#D4A848", roleKey: "results.wall" },
      { hex: "#B88830", roleKey: "results.accentWall" },
      { hex: "#F0E4C0", roleKey: "results.woodTone" },
      { hex: "#3D2A08", roleKey: "results.textiles" },
      { hex: "#E8C870", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["kasbah-floor-lamp", "sabil-ceramic-vase", "wabi-lounge-chair"],
    vibe: {
      en: {
        headline: "Every room becomes golden. Every moment, an occasion.",
        desc: "The Saharan sun doesn't ask permission — it transforms everything it touches into something worth looking at. These gold and amber tones inject warmth and a sense of celebration into a space, making even the most ordinary moments feel deliberate and worth savoring. Life feels festive in here.",
        feel: ["Joyful", "Celebratory", "Warm", "Alive"],
        bestFor: ["Dining rooms", "Living rooms", "Entertaining spaces", "Special occasions"],
      },
      fr: {
        headline: "Chaque pièce devient dorée. Chaque moment, une occasion.",
        desc: "Le soleil saharien ne demande pas la permission — il transforme tout ce qu'il touche en quelque chose qui mérite d'être regardé. Ces tons or et ambre injectent chaleur et célébration dans un espace, rendant même les moments les plus ordinaires délibérés et savoureux. La vie semble festive ici.",
        feel: ["Joyeux", "Festif", "Chaleureux", "Vivant"],
        bestFor: ["Salles à manger", "Salons", "Espaces de réception", "Occasions spéciales"],
      },
      ar: {
        headline: "كل غرفة تصبح ذهبية. كل لحظة مناسبة.",
        desc: "لا تستأذن الشمس الصحراوية — تحوّل كل ما تلمسه إلى شيء يستحق النظر. تضخّ أطوان الذهب والعنبر الدفء والاحتفال في الفضاء، مما يجعل حتى اللحظات الأكثر عادية تبدو متعمدة وتستحق الاستمتاع بها. الحياة تبدو احتفالية هنا.",
        feel: ["فرح", "احتفاء", "دفء", "حيوية"],
        bestFor: ["غرف الطعام", "الصالونات", "فضاءات الترفيه", "المناسبات الخاصة"],
      },
      ma: {
        headline: "كل بيت كيولي ذهبي. كل لحظة مناسبة.",
        desc: "الشمس الصحراوية ما كتطلبش الإذن — كتحول كلشي تلمسه لشيء يستاهل تتفرج عليه. الألوان الذهبية والعنبرية كتضخ الدفء والاحتفال فالبلاصة، وكتخلي حتى اللحظات العادية تحس بيها. الحياة فيها طابع احتفالي.",
        feel: ["فرح", "احتفاء", "دفء", "حيوية"],
        bestFor: ["بيت الماكلة", "الصالون", "الاستقبال", "المناسبات"],
      },
    },
  },

  // 10 ─ Riad Classic ──────────────────────────────────────────────────────────
  {
    id: "medina-soul",
    name: {
      en: "Medina Soul",
      fr: "Âme de la Médina",
      ar: "روح المدينة",
      ma: "روح المدينة",
    },
    swatches: [
      { hex: "#2A5C5C", roleKey: "results.wall" },
      { hex: "#1A3C3C", roleKey: "results.accentWall" },
      { hex: "#C49A68", roleKey: "results.woodTone" },
      { hex: "#E8E0D0", roleKey: "results.textiles" },
      { hex: "#7AABAB", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["sabil-ceramic-vase", "medina-coffee-table", "kasbah-floor-lamp"],
    vibe: {
      en: {
        headline: "Centuries of craft and culture, made quiet and contemporary.",
        desc: "Deep teal carries the weight of Moroccan history — of zellige pools reflecting the sky, of painted cedar ceilings in 14th-century madrasas, of a civilization that expressed beauty as a daily practice. Paired with aged brass and warm ivory, this palette feels simultaneously ancient and utterly current.",
        feel: ["Cultured", "Grounded", "Layered", "Proud"],
        bestFor: ["Living rooms", "Entryways", "Dining rooms", "Heritage interiors"],
      },
      fr: {
        headline: "Des siècles d'artisanat et de culture, rendus calmes et contemporains.",
        desc: "Le bleu sarcelle profond porte le poids de l'histoire marocaine — les bassins en zellige reflétant le ciel, les plafonds de cèdre peints dans les medersa du XIVe siècle, une civilisation qui exprimait la beauté comme pratique quotidienne. Associé au laiton vieilli et à l'ivoire chaud, cette palette semble à la fois ancienne et parfaitement actuelle.",
        feel: ["Cultivé", "Ancré", "Nuancé", "Fier"],
        bestFor: ["Salons", "Entrées", "Salles à manger", "Intérieurs patrimoniaux"],
      },
      ar: {
        headline: "قرون من الحرف والثقافة، صامتة ومعاصرة.",
        desc: "يحمل الأزرق الزمردي العميق ثقل التاريخ المغربي — برك الزليج التي تعكس السماء، وسقوف الأرز المطلية في المدارس من القرن الرابع عشر، وحضارة كانت تعبّر عن الجمال كممارسة يومية. مقترنًا بالنحاس المتقادم والعاج الدافئ، تبدو هذه اللوحة قديمة وحاضرة في آنٍ واحد.",
        feel: ["ثقافة", "رسوخ", "تعقيد", "فخر"],
        bestFor: ["الصالونات", "المداخل", "غرف الطعام", "الديكور الموروث"],
      },
      ma: {
        headline: "قرون من الصنعة والثقافة، هادية ومعاصرة.",
        desc: "الأزرق العميق كيحمل تقل التاريخ المغربي — برك الزليج اللي كتعكس السما، وسقوف الأرز المدهونة ديال المدارس القديمة، وحضارة كانت تعبّر على الجمال كل يوم. مع النحاس العتيق والعاج الدافئ، هاد البالطة كتحس فيها قديمة ومعاصرة فنفس الوقت.",
        feel: ["ثقافة", "ثبات", "تعقيد", "فخر"],
        bestFor: ["الصالون", "المدخل", "بيت الماكلة", "الداخلية التراثية"],
      },
    },
  },

  // 11 ─ Arctic Linen ──────────────────────────────────────────────────────────
  {
    id: "pure-breath",
    name: {
      en: "Pure Breath",
      fr: "Souffle Pur",
      ar: "نفَس نقي",
      ma: "نفَس صافي",
    },
    swatches: [
      { hex: "#F5F3F0", roleKey: "results.wall" },
      { hex: "#EDEAE5", roleKey: "results.accentWall" },
      { hex: "#D8D4CE", roleKey: "results.woodTone" },
      { hex: "#C8C4BE", roleKey: "results.textiles" },
      { hex: "#B0ACA6", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["atlas-shelf-system", "medina-coffee-table", "sabil-ceramic-vase"],
    vibe: {
      en: {
        headline: "A room so quiet, you can finally hear yourself think.",
        desc: "This is the absence of noise made beautiful. A monochromatic study in warmth — not sterile clinical white, but living ivory, warm gray, aged linen. The kind of space where a single ceramic vase says everything that needs to be said, and nothing else competes for your attention. Clarity lives here.",
        feel: ["Clear", "Present", "Still", "Pure"],
        bestFor: ["Minimalists", "Home offices", "Bedrooms", "Year-round living"],
      },
      fr: {
        headline: "Une pièce si calme que vous pouvez enfin vous entendre penser.",
        desc: "C'est l'absence de bruit rendue belle. Une étude monochrome dans la chaleur — pas du blanc clinique stérile, mais de l'ivoire vivant, du gris chaud, du lin vieilli. Le genre d'espace où un seul vase en céramique dit tout ce qui doit être dit, et rien d'autre ne rivalise pour votre attention.",
        feel: ["Clair", "Présent", "Calme", "Pur"],
        bestFor: ["Minimalistes", "Bureaux à domicile", "Chambres", "Toute l'année"],
      },
      ar: {
        headline: "غرفة هادئة جدًا، يمكنك أخيرًا سماع أفكارك.",
        desc: "هذا غياب الضوضاء المصنوع جميلًا. دراسة أحادية اللون في الدفء — ليس أبيض سريريًا معقّمًا، بل عاجًا حيًا ورماديًا دافئًا وكتانًا متقادمًا. نوع المكان الذي يقول فيه إناء خزفي واحد كل ما يحتاج قوله، ولا شيء آخر يتنافس على انتباهك. الوضوح يسكن هنا.",
        feel: ["وضوح", "حضور", "سكون", "نقاء"],
        bestFor: ["المبسّطون", "مساحات العمل", "غرف النوم", "طوال العام"],
      },
      ma: {
        headline: "بلاصة هادية بزاف، كتسمع فيها أفكارك أخيرًا.",
        desc: "هادا غياب الصوت مصنوع مزيان. درسة أحادية اللون فالدفء — مش الأبيض البارد ولكن العاج الحي والرمادي الدافئ والكتان المتقادم. النوع ديال البيت اللي فيه غير فاز سيراميك واحد كيقول كلشي، وما كاين حتا حاجة تنافسك فالانتباه. الوضوح كيسكن هنا.",
        feel: ["وضوح", "حضور", "سكون", "نقاء"],
        bestFor: ["البساطة", "بلاصة الخدمة", "الغرفة", "طول العام"],
      },
    },
  },

  // 12 ─ Terracotta Modern ─────────────────────────────────────────────────────
  {
    id: "new-medina",
    name: {
      en: "New Medina",
      fr: "Nouvelle Médina",
      ar: "المدينة الجديدة",
      ma: "المدينة الجديدة",
    },
    swatches: [
      { hex: "#C4644A", roleKey: "results.wall" },
      { hex: "#A04832", roleKey: "results.accentWall" },
      { hex: "#F0D4C0", roleKey: "results.woodTone" },
      { hex: "#8B3828", roleKey: "results.textiles" },
      { hex: "#E8B090", roleKey: "results.metalDecor" },
    ],
    productSlugs: ["wabi-lounge-chair", "sabil-ceramic-vase", "kasbah-floor-lamp"],
    vibe: {
      en: {
        headline: "Old Morocco, new confidence. A heritage reimagined.",
        desc: "Contemporary terracotta doesn't apologize for its origins — it owns them. This palette brings the raw boldness of Moroccan earth into a modern sensibility. The deeper sienna tones add drama, the blush lights the room with warmth, and the whole effect is something confident, striking, and unapologetically alive.",
        feel: ["Bold", "Warm", "Confident", "Modern"],
        bestFor: ["Living rooms", "Dining rooms", "Kitchens", "Statement spaces"],
      },
      fr: {
        headline: "Le vieux Maroc, une nouvelle confiance. Un héritage réinventé.",
        desc: "La terre cuite contemporaine ne s'excuse pas de ses origines — elle les assume. Cette palette apporte l'audace brute de la terre marocaine dans une sensibilité moderne. Les tons sienne plus profonds ajoutent du drame, le rose pale éclaire la pièce avec chaleur, et l'effet global est quelque chose de confiant, de frappant et d'incontestablement vivant.",
        feel: ["Audacieux", "Chaleureux", "Confiant", "Moderne"],
        bestFor: ["Salons", "Salles à manger", "Cuisines", "Espaces signature"],
      },
      ar: {
        headline: "المغرب القديم، ثقة جديدة. تراث معاد التصور.",
        desc: "التيراكوتا المعاصرة لا تعتذر عن أصولها — بل تملكها. تجلب هذه اللوحة الجرأة الخام للأرض المغربية إلى حساسية حديثة. أطوان الألوان السيينا العميقة تضيف دراما، والألوان الفاتحة تضيء الغرفة بدفء، والتأثير الإجمالي واثق ولافت وحيّ بلا اعتذارات.",
        feel: ["جرأة", "دفء", "ثقة", "حداثة"],
        bestFor: ["الصالونات", "غرف الطعام", "المطابخ", "الفضاءات المميزة"],
      },
      ma: {
        headline: "المغرب القديم، ثقة جديدة. تراث متجدد.",
        desc: "التيراكوتا المعاصرة ما كتعتذرش على أصولها — كتملكها. هاد البالطة كتجيب الجرأة الخام ديال الأرض المغربية فحساسية عصرية. الألوان الداكنة كتزيد دراما، والألوان الفاتحة كتضوي البيت بدفء، والتأثير الكلي واثق ولافت وحي من غير اعتذار.",
        feel: ["جرأة", "دفء", "ثقة", "عصرية"],
        bestFor: ["الصالون", "بيت الماكلة", "الكوزين", "البلاصات المميزة"],
      },
    },
  },
];
