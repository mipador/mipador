// And simplify the spaces array to just names:
const spaces = [
  "Living Room",
  "Bedroom",
  "Workspace",
  "Terrace",
  "Courtyard",
  "Kitchen",
  "Entrance",
  "Garden",
  "Reading Corner",
  "Atelier",
  "Hammam",
  "Rooftop",
];

const ModelGrid = () => (
  <section className="py-24 px-6 bg-[#F6F4F1]">
    <div className="max-w-7xl mx-auto text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3D1A12]/40 mb-4">
        Every space deserves intention
      </p>
      <h2 className="text-4xl md:text-5xl font-black text-[#3D1A12] tracking-tight mb-4">
        Where does Mipador live?
      </h2>
      <p className="text-[#3D1A12]/40 text-base mb-16 max-w-xl mx-auto leading-relaxed">
        From the private corner where you read at midnight to the terrace where
        the sun sets slowly — we make things for real spaces.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {spaces.map((space, i) => (
          <div
            key={i}
            className="bg-white border border-[#3D1A12]/8 rounded-2xl p-5 hover:border-[#C9922A]/30 hover:bg-[#EFEBE9] transition-all group cursor-default"
          >
            <p className="text-xs font-black text-[#3D1A12] tracking-tight">
              {space}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ModelGrid;
