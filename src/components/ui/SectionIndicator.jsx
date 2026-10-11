import useActiveSection from "../../hooks/useActiveSection";


const ITEMS = [
  { id: "about", label: "INTRO" },
  { id: "education", label: "EDUCATION" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];
const IDS = ["home", ...ITEMS.map((i) => i.id)];

export default function SectionIndicator() {
  const active = useActiveSection(IDS);
  return (
    <nav aria-label="Section progress" className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ol className="flex flex-col gap-4">
        {ITEMS.map(({ id, label }, i) => {
          const on = active === id;
          return (
            <li key={id}>
              <a href={`#${id}`} aria-current={on ? "true" : undefined} title={label} className="group flex min-h-[28px] items-center justify-end gap-3 px-1.5 font-mono text-[11px]">
                <span className={`hidden transition-opacity 2xl:inline ${on ? "text-cyan-os opacity-100" : "text-muted opacity-60 group-hover:opacity-100"}`}>
                  0{i + 1} {label}
                </span>
                <span className="sr-only">{label}</span>
                <span className={`block h-2.5 w-2.5 rounded-full border transition-all ${on ? "scale-125 border-cyan-os bg-cyan-os" : "border-slate-500 bg-transparent group-hover:border-cyan-os"}`}
                  style={on ? { boxShadow: "0 0 12px rgba(0,217,255,0.8)" } : undefined} />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
