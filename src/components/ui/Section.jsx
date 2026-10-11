import Reveal from "./Reveal";

export default function Section({ id, index, label, title, subtitle, children, className = "" }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className="container-x">
        <Reveal>
          <header className="mb-10 max-w-2xl sm:mb-14">
            <p className="eyebrow"><span className="text-muted">{index}</span> / {label}</p>
            <h2 id={`${id}-title`} className="text-gradient mt-3 pb-1 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
            {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
