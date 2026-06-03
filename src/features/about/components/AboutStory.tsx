const AboutStory = () => (
  <section className="pt-26 px-6 bg-[#F6F4F1]">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div className="relative h-[520px] rounded-3xl overflow-hidden order-2 md:order-1 group cursor-pointer">
  
  {/* Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
  >
    <source src="/images/mipadorFlag.mp4" type="video/mp4" />
  </video>

  {/* Dark overlay (normal) */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#2A0F08]/50 via-[#2A0F08]/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />

  {/* Subtle vignette hover glow */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(201,146,42,0.12),transparent_60%)]" />

  {/* Bottom text */}
  <div className="absolute bottom-8 left-8 transition-all duration-500 group-hover:translate-y-[-4px]">
    <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">
      Morocco
    </p>
  </div>

  {/* Optional floating label */}
  <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
    <div className="bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
      <span className="text-white text-[10px] tracking-widest uppercase">
        Craft • Motion • Identity
      </span>
    </div>
  </div>
</div>

        {/* Text */}
        <div className="order-1 md:order-2">

          <h2 className="text-4xl md:text-5xl font-black text-[#3D1A12] tracking-tight leading-tight mb-8">
            <span className="text-[#3D1A12]/30 italic font-light">
              Built for the world.
            </span>
          </h2>

          <div className="space-y-5 text-[#3D1A12]/60 text-base leading-relaxed">
            <p>
              Mipador started with a simple observation: the most beautiful
              spaces we'd ever been in had nothing to do with money. A riad in
              Fès. A workshop in the Atlas foothills. A terrace at golden hour
              with mint tea and nothing else.
            </p>
            <p>
              They had something harder to name — intention. Every object placed
              because it was loved. Every material chosen because it was honest.
              Every corner built to make you feel something.
            </p>
            <p className="text-[#3D1A12] font-semibold">
              Just the feeling of a space that gives you energy, clarity, warmth, and freedom the moment you walk into it.
            </p>
          </div>

          {/* Quote */}
          {/* Quote */}
          <div className="mt-10 border-l-2 border-[#C9922A]/40 pl-6 space-y-4">
            <p className="text-[#3D1A12]/50 italic text-sm leading-relaxed">
              "We buy things we don't need, to impress people we don't love."
              <br />
              <span className="text-[#3D1A12]/30 not-italic text-xs mt-1 block">
                — Tyler Durden · Fight Club
              </span>
            </p>
            <p className="text-[#3D1A12]/70 text-sm leading-relaxed">
              He was right. Most people do exactly that — and feel empty after.
            </p>
            <p className="text-[#3D1A12] font-bold text-sm leading-relaxed">
              Mipador exists for the people who are done with that. Buy less.
              Choose honestly. 
              Choose things because they make your life feel richer.
                Because they inspire you.
                Because they make your space feel like yours.

                Not to impress.
                Not to perform.
                Just to live better.
              <span className="text-[#C9922A]"> free</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutStory;
