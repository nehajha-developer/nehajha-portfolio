import { GraduationCap, CheckCircle2, Loader } from "lucide-react";
import education from "../../data/education";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

export default function Education() {
  return (
    <Section
      id="education"
      index="02"
      label="EDUCATION.LOG"
      title="Where I learned"
      subtitle="The academic foundation behind my work."
    >
      <ol className="relative max-w-4xl space-y-6 border-l border-white/10 pl-8 sm:pl-12">
        {education.map((e, i) => {
          const done = e.status === "COMPLETED";
          return (
            <Reveal as="li" key={e.id} delay={i * 0.08} className="relative">
              <span
                className="absolute -left-12 top-5 grid h-8 w-8 place-items-center rounded-full border border-cyan-os/40 bg-bg text-cyan-os sm:-left-16"
                aria-hidden="true"
              >
                <GraduationCap size={15} />
              </span>
              <div className="card card-hover p-5 sm:p-6">
                <p className="font-mono text-xs text-muted">
                  &gt; education.load()
                </p>
                <p className="mt-3 font-mono text-xs text-cyan-os">{e.years}</p>
                <h3 className="mt-1 text-lg font-semibold sm:text-xl">
                  {e.title}
                </h3>
                <p className="mt-1 text-slate-300">{e.institution}</p>
                {e.note && <p className="mt-3 text-sm text-muted">{e.note}</p>}
                <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-cyan-os">
                  {done ? (
                    <CheckCircle2 size={14} aria-hidden="true" />
                  ) : (
                    <Loader size={14} aria-hidden="true" />
                  )}{" "}
                  STATUS: {e.status}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
