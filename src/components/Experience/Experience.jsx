import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, GitCommitHorizontal } from "lucide-react";
import experience from "../../data/experience";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

export default function Experience() {
 
  const [openId, setOpenId] = useState(experience[0]?.id);

  return (
    <Section id="experience" index="03" label="CAREER.LOG" title="Where I've worked" subtitle="My career, written like a git history.">
      <p className="mb-8 font-mono text-sm text-cyan-os">$ git log --career</p>
      <ol className="relative max-w-4xl space-y-5 border-l border-white/10 pl-8 sm:pl-12">
        {experience.map((x, i) => {
          const isOpen = openId === x.id;
          return (
            <Reveal as="li" key={x.id} delay={i * 0.08} className="group relative">
              <span
                aria-hidden="true"
                className={`absolute -left-12 top-5 grid h-8 w-8 place-items-center rounded-full border bg-bg transition-all sm:-left-16 ${
                  isOpen ? "border-cyan-os text-cyan-os" : "border-white/20 text-muted group-hover:border-cyan-os/60 group-hover:text-cyan-os"
                }`}
                style={isOpen ? { boxShadow: "0 0 18px rgba(0,217,255,0.55)" } : undefined}
              >
                <GitCommitHorizontal size={16} />
              </span>

              <div className={`card card-hover ${isOpen ? "!border-cyan-os/40" : ""}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${x.id}-panel`}
                    onClick={() => setOpenId(isOpen ? null : x.id)}
                    className="flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left sm:p-6"
                  >
                    <span>
                      <span className="block font-mono text-xs text-muted">commit {x.commit}</span>
                      <span className="mt-1 block text-lg font-semibold sm:text-xl">{x.position}</span>
                      <span className="mt-1 block text-sm text-cyan-os">{x.company} · {x.duration}</span>
                    </span>
                    <ChevronDown size={20} aria-hidden="true" className={`mt-1 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180 text-cyan-os" : ""}`} />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${x.id}-panel`}
                      role="region"
                      aria-label={`${x.position} details`}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-white/10 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                        <ul className="space-y-2 text-sm text-slate-300 sm:text-base">
                          {x.responsibilities.map((r) => (
                            <li key={r} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-os" aria-hidden="true" />{r}</li>
                          ))}
                        </ul>
                        {x.achievement && <p className="mt-4 rounded-lg border border-cyan-os/20 bg-cyan-os/5 p-3 text-sm">{x.achievement}</p>}
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                          {x.technologies.map((t) => <li key={t} className="chip">{t}</li>)}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
