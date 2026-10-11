import { createPortal } from "react-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Database, GitBranch } from "lucide-react";
const glyph = "h-[56%] w-[56%]";
const Text = ({ children }) => <span className="font-mono text-[0.8em] font-bold leading-none">{children}</span>;

const ReactGlyph = () => (
  <svg viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={glyph}>
    <circle r="1.8" fill="currentColor" stroke="none" />
    <ellipse rx="10" ry="4" /><ellipse rx="10" ry="4" transform="rotate(60)" /><ellipse rx="10" ry="4" transform="rotate(120)" />
  </svg>
);
const TailwindGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={glyph}>
    <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.665 10.618 15.026 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12 4.8zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.665 17.818 9.026 19.2 12 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6 12z" />
  </svg>
);
const NodeGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={glyph}>
    <polygon points="12,2.5 20.5,7.25 20.5,16.75 12,21.5 3.5,16.75 3.5,7.25" />
    <text x="12" y="15.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor" stroke="none" fontFamily="monospace">N</text>
  </svg>
);

const ICONS = [
  { name: "React",      node: <ReactGlyph />,                  x: 91, y: 13, mx: 92, my: 12, size: 56, dur: 9,  delay: 0,    mobile: true,  tone: "text-cyan-os" },
  { name: "JavaScript", node: <Text>JS</Text>,                 x: 3,  y: 22, mx: -2, my: 30, size: 46, dur: 11, delay: -3,   mobile: true,  tone: "text-blue-400" },
  { name: "Tailwind",   node: <TailwindGlyph />,               x: 94, y: 40, mx: 92, my: 50, size: 50, dur: 10, delay: -5,   mobile: true,  tone: "text-cyan-os" },
  { name: "Node.js",    node: <NodeGlyph />,                   x: 4,  y: 52, mx: -2, my: 68, size: 52, dur: 12, delay: -2,   mobile: true,  tone: "text-violet-300" },
  { name: "Git",        node: <GitBranch className={glyph} />, x: 90, y: 66, mx: 92, my: 82, size: 40, dur: 8,  delay: -6,   mobile: true,  tone: "text-blue-400" },
  { name: "HTML",       node: <Text>&lt;/&gt;</Text>,         x: 6,  y: 80, size: 44, dur: 10, delay: -4,   mobile: false, tone: "text-cyan-os" },
  { name: "CSS",        node: <Text>{"{ }"}</Text>,            x: 93, y: 88, size: 46, dur: 13, delay: -7,   mobile: false, tone: "text-violet-300" },
  { name: "MongoDB",    node: <Database className={glyph} />, x: 47, y: 90, size: 42, dur: 9,  delay: -1.5, mobile: false, tone: "text-blue-400" },
];

const css = `
.dos-pos{position:absolute;left:calc(var(--mx)*1%);top:calc(var(--my)*1%)}
.dos-tile{width:calc(var(--s)*0.78px);height:calc(var(--s)*0.78px);font-size:calc(var(--s)*0.28px)}
@media (min-width:768px){
  .dos-pos{left:calc(var(--x)*1%);top:calc(var(--y)*1%)}
  .dos-tile{width:calc(var(--s)*1px);height:calc(var(--s)*1px);font-size:calc(var(--s)*0.36px)}
}
@keyframes tech-drift{0%,100%{transform:translate3d(0,0,0) rotate(-3deg)}50%{transform:translate3d(0,-14px,0) rotate(4deg)}}
@media (prefers-reduced-motion:reduce){.dos-tile{animation:none!important}}`;

function FloatingIcon({ icon, index, scrollY, reduce }) {
  // Each icon sways at its own pace as the page scrolls (bounded, so it never leaves the screen).
  const y = useTransform(scrollY, (v) => (reduce ? 0 : Math.sin(v / (520 + index * 70) + index * 1.3) * 70));
  const x = useTransform(scrollY, (v) => (reduce ? 0 : Math.cos(v / (680 + index * 60) + index * 0.9) * 26));
  return (
    <motion.div
      className={`dos-pos ${icon.mobile ? "block" : "hidden md:block"}`}
      style={{ "--x": icon.x, "--y": icon.y, "--mx": icon.mx ?? icon.x, "--my": icon.my ?? icon.y, "--s": icon.size, x, y }}
    >
      <div
        title={icon.name}
        className={`dos-tile grid place-items-center rounded-2xl border border-white/10 bg-white/[0.05] opacity-60 backdrop-blur-sm ${icon.tone}`}
        style={{ animation: `tech-drift ${icon.dur}s ease-in-out ${icon.delay}s infinite`, willChange: "transform" }}
      >
        {icon.node}
      </div>
    </motion.div>
  );
}

export default function TechIcons() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Rendered into <body> so the layer is always a full-screen backdrop, whatever section includes it.
  return createPortal(
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -5 }}>
      <style>{css}</style>
      {ICONS.map((icon, i) => <FloatingIcon key={icon.name} icon={icon} index={i} scrollY={scrollY} reduce={reduce} />)}
    </div>,
    document.body
  );
}
