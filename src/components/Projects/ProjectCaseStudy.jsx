import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight, ArrowUpRight } from "lucide-react";
import { hasLink } from "../../utils/links";
import { GithubIcon } from "../icons/BrandIcons";

const THEMES = {
  indigo:   { panel: "linear-gradient(155deg,#1b2a78 0%, 45%,#0a1033 100%)", border: "rgba(129,140,248,0.45)", overlay: "rgba(3,6,28,0.78)", header: "rgba(17,26,82,0.82)" },
  glass:    { panel: "linear-gradient(155deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))", border: "rgba(255,255,255,0.22)", overlay: "rgba(2,6,23,0.6)", header: "rgba(15,23,42,0.55)" },
  charcoal: { panel: "linear-gradient(160deg,#1c1f27 0%,#14161c 100%)", border: "rgba(255,255,255,0.14)", overlay: "rgba(0,0,0,0.78)", header: "rgba(28,31,39,0.9)" },
};
const THEME = THEMES.glass; 
function Diagram({ nodes }) {
  return (
    <ol className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center" aria-label="Architecture flow">
      {nodes.map((n, i) => (
        <li key={n} className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row">
          <span className="w-full flex-1 rounded-lg border border-cyan-os/30 bg-cyan-os/5 px-3 py-3 text-center font-mono text-xs">{n}</span>
          {i < nodes.length - 1 && <ArrowRight size={16} className="shrink-0 rotate-90 text-cyan-os sm:rotate-0" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

export default function ProjectCaseStudy({ project, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const { name, number, summary, stack, features, architecture, caseStudy: c, live, github } = project;
  const gallery = (project.gallery ?? []).filter(Boolean);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      // Keep keyboard focus inside the dialog
      const f = panelRef.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!f?.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prevOverflow; document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const sections = [
    c.problem && ["Problem", <p key="p">{c.problem}</p>],
    c.solution && ["Solution", <p key="s">{c.solution}</p>],
    gallery.length > 0 && ["Screenshots", (
      <div key="g" className="grid gap-3 sm:grid-cols-2">
        {gallery.map((src, i) => (
          <img key={src} src={src} alt={`${name} screenshot ${i + 1}`} loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            className="w-full rounded-lg border border-white/10 object-cover" />
        ))}
      </div>
    )],
    architecture?.length && ["Architecture", <Diagram key="a" nodes={architecture} />],
    features?.length && ["Features", <ul key="f" className="flex flex-wrap gap-2">{features.map((f) => <li key={f} className="chip !px-2.5 !py-1 !text-xs">{f}</li>)}</ul>],
    stack?.length && ["Technologies", <ul key="t" className="flex flex-wrap gap-2">{stack.map((t) => <li key={t} className="chip !px-2.5 !py-1 !text-xs">{t}</li>)}</ul>],
    c.contribution && ["My Contribution", <p key="c">{c.contribution}</p>],
    c.challenges && ["Challenges", <p key="ch">{c.challenges}</p>],
    c.learned && ["What I Learned", <p key="l">{c.learned}</p>],
    c.future && ["Future Improvements", <p key="fu">{c.future}</p>],
  ].filter(Boolean);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center backdrop-blur-md sm:items-center sm:p-6"
      style={{ background: THEME.overlay }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="case-title"
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border shadow-2xl backdrop-blur-xl sm:rounded-2xl"
        style={{ background: THEME.panel, borderColor: THEME.border, colorScheme: "dark", scrollbarWidth: "thin", scrollbarColor: "rgba(0,217,255,0.45) transparent", boxShadow: "0 30px 90px -20px rgba(37,99,235,0.55)" }}>
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 p-5 backdrop-blur-md sm:p-6"
          style={{ background: THEME.header }}>
          <div>
            <p className="eyebrow">Case study / {number}</p>
            <h3 id="case-title" className="mt-1 text-2xl font-bold sm:text-3xl">{name}</h3>
            <p className="mt-2 text-sm text-muted sm:text-base">{summary}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close case study" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/15 hover:border-cyan-os/60">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-8 p-5 sm:p-6">
          {(hasLink(live) || hasLink(github)) && (
            <div className="flex flex-wrap gap-3">
              {hasLink(live) && (
                <a href={live} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5">
                  Live Demo <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {hasLink(github) && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
                  <GithubIcon size={16} /> View Code<span className="sr-only"> on GitHub (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
          {sections.map(([title, body], i) => (
            <section key={title}>
              <h4 className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cyan-os">
                <span className="text-muted">{String(i + 1).padStart(2, "0")}</span> {title}
              </h4>
              <div className="text-base leading-7 text-slate-300">{body}</div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
