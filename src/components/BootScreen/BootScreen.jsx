import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ✏️ EDIT: the lines shown while "booting". Keep it to about 4 lines so it stays short.
const BOOT_LINES = [
  "Loading developer_profile...",
  "Loading projects...",
  "Loading experience...",
  "Loading skills...",
];

const TICK_MS = 40;   // ✏️ speed: lower = faster. Total boot time is about 1.6s.
const TICK_STEP = 2.5; // percent added per tick

export default function BootScreen({ onEnter }) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const enterRef = useRef(null);
  const ready = progress >= 100;

  // Fill the progress bar (instant when the visitor prefers reduced motion)
  useEffect(() => {
    if (reduceMotion) { setProgress(100); return; }
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(id); return 100; }
        return Math.min(100, p + TICK_STEP);
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Lock page scroll while the boot screen is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Move keyboard focus to the Enter button when ready
  useEffect(() => { if (ready) enterRef.current?.focus(); }, [ready]);

  // Escape skips the boot at any time
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onEnter(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEnter]);

  const visibleLines = Math.min(BOOT_LINES.length, Math.ceil(progress / (100 / BOOT_LINES.length)));

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Developer OS boot screen"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
    >
      <div className="w-full max-w-lg font-mono text-sm">
        <p className="text-cyan-os tracking-wide">INITIALIZING DEVELOPER OS...</p>

        <ul className="mt-4 space-y-1 text-muted" aria-hidden="true">
          {BOOT_LINES.slice(0, visibleLines).map((line) => (
            <li key={line}>
              {line} <span className="text-cyan-os">ok</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3">
          <div
            role="progressbar"
            aria-label="Boot progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            className="h-1.5 flex-1 overflow-hidden rounded bg-navy"
          >
            <div className="h-full bg-cyan-os transition-[width] duration-75" style={{ width: `${progress}%` }} />
          </div>
          <span className="w-10 text-right text-ink">{Math.round(progress)}%</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4" aria-live="polite">
          <p className={ready ? "text-cyan-os" : "text-muted"}>
            {ready ? "● SYSTEM READY" : "○ Starting..."}
          </p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onEnter} className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline">
              Skip
            </button>
            <button ref={enterRef} type="button" onClick={onEnter} disabled={!ready} className="btn-primary disabled:opacity-40 disabled:hover:translate-y-0">
              [ ENTER SYSTEM ]
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
