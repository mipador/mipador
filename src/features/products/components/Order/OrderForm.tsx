import React, { useState } from "react";
import { ShoppingCart, Check, Loader } from "lucide-react";

export interface OrderLine {
  name: string;
  collection: string;
  price: number;
  quantity: number;
}

interface OrderFormProps {
  lines: OrderLine[];
  total: number;
  onSuccess?: () => void;
}

interface FieldProps {
  k: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (val: string) => void;
}

// ── Moved outside component — fixes the error ──────────────
const Field: React.FC<FieldProps> = ({
  label, placeholder, type = "text", value, error, onChange,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-black uppercase tracking-widest text-[#3D1A12]/45">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-[#F6F4F1] rounded-xl px-4 py-3 text-sm text-[#3D1A12] placeholder-[#3D1A12]/25 outline-none border transition-all ${
        error
          ? "border-red-300"
          : "border-[#3D1A12]/10 focus:border-[#3D1A12]/30"
      }`}
    />
    {error && (
      <p className="text-[9px] text-red-400 font-black uppercase tracking-widest">
        {error}
      </p>
    )}
  </div>
);

const WHATSAPP_NUMBER = "212612918900";

const OrderForm: React.FC<OrderFormProps> = ({ lines, total, onSuccess }) => {
  const [form, setForm] = useState({
    name: "", phone: "", city: "", address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.address.trim()) e.address = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const setField = (key: keyof typeof form) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: "" }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSending(true);

    const productLines = lines
      .map((l) => `• ${l.name} (${l.collection}) × ${l.quantity} — ${(l.price * l.quantity).toLocaleString()} MAD`)
      .join("\n");

    const message =
`Hello Mipador,

I would like to place an order.

──────────────────
Name: ${form.name}
Phone: ${form.phone}
City: ${form.city}
Address: ${form.address}
──────────────────

Order:
${productLines}

Total: ${total.toLocaleString()} MAD

Please confirm availability. Thank you.`;

    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      setSending(false);
      setSent(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#3D1A12]/8 flex items-center justify-center">
          <Check size={20} className="text-[#3D1A12]" />
        </div>
        <div>
          <p className="text-sm font-black text-[#3D1A12] tracking-tight">
            Order sent.
          </p>
          <p className="text-xs text-[#3D1A12]/40 mt-1 font-light">
            We'll confirm via WhatsApp within 24h.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Field
          k="name" label="Full Name" placeholder="Your name"
          value={form.name} error={errors.name} onChange={setField("name")}
        />
        <Field
          k="phone" label="Phone" placeholder="+212 6XX XXX XXX" type="tel"
          value={form.phone} error={errors.phone} onChange={setField("phone")}
        />
        <Field
          k="city" label="City" placeholder="Casablanca..."
          value={form.city} error={errors.city} onChange={setField("city")}
        />
        <Field
          k="address" label="Address" placeholder="Street, area..."
          value={form.address} error={errors.address} onChange={setField("address")}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={sending}
        className="w-full bg-[#3D1A12] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#4D2A22] active:scale-95 transition-all disabled:opacity-60"
      >
        {sending ? (
          <><Loader size={13} className="animate-spin" /> Sending...</>
        ) : (
          <><ShoppingCart size={13} /> Place Order · {total.toLocaleString()} MAD</>
        )}
      </button>

      <p className="text-center text-[9px] text-[#3D1A12]/25 uppercase tracking-widest">
        We confirm within 24h · Free to cancel
      </p>
    </div>
  );
};

export default OrderForm;