import {
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
const ContactInfo: React.FC = () => (
  <div className="space-y-10">
    <div className="space-y-6">
      <div className="flex items-center gap-6 group cursor-pointer">
        <div className="w-12 h-12 bg-[#3D1E16]/5 rounded-xl flex items-center justify-center text-[#3D1E16]">
          <MessageCircle size={24} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A76]">
            WhatsApp
          </h4>
          <p className="font-semibold text-[#3D1E16]">+212 612918900</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-[#3D1E16]/5 rounded-xl flex items-center justify-center text-[#3D1E16]">
          <Mail size={20} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A76]">
            Email
          </h4>
          <p className="font-semibold text-[#3D1E16]">mipadorofficial@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-[#3D1E16]/5 rounded-xl flex items-center justify-center text-[#3D1E16]">
          <MapPin size={20} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A76]">
            Studio
          </h4>
          <p className="font-semibold text-[#3D1E16]">Morocco, Casablanca</p>
        </div>
      </div>
    </div>

  </div>
);
export default ContactInfo;
