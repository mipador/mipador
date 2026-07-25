import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Fade + rise on scroll into view. Transform/opacity only (GPU-cheap),
// fires once, and respects MotionConfig's reducedMotion="user" (see App.tsx).
export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = motion.div,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: typeof motion.div;
}) {
  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Component>
  );
}

// Wrap a grid/list container with this, then give each child item the
// `revealItem` variants below — children fade up in a staggered sequence
// as the container scrolls into view.
export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
