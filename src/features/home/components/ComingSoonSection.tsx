import { motion } from "framer-motion";

const ComingSoonSection = () => {
  return (
    <section className="relative h-[60vh] bg-[#F4F4F4] overflow-hidden flex items-center justify-center py-20">

      {/* Background Pattern */}
      {/* <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none z-0"
        style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9922A' stroke-width='1.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
      /> */}

      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#3D1A12]/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6">

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="bg-[#FFFFFF] inline-block px-4 py-1 border border-[#3D1A12]/20 rounded-xl mb-8"
        >
          <span className="text-[#3D1A12] text-[9px] font-black uppercase tracking-[0.3em]">
            New Collection • In Progress
          </span>
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-black text-[#3D1A12] mb-6 tracking-tighter">
          THE NEXT
          <br />
          <span className="text-[#3D1A12]/30 italic">CHAPTER</span>
        </h2>

        <p className="text-[#3D1A12]/60 max-w-md mx-auto text-sm leading-relaxed mb-10">
          We don’t rush what should be timeless.
          The next Mipador collection is being shaped slowly — by hand, by material, by patience.
        </p>

        <div className="flex justify-center">
          <div className="flex bg-[#3D1A12]/5 p-1 rounded-xl border border-[#3D1A12]/10 max-w-md w-full">

            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-transparent border-none focus:ring-0 text-[#3D1A12] placeholder:text-[#3D1A12]/30 text-[10px] font-bold uppercase tracking-widest px-6 flex-1"
            />

            <button className="px-6 py-3 bg-[#3D1A12] text-[#F4F4F4] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#4D2A22] transition-colors">
              Notify Me
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ComingSoonSection;
