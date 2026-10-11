// Temporary stand-in so the navbar links have somewhere to scroll. Replaced step by step.
export default function SectionPlaceholder({ id, title, step }) {
  return (
    <section
      id={id}
      className="grid min-h-[60vh] place-items-center border-t border-royal/20 px-5"
    >
      <p className="font-mono text-sm text-muted">
        {title} section, coming in Step {step}
      </p>
    </section>
  );
}
