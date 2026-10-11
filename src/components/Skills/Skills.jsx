import skills from "../../data/skills";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import Window from "../ui/Window";

const LEVELS = { Experienced: 3, "Working knowledge": 2, Learning: 1 };

function Meter({ level }) {
  const n = LEVELS[level] ?? 1;
  return (
    <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted">
      {level}
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((d) => <i key={d} className={`h-1.5 w-1.5 rounded-full ${d <= n ? "bg-cyan-os" : "bg-white/15"}`} />)}
      </span>
    </span>
  );
}

export default function Skills() {
  return (
    <Section id="skills" index="04" label="DEV ENVIRONMENT" title="My toolkit" subtitle="Technologies I work with, and how comfortable I am with each.">
      <div className="grid items-start gap-5 md:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.category} delay={i * 0.06}>
            <Window title={`${g.category.toLowerCase()}.config`} bodyClassName="p-3 sm:p-4">
              <ul>
                {g.items.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04]">
                    <span className="text-sm sm:text-base">{s.name}</span>
                    <Meter level={s.level} />
                  </li>
                ))}
              </ul>
            </Window>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
