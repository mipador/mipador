import ContactForm from "./components/ContactForm";
import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F4F1] p-6 md:p-12 lg:p-24 selection:bg-[#3D1E16] selection:text-white">
      
      <div className="max-w-6xl mx-auto">
        <ContactHero />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <ContactInfo />
            {/* Minimal Map Placeholder */}
            <div className="w-full h-56 bg-[#E6E3DF] rounded-2xl flex items-center justify-center border border-[#DEDAD5]">
              
                <div className="w-full h-56 rounded-2xl overflow-hidden border border-[#DEDAD5]">
                <iframe
                  title="Casablanca Location"
                  src="https://www.google.com/maps?q=Casablanca, Morocco&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              
            </div>
          </div>

          <div className="bg-[#EFECE8] p-8 md:p-10 rounded-[2.5rem] border border-[#E6E3DF]">
            <h3 className="text-xl font-bold text-[#3D1E16] tracking-tight mb-8">
              Direct Message
            </h3>
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
