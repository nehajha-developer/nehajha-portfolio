import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Window from "../ui/Window";


const SCREEN_LINES = ["Building ideas", "Writing clean code", "Creating real impact"];

const STATUS_ROWS = [
  ["Node.js", "v18+"],
  ["MongoDB", "Connected"],
  ["Server", "Running"],
  ["localhost", ":3000"],
];

function useTypedLines(lines, start, reduce) {
  const [count, setCount] = useState(reduce ? lines.length : 0);
  useEffect(() => {
    if (reduce) { setCount(lines.length); return undefined; }
    if (!start) return undefined;
    const id = setInterval(() => setCount((c) => (c >= lines.length ? c : c + 1)), 650);
    return () => clearInterval(id);
  }, [start, reduce, lines.length]);
  return count;
}

const fade = (play, delay, reduce) => ({
  initial: { opacity: 0 },
  animate: { opacity: play ? 1 : 0 },
  transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay },
});

export default function LaptopScene({ play }) {
  const reduce = useReducedMotion();
  const [screenOn, setScreenOn] = useState(false);
  useEffect(() => {
    if (!play) return undefined;
    const id = setTimeout(() => setScreenOn(true), reduce ? 0 : 700);
    return () => clearTimeout(id);
  }, [play, reduce]);
  const typed = useTypedLines(SCREEN_LINES, screenOn, reduce);

  return (
    <div
      role="img"
      aria-label="Illustration of a laptop on a developer desk, with a code editor, git status and server status around it"
      className="relative mx-auto flex w-full max-w-[600px] items-center justify-center py-6 md:min-h-[520px] md:py-10"
    >
      {/* soft light behind the laptop */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/30 blur-3xl md:h-96 md:w-96" />

      {/* Laptop: wrapper centres it, motion.div only animates opacity + y */}
      <div aria-hidden="true" className="relative w-[92%] max-w-[400px] md:w-[70%]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: play ? 1 : 0, y: play ? 0 : 28 }} transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.1 }}>
          {/* lid */}
          <div className="rounded-t-2xl bg-gradient-to-b from-slate-500 to-slate-700 p-[7px] ring-1 ring-white/20" style={{ boxShadow: "0 30px 80px -20px rgba(0,217,255,0.25)" }}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#030a1c] p-3 font-mono text-[11px] sm:text-xs md:p-4">
              <span className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-600" />
              <div className={`transition-opacity duration-700 ${screenOn ? "opacity-100" : "opacity-0"}`}>
                <div className="mb-2 flex items-center gap-1.5 text-[10px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-os" /> terminal
                </div>
                {SCREEN_LINES.slice(0, typed).map((l) => (
                  <p key={l} className="leading-6 md:leading-7"><span className="text-cyan-os">&gt;</span> {l}</p>
                ))}
                <p className="mt-1 leading-6 text-cyan-os">&gt;<span className="animate-blink">_</span></p>
                <div className="mt-3 space-y-1.5 opacity-60">
                  <div className="h-1 w-3/4 rounded bg-white/10" />
                  <div className="h-1 w-1/2 rounded bg-white/10" />
                </div>
              </div>
            </div>
          </div>
          {/* base + desk */}
          <div className="relative -mx-[5%] h-3 rounded-b-2xl bg-gradient-to-b from-slate-400 to-slate-700">
            <div className="mx-auto h-1 w-[16%] rounded-b bg-slate-800" />
          </div>
          <div className="-mx-[6%] mt-px h-px md:-mx-[28%] bg-gradient-to-r from-transparent via-cyan-os/70 to-transparent" />
          <div className="-mx-[6%] h-10 md:-mx-[28%] bg-gradient-to-b from-royal/15 to-transparent" />
        </motion.div>

        {/* Desk objects: tablet and up only */}
        <div aria-hidden="true" className="absolute -right-[16%] bottom-[2.6rem] hidden md:block">
          <div className="relative h-9 w-8 rounded-b-xl bg-gradient-to-b from-slate-200 to-slate-400">
            <div className="absolute -right-2.5 top-1.5 h-4 w-3 rounded-r-full border-2 border-slate-300" />
          </div>
        </div>
        <div aria-hidden="true" className="absolute -left-[15%] bottom-[2.6rem] hidden h-16 w-8 rotate-[-8deg] rounded-md border border-slate-500 bg-slate-900 md:block">
          <div className="m-0.5 h-[calc(100%-4px)] rounded-sm bg-gradient-to-b from-royal/40 to-cyan-os/20" />
        </div>
      </div>

      {/* Floating panels: tablet and up only, to keep mobile light and short */}
      <motion.div aria-hidden="true" className="absolute left-0 top-0 hidden w-52 md:block" {...fade(play, 1.0, reduce)}>
        <Window title="app.js" className="animate-float" bodyClassName="p-3 font-mono text-[11px] leading-relaxed">
          <p><span className="text-violet-os">const</span> app = express();</p>
          <p>app.use(cors());</p>
          <p>app.get(<span className="text-cyan-os">"/"</span>, ...);</p>
        </Window>
      </motion.div>
      <motion.div aria-hidden="true" className="absolute right-0 top-6 hidden w-44 md:block" {...fade(play, 1.2, reduce)}>
        <Window title="git" className="animate-float [animation-delay:-3s]" bodyClassName="p-3 font-mono text-[11px] leading-relaxed">
          <p className="text-muted">branch</p>
          <p className="text-cyan-os">main</p>
          <p className="mt-1">Update portfolio UI</p>
          <p className="text-muted">2 hours ago</p>
        </Window>
      </motion.div>
      <motion.div aria-hidden="true" className="absolute bottom-0 left-0 hidden w-48 md:block" {...fade(play, 1.4, reduce)}>
        <Window title="status" className="animate-float [animation-delay:-5s]" bodyClassName="p-3 font-mono text-[11px] leading-relaxed">
          {STATUS_ROWS.map(([k, v]) => (
            <p key={k} className="flex justify-between gap-3"><span className="text-muted">{k}</span><span className="text-cyan-os">{v}</span></p>
          ))}
        </Window>
      </motion.div>
    </div>
  );
}
