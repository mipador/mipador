// import React, { useState } from "react";
// import { X, MessageCircle, Send } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface WhatsAppModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   productName: string;
//   price: number;
//   collection: string;
// }

// const WHATSAPP_NUMBER = "212612918900";

// const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
//   isOpen,
//   onClose,
//   productName,
//   price,
//   collection,
// }) => {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     city: "",
//     note: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.name.trim()) e.name = "Required";
//     if (!form.phone.trim()) e.phone = "Required";
//     if (!form.city.trim()) e.city = "Required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSend = () => {
//     if (!validate()) return;

//     const message = `Hello Mipador,

// I would like to place an order.

// Name: ${form.name}
// Phone: ${form.phone}
// City: ${form.city}

// Product:
// ${productName} — ${collection}

// Quantity: 1
// Price: ${price.toLocaleString()} MAD
// ${form.note ? `\nNote:\n${form.note}` : ""}

// Please confirm availability. Thank you.`;

//     const encoded = encodeURIComponent(message);
//     window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
//     onClose();
//     setForm({ name: "", phone: "", city: "", note: "" });
//     setErrors({});
//   };

//   const handleClose = () => {
//     onClose();
//     setErrors({});
//   };

//   const Field = ({
//     label,
//     field,
//     placeholder,
//     type = "text",
//     optional = false,
//   }: {
//     label: string;
//     field: keyof typeof form;
//     placeholder: string;
//     type?: string;
//     optional?: boolean;
//   }) => (
//     <div>
//       <label className="flex items-center justify-between mb-1.5">
//         <span className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/50">
//           {label}
//         </span>
//         {optional && (
//           <span className="text-[9px] text-[#3D1A12]/25 uppercase tracking-widest">
//             Optional
//           </span>
//         )}
//       </label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         value={form[field]}
//         onChange={(e) => {
//           setForm((f) => ({ ...f, [field]: e.target.value }));
//           if (errors[field]) setErrors((er) => ({ ...er, [field]: "" }));
//         }}
//         className={`w-full bg-[#F6F4F1] rounded-xl px-4 py-3 text-sm text-[#3D1A12] placeholder-[#3D1A12]/25 outline-none transition-all ${
//           errors[field]
//             ? "ring-1 ring-red-300"
//             : "focus:ring-1 focus:ring-[#3D1A12]/20"
//         }`}
//       />
//       {errors[field] && (
//         <p className="text-[9px] text-red-400 font-black uppercase tracking-widest mt-1">
//           {errors[field]}
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={handleClose}
//             className="fixed inset-0 bg-[#3D1A12]/30 backdrop-blur-sm z-[70]"
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.96, y: 16 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.96, y: 16 }}
//             transition={{ type: "spring", damping: 30, stiffness: 300 }}
//             className="fixed z-[71] inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#3D1A12]/8">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center">
//                   <MessageCircle size={15} className="text-[#25D366]" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40">
//                     Order via WhatsApp
//                   </p>
//                   <p className="text-sm font-black text-[#3D1A12] tracking-tight leading-tight">
//                     {productName}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleClose}
//                 className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#3D1A12]/6 transition-colors"
//               >
//                 <X size={15} className="text-[#3D1A12]/50" />
//               </button>
//             </div>

//             {/* Price summary */}
//             <div className="px-6 py-3 bg-[#F6F4F1] border-b border-[#3D1A12]/8">
//               <div className="flex items-center justify-between">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/40">
//                   {collection}
//                 </p>
//                 <p className="text-sm font-black text-[#3D1A12]">
//                   {price.toLocaleString()} MAD
//                 </p>
//               </div>
//             </div>

//             {/* Form */}
//             <div className="px-6 py-5 space-y-4">
//               <Field label="Full Name" field="name" placeholder="Your name" />
//               <Field label="Phone" field="phone" placeholder="+212 6XX XXX XXX" type="tel" />
//               <Field label="City" field="city" placeholder="Casablanca, Rabat..." />

//               {/* Note — textarea */}
//               <div>
//                 <label className="flex items-center justify-between mb-1.5">
//                   <span className="text-[9px] font-black uppercase tracking-widest text-[#3D1A12]/50">
//                     Note
//                   </span>
//                   <span className="text-[9px] text-[#3D1A12]/25 uppercase tracking-widest">
//                     Optional
//                   </span>
//                 </label>
//                 <textarea
//                   placeholder="Color preference, delivery details..."
//                   value={form.note}
//                   onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
//                   rows={2}
//                   className="w-full bg-[#F6F4F1] rounded-xl px-4 py-3 text-sm text-[#3D1A12] placeholder-[#3D1A12]/25 outline-none focus:ring-1 focus:ring-[#3D1A12]/20 transition-all resize-none"
//                 />
//               </div>
//             </div>

//             {/* CTA */}
//             <div className="px-6 pb-6">
//               <button
//                 onClick={handleSend}
//                 className="w-full bg-[#25D366] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1ebe5d] active:scale-95 transition-all"
//               >
//                 <Send size={13} /> Send on WhatsApp
//               </button>
//               <p className="text-center text-[9px] text-[#3D1A12]/25 uppercase tracking-widest mt-3">
//                 We confirm availability within 24h
//               </p>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default WhatsAppModal;