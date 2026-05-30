const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F6F4F1] font-sans text-[#3D1A12] antialiased selection:bg-[#C9922A]/10">
      <main className="max-w-4xl mx-auto px-6 py-32 md:py-48">

        {/* Header */}
        <header className="mb-24">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#3D1A12]/40 mb-8">
            Mipador · Privacy
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
            Your data.
            <br />
            <span className="text-[#3D1A12]/25 font-light italic">
              Handled with intention.
            </span>
          </h1>
          <p className="max-w-md text-[#3D1A12]/50 font-light leading-relaxed">
            We believe in slow, honest relationships — with furniture, with spaces,
            and with the people who trust us. We only collect what is necessary
            to bring a Mipador piece into your home.
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-20">
          {[
            {
              number: "01",
              label: "Collection",
              title: "Only what's needed",
              body: "To fulfill an order we need your name, address, and email. Nothing more. Your presence on this site is not tracked, sold, or profiled. Your space is yours — so is your data.",
            },
            {
              number: "02",
              label: "Usage",
              title: "A single purpose",
              body: "What we collect exists solely to get your piece to you safely and to answer your questions when you reach out. We don't share, trade, or use your information for anything outside that.",
            },
            {
              number: "03",
              label: "Security",
              title: "Protected at every step",
              body: "All payments are processed through encrypted gateways. Mipador never stores sensitive financial data internally. When your order is complete, the transaction closes cleanly.",
            },
            {
              number: "04",
              label: "Your rights",
              title: "Always in control",
              body: "You can request to see, correct, or delete any data we hold about you at any time. Write to us at mipadorofficial@gmail.com and we'll respond within 48 hours.",
            },
          ].map((s) => (
            <section
              key={s.number}
              className="grid md:grid-cols-2 gap-12 border-t border-[#3D1A12]/10 pt-12"
            >
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#3D1A12]/30 uppercase">
                  {s.number} / {s.label}
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#3D1A12] tracking-tight">
                  {s.title}
                </h3>
                <p className="text-[#3D1A12]/55 leading-relaxed font-light text-sm">
                  {s.body}
                </p>
              </div>
            </section>
          ))}
        </div>

      </main>
    </div>
  );
};

export default PrivacyPolicy;