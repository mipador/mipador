import { motion } from "framer-motion";

const AboutHero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F6F4F1]">
    {/* Moroccan geometric overlay */}
    <div
      className="absolute inset-0 opacity-8"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9922A' stroke-width='1.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "80px 80px",
      }}
    />

    {/* Warm orb */}
    {/* <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-xl"
      style={{ background: "radial-gradient(circle, rgba(90, 67, 25, 0.17) 0%, transparent 70%)" }}
    /> */}

    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[#C9922A] text-[10px] font-black uppercase tracking-[0.5em] mb-8"
      >
        Who we are
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-[#4D2A22] text-6xl md:text-8xl font-black tracking-tight leading-none mb-8"
      >
        We don't sell things.
        <br />
        <span className="text-black/30 italic font-light">
          We build worlds.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="text-black/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
      >
        Rooted in Moroccan craftsmanship. Shaped by slow living.
        Built for people who choose what they bring into their space — consciously.
      </motion.p>
    </div>

    {/* Scroll hint */}
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-12 bg-gradient-to-b from-[#C9922A]/40 to-transparent"
      />
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/20">Scroll</p>
    </div>
  </section>
);

export default AboutHero;