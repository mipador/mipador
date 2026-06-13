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
  stock: number;
  model?: string;                  // URL to .glb file for 3D viewer (optional)
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
      "/images/products/wabi-lounge-chair-main.jpg",
      "/images/products/wabi-lounge-chair-detail.jpg",
      "/images/products/wabi-lounge-chair-lifestyle.jpg",
    ],
    tags: ["bestseller", "handcrafted", "new"],
    stock: 4,
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
      "/images/products/medina-coffee-table-main.jpg",
      "/images/products/medina-coffee-table-detail.jpg",
      "/images/products/medina-coffee-table-detail.jpg",
    ],
    tags: ["handcrafted", "new"],
    stock: 4,
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
      "/images/products/atlas-shelf-main.jpg",
      "/images/products/atlas-shelf-detail.jpg",
      "/images/products/atlas-shelf-lifestyle.jpg",
    ],
    tags: ["handcrafted"],
    stock: 4,
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
      "/images/products/kasbah-lamp-main.jpg",
      "/images/products/kasbah-lamp-detail.jpg",
      "/images/products/kasbah-lamp-lifestyle.jpg",
    ],
    tags: ["bestseller"],
    stock: 8,
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
      "/images/products/sabil-vase-main.jpg",
      "/images/products/sabil-vase-detail.jpg",
      "/images/products/sabil-vase-lifestyle.jpg",
    ],
    tags: ["new", "handcrafted"],
    stock: 6,
  },
];