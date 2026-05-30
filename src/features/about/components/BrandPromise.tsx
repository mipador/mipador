import { Check } from "lucide-react";

const promises = [
  "Every piece is made by hand, not by algorithm",
  "Materials sourced honestly — wood, leather, clay, iron",
  "Designed to age beautifully, not expire seasonally",
  "Made in Morocco, by Moroccan hands",
  "No fast furniture. No trend chasing. No compromise.",
  "If you don't love it, you don't need it",
];

const BrandPromise = () => (
  <section className="py-24 px-6 bg-[#EFEBE9]">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9922A] mb-6">
            Our promise
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#3D1A12] tracking-tight leading-tight mb-10">
            What Mipador
            <br />
            <span className="text-[#3D1A12]/30 italic font-light">always means.</span>
          </h2>
          <div className="space-y-5">
            {promises.map((p, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-[#C9922A]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="text-[#C9922A]" size={11} />
                </div>
                <span className="text-[#3D1A12]/70 text-sm leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[480px] rounded-3xl overflow-hidden">
          <img
            src="/images/atmosphere-2.jpg"
            alt="Mipador craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0F08]/50 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-2">
              A tree branch. A flat stone. Sunlight through lattice.
            </p>
            <p className="text-white font-bold text-lg leading-snug">
              Beauty doesn't require permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BrandPromise;