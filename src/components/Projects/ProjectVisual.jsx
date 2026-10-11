
function Skeleton({ name }) {
  return (
    <div className="relative h-full w-full p-3 sm:p-4">
      <div className="mb-3 h-2 w-1/3 rounded bg-white/10" />
      <div className="mb-3 h-16 rounded-lg bg-gradient-to-br from-royal/40 to-violet-os/30 sm:h-24" />
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] rounded-md bg-white/[0.06]" />
        ))}
      </div>
      <p className="absolute inset-x-0 bottom-3 text-center font-mono text-[11px] tracking-widest text-white/25">
        {name.toUpperCase()}
      </p>
    </div>
  );
}

export default function ProjectVisual({ project }) {
  const { name, image, device } = project;
  const frame =
    "overflow-hidden transition-transform duration-700 group-hover:scale-[1.04]";

  if (image && device === "phone") {
    return (
      <div className="grid place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-navy/60 to-transparent py-6">
        <div className="aspect-[9/17] w-[38%] min-w-[130px] max-w-[190px] overflow-hidden rounded-[1.6rem] border-[5px] border-slate-600 bg-[#050d24] shadow-2xl">
          <img
            src={image}
            alt={`${name} app screenshot`}
            loading="lazy"
            className={`${frame} h-full w-full object-cover object-top`}
          />
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#050d24]">
        <img
          src={image}
          alt={`${name} screenshot`}
          loading="lazy"
          className={`${frame} aspect-[16/10] w-full object-cover object-top`}
        />
      </div>
    );
  }

  if (device === "phone") {
    return (
      <div
        className="grid place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-navy/60 to-transparent py-6"
        role="img"
        aria-label={`${name} mobile app mockup`}
      >
        <div className="aspect-[9/17] w-[38%] min-w-[130px] max-w-[190px] rounded-[1.6rem] border-[5px] border-slate-600 bg-[#050d24] shadow-2xl">
          <div className={`${frame} h-full rounded-[1.2rem]`}>
            <Skeleton name={name} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-white/10 bg-[#050d24]"
      role="img"
      aria-label={`${name} website mockup`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-slate-600" />
          <i className="h-2 w-2 rounded-full bg-slate-600" />
          <i className="h-2 w-2 rounded-full bg-slate-600" />
        </span>
        <span className="ml-2 h-4 w-1/2 rounded bg-white/5" />
      </div>
      <div className={`${frame} aspect-[16/10]`}>
        <Skeleton name={name} />
      </div>
    </div>
  );
}
