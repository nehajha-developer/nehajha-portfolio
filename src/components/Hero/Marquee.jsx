import { Fragment } from "react";

const PHRASES = [
  "Write beautiful code",
  "Build real products",
  "Learn. Ship. Repeat.",
  "Turn ideas into software",
  "Create, iterate, innovate",
];

const SPEED_SECONDS = 70; 


const css = `
.dos-marquee-track{display:flex;width:max-content;animation:dos-marquee ${SPEED_SECONDS}s linear infinite}
.dos-marquee:hover .dos-marquee-track{animation-play-state:paused}
@keyframes dos-marquee{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){
  .dos-marquee-track{animation:none;width:auto;flex-wrap:wrap;justify-content:center}
  .dos-marquee-dup{display:none}
}`;

// One full set of phrases. Copies are hidden from screen readers so the text is read once.
function PhraseSet({ dup }) {
  return (
    <ul className={`flex shrink-0 items-center ${dup ? "dos-marquee-dup" : ""}`} aria-hidden={dup || undefined}>
      {PHRASES.map((text, i) => (
        <Fragment key={text}>
          <li className="whitespace-nowrap py-1 text-1xl font-bold leading-tight tracking-tight sm:text-2xl lg:text-3xl">
            {i % 2 === 0 ? (
              <span className="text-gradient">{text}</span>
            ) : (
              // outlined text for contrast with the solid phrases
              <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(248,250,252,0.55)" }}>{text}</span>
            )}
          </li>
          <li aria-hidden="true" className="px-6 font-mono text-xl text-cyan-os sm:px-10 sm:text-2xl">&lt;/&gt;</li>
        </Fragment>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Highlights"
      className="dos-marquee relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-6 sm:py-8"
      style={{ WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}
    >
      <style>{css}</style>
      <div className="dos-marquee-track">
        <PhraseSet />
        <PhraseSet dup />
        <PhraseSet dup />
        <PhraseSet dup />
      </div>
    </section>
  );
}
