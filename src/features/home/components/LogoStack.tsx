import { motion } from "framer-motion";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const css = `
  .mipador-swiper {
    width: 240px;
    height: 270px;
  }
  @media (min-width: 768px) {
    .mipador-swiper {
      width: 280px;
      height: 320px;
    }
  }
`;

// ── Put your atmosphere/product images here ───────────────────
const images = [
  { src: "/images/atmosphere-2.png", alt: "Mipador — contemporary furniture, Morocco" },
  { src: "/images/atmosphere-3.png", alt: "Mipador — spaces that breathe" },
  { src: "/images/atmosphere-4.png", alt: "Mipador — outdoor furniture, Morocco" },
  { src: "/images/atmosphere-5.png", alt: "Mipador — premium home decor, Casablanca" },
];

const LogoStack = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="relative flex items-center justify-center"
    >
      <style>{css}</style>

      <Swiper
        effect="cards"
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        className="mipador-swiper"
      >
        {/* Logo card — always first */}
        <SwiperSlide className="rounded-[2rem] overflow-hidden shadow-2xl">
            <img
              src="/images/atmosphere-1.png"
              alt="Mipador"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-[#3D1A12]/10" />
        </SwiperSlide>

        {/* Atmosphere image cards */}
        {images.map((img, i) => (
          <SwiperSlide key={i} className="rounded-[2rem] overflow-hidden shadow-xl">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* subtle warm overlay */}
            <div className="absolute inset-0 bg-[#3D1A12]/10" />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default LogoStack;