export type ProductStatus = "available" | "out-of-stock" | "coming-soon";
export type ProductLocation = "indoor" | "outdoor";
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
      "./public/images/wabi-lounge-chair-main.jpg",
      "./public/images/wabi-lounge-chair-detail.jpg",
      "./public/images/wabi-lounge-chair-lifestyle.jpg",
    ],
    tags: ["bestseller", "handcrafted", "new"],
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
      "./public/images/medina-coffee-table-main.jpg",
      "./public/images/medina-coffee-table-detail.jpg",
      "./public/images/medina-coffee-table-lifestyle.jpg",
    ],
    tags: ["handcrafted", "new"],
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
      "./public/images/atlas-shelf-main.jpg",
      "./public/images/atlas-shelf-detail.jpg",
      "./public/images/atlas-shelf-lifestyle.jpg",
    ],
    tags: ["handcrafted"],
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
      "./public/images/kasbah-lamp-main.jpg",
      "./public/images/kasbah-lamp-detail.jpg",
      "./public/images/kasbah-lamp-lifestyle.jpg",
    ],
    tags: ["bestseller"],
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
      "./public/images/sabil-vase-main.jpg",
      "./public/images/sabil-vase-detail.jpg",
      "./public/images/sabil-vase-lifestyle.jpg",
    ],
    tags: ["new", "handcrafted"],
  },
  {
    id: "6",
    name: "Dar Bed Frame",
    slug: "dar-bed-frame",
    tagline: "The room begins here.",
    description:
      "The Dar Bed Frame reinterprets the traditional Moroccan riad bedroom — low, grounded, intentional. Its headboard features hand-carved cedar wood panels, bringing the warmth and fragrance of the Atlas Mountains into your most private space.",
    price: 14500,
    status: "coming-soon",
    location: "indoor",
    category: "Beds",
    collection: "Dar Series",
    materials: ["Hand-carved Atlas cedar", "Solid oak base", "Brass leg caps"],
    dimensions: { width: 180, depth: 220, height: 95, weight: 68 },
    colors: ["Natural Cedar", "Ebonized Cedar"],
    care: [
      "Dust cedar with dry cloth — do not wet",
      "Cedar fragrance is natural and fades slowly",
      "Apply cedar oil every 12 months",
      "For King size: 180×200cm mattress",
    ],
    leadTime: "6–8 weeks",
    inStock: false,
    featured: true,
    images: [
      "./public/images/dar-bed-main.jpg",
      "./public/images/dar-bed-detail.jpg",
      "./public/images/dar-bed-lifestyle.jpg",
    ],
    tags: ["new"],
  },

  // ─── OUTDOOR ─────────────────────────────────────────────
  {
    id: "7",
    name: "Riad Daybed",
    slug: "riad-daybed",
    tagline: "The afternoon belongs to you.",
    description:
      "Built for slow afternoons in the riad courtyard or on the terrace, the Riad Daybed is constructed from sustainably sourced teak with UV-resistant cushions woven in traditional Moroccan kilim patterns. It weathers beautifully over seasons.",
    price: 11200,
    status: "available",
    location: "outdoor",
    category: "Outdoor Seating",
    collection: "Riad Garden Edit",
    materials: [
      "FSC-certified teak wood",
      "Kilim-pattern outdoor fabric",
      "Stainless steel hardware",
    ],
    dimensions: { width: 200, depth: 90, height: 40, weight: 45 },
    colors: ["Natural Teak", "Weathered Grey Teak"],
    care: [
      "Teak weathers to silver-grey naturally — apply teak oil to maintain warm tone",
      "Store cushions indoors during heavy rain",
      "Clean fabric with mild soap and water",
      "Cover during winter months",
    ],
    leadTime: "4–5 weeks",
    inStock: true,
    featured: true,
    images: [
      "./public/images/riad-daybed-main.jpg",
      "./public/images/riad-daybed-detail.jpg",
      "./public/images/riad-daybed-lifestyle.jpg",
    ],
    tags: ["bestseller", "handcrafted"],
  },
  {
    id: "8",
    name: "Sahara Dining Table",
    slug: "sahara-dining-table",
    tagline: "Meals under open sky.",
    description:
      "The Sahara Outdoor Dining Table is cast in weatherproof fiber concrete with a powder-coated steel frame. Its warm sand surface evokes the open desert — timeless, elemental, built for gatherings that last past sunset.",
    price: 9600,
    status: "available",
    location: "outdoor",
    category: "Outdoor Tables",
    collection: "Sahara Edit",
    materials: [
      "Fiber-reinforced concrete top",
      "Powder-coated steel frame",
      "Anti-rust stainless hardware",
    ],
    dimensions: { width: 220, depth: 95, height: 76, weight: 85 },
    colors: ["Desert Sand", "Slate"],
    care: [
      "Cover during extreme weather",
      "Clean with water and neutral soap only",
      "Do not use abrasive materials on surface",
      "Touch up powder coat if chipped to prevent rust",
    ],
    leadTime: "5–6 weeks",
    inStock: true,
    featured: false,
    images: [
      "./public/images/sahara-table-main.jpg",
      "./public/images/sahara-table-detail.jpg",
      "./public/images/sahara-table-lifestyle.jpg",
    ],
    tags: ["new"],
  },
  {
    id: "9",
    name: "Terrace Lantern",
    slug: "terrace-lantern",
    tagline: "Dusk in the courtyard.",
    description:
      "Hand-forged in Marrakech by fourth-generation metalworkers, the Terrace Lantern is designed to live outdoors year-round. Its aged iron cage holds a flickering LED candle, casting patterns across stone floors as the evening deepens.",
    price: 1800,
    status: "available",
    location: "outdoor",
    category: "Outdoor Lighting",
    collection: "Kasbah Edit",
    materials: ["Hand-forged iron", "Tempered glass panels", "Aged iron finish"],
    dimensions: { width: 24, depth: 24, height: 58, weight: 4.2 },
    colors: ["Aged Iron", "Matte Black"],
    care: [
      "Wipe with dry cloth after rain",
      "Apply anti-rust wax annually",
      "Use only included LED candle",
      "Safe for outdoor use year-round in dry climates",
    ],
    leadTime: "1–2 weeks",
    inStock: true,
    featured: false,
    images: [
      "./public/images/terrace-lantern-main.jpg",
      "./public/images/terrace-lantern-detail.jpg",
      "./public/images/terrace-lantern-lifestyle.jpg",
    ],
    tags: ["handcrafted", "bestseller"],
  },
];