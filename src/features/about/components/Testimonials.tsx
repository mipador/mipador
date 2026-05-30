import { Quote } from "lucide-react";

const voices = [
  {
    text: "I moved into a smaller apartment and for the first time I felt like I had more space. Everything I kept was something I actually loved. The Mipador shelf was the first thing I bought for it.",
    name: "Yasmine B.",
    origin: "Casablanca",
  },
  {
    text: "My grandfather used to sit in a chair that had been in the family for forty years. It had a crack in the leg that nobody fixed because it was part of the story. That's what I want from furniture.",
    name: "Karim D.",
    origin: "Marrakech",
  },
  {
    text: "I used to buy things to feel like I'd arrived. Now I buy one thing that's honest. The Wabi chair sits in a corner with morning light and that's enough for an entire day.",
    name: "Sofia L.",
    origin: "Rabat",
  },
];

const Testimonials = () => (
  <section className="py-24 px-6 bg-[#F6F4F1]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/40 mb-4">
          Real people · Real spaces
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-[#3D1A12] tracking-tight">
          How it feels
          <span className="text-[#3D1A12]/25 italic font-light"> to live with it.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {voices.map((v, i) => (
          <div
            key={i}
            className="bg-white border border-[#3D1A12]/8 rounded-3xl p-8 hover:shadow-lg hover:shadow-[#3D1A12]/5 transition-all"
          >
            <Quote className="text-[#C9922A]/40 mb-6" size={28} />
            <p className="text-[#3D1A12]/70 text-sm leading-relaxed italic mb-8">
              "{v.text}"
            </p>
            <div className="border-t border-[#3D1A12]/8 pt-6">
              <p className="font-black text-[#3D1A12] text-sm tracking-tight">
                {v.name}
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C9922A]/70 mt-1">
                {v.origin}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;