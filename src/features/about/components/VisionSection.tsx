import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const paragraphs = [
  {
    lead: "The albatross doesn't rush.",
    body: "It crosses entire oceans on a single current — carrying nothing extra, landing nowhere until it's exactly where it means to be. That image is the soul of Mipador. Not a brand built on accumulation. Not a brand built on performance. A brand built on the certainty that less, chosen with intention, means more.",
  },
  {
    lead: "We design for people who live that way.",
    body: "Pieces that earn their place in a space not through price tags or trend reports, but through honesty — the right material aging gracefully, the right proportion breathing quietly in the room, the right object that makes you feel at home the moment you walk in. Seating, tables, lighting, shelving, ceramic objects. Indoor and outdoor. Made to last, not to be replaced.",
  },
  {
    lead: "Mipador is for those who move with purpose.",
    body: "Who believe a positive mindset shapes a meaningful life. Who've stopped filling spaces and started choosing them. Who know the difference between a beautiful object and an honest one — and only want the second kind. Based in Casablanca, Morocco. Delivered wherever you are.",
  },
];

const tags = [
  "Be. Not own.",
  "Spaces that set you free.",
  "Design for the long flight.",
];

const VisionSection = () => (
  <section className="py-28 px-6 bg-[#F6F4F1] overflow-hidden">
    <div className="max-w-7xl mx-auto">

      {/* Central statement */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9922A] mb-8">
          Our Vision
        </p>
        <div className="space-y-0">
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-[#3D1A12] tracking-tight leading-none">
            Be.
          </h2>
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic text-[#3D1A12]/20 tracking-tight leading-none">
            Not own.
          </p>
        </div>
      </motion.div>

      {/* Split: image + narrative */}
      <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 md:gap-16 items-start">

        {/* Image */}
        <motion.div
          className="relative h-[440px] md:h-[700px] rounded-3xl overflow-hidden"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <picture style={{ display: "contents" }}>
            <source srcSet="/images/atmosphere-1.webp" type="image/webp" />
            <img
              src="/images/atmosphere-1.png"
              alt="Mipador — spaces that set you free, Casablanca Morocco"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0F08]/80 via-[#2A0F08]/15 to-transparent" />
          <div className="absolute top-6 left-6">
            <div className="bg-black/25 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
              <span className="text-white/70 text-[9px] font-black uppercase tracking-widest">
                Mipador Studio · Casablanca
              </span>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-[#C9922A] text-[9px] font-black uppercase tracking-widest mb-3">
              The spirit behind every piece
            </p>
            <p className="text-white font-black text-2xl leading-tight">
              Move with purpose.
              <br />
              <span className="text-white/40 italic font-light text-xl">
                Live with intention.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="space-y-10 pt-2 md:pt-4"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          {paragraphs.map((p, i) => (
            <motion.div
              key={i}
              className="border-l-2 border-[#C9922A]/25 pl-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: EASE }}
            >
              <p className="text-[#3D1A12] font-black text-base md:text-lg leading-snug mb-3">
                {p.lead}
              </p>
              <p className="text-[#3D1A12]/55 text-sm leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}

          {/* Tagline pills */}
          <div className="flex flex-wrap gap-2 pl-6 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block border border-[#3D1A12]/12 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/40 hover:border-[#C9922A]/30 hover:text-[#C9922A] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default VisionSection;
