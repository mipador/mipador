import { Leaf, Compass, Flame } from "lucide-react";

const values = [
  {
    icon: Compass,
    title: "Intentional",
    description:
      "Nothing we make is accidental. Every proportion, every material, every finish is chosen because it earns its place in your space.",
  },
  {
    icon: Flame,
    title: "Handcrafted",
    description:
      "Made by artisans in Morocco who learned their craft before they could read. Hands that understand wood, clay, leather, and iron differently than machines ever could.",
  },
  {
    icon: Leaf,
    title: "Honest",
    description:
      "We don't chase trends. We don't make things to impress. We make things that age beautifully, that feel better with time, that you'll still love in twenty years.",
  },
];

const CoreFeatures = () => (
  <section className="py-24 px-6 bg-[#2A0F08]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9922A] mb-4">
          What we stand for
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Three principles.
          <span className="text-white/25 italic font-light"> No compromises.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/8 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#C9922A]/15 flex items-center justify-center mb-8 group-hover:bg-[#C9922A]/25 transition-colors">
              <v.icon className="text-[#C9922A]" size={22} />
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">
              {v.title}
            </h3>
            <p className="text-white/40 leading-relaxed text-sm">
              {v.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CoreFeatures;