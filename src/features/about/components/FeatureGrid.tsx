import { Wind, Sun, Moon, Mountain, Droplets, Star, Circle, Triangle } from "lucide-react";

const touches = [
  { icon: Sun, title: "Zellige geometry", desc: "Mathematical beauty from 10th century Fès" },
  { icon: Mountain, title: "Atlas cedar", desc: "Wood that smells like memory" },
  { icon: Moon, title: "Riad silence", desc: "Architecture built around emptiness" },
  { icon: Wind, title: "Saharan patience", desc: "Things made slowly, to last forever" },
  { icon: Droplets, title: "Tadelakt plaster", desc: "Waterproof lime polished with stone" },
  { icon: Star, title: "Amazigh symbols", desc: "5000 years of indigenous expression" },
  { icon: Circle, title: "Mashrabiya light", desc: "Shadows as decoration" },
  { icon: Triangle, title: "Natural pigments", desc: "Ochre, saffron, indigo, charcoal" },
];

const FeatureGrid = () => (
  <section className="py-24 px-6 bg-[#F6F4F1]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/40 mb-4">
          Our roots
        </p>
        <h2 className="text-4xl font-black text-[#3D1A12] tracking-tight">
          Morocco gives us everything.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {touches.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-[#3D1A12]/8 rounded-2xl p-6 hover:bg-[#EFEBE9] hover:border-[#C9922A]/20 transition-all group"
          >
            <item.icon
              className="text-[#C9922A] mb-5 transition-transform group-hover:scale-110"
              size={24}
            />
            <h3 className="font-black text-[#3D1A12] text-sm mb-2 tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs text-[#3D1A12]/40 leading-relaxed font-light">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;