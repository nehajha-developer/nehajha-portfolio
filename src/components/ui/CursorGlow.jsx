import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    setEnabled(!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return undefined;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(Boolean(e.target.closest?.("a, button, input, textarea, [role='button']")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] rounded-full border border-cyan-os/60"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: big ? 44 : 24, height: big ? 44 : 24, backgroundColor: big ? "rgba(0,217,255,0.12)" : "rgba(0,217,255,0)" }}
      transition={{ duration: 0.15 }}
    />
  );
}
