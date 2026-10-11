
export default function Window({
  title,
  children,
  className = "",
  bodyClassName = "p-4 sm:p-6",
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#050d24]/80 backdrop-blur ${className}`}
      style={{ boxShadow: "0 24px 60px -34px rgba(37,99,235,0.7)" }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          <i className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          <i className="h-2.5 w-2.5 rounded-full bg-cyan-os/70" />
        </span>
        <span className="ml-2 truncate font-mono text-[11px] text-muted">
          {title}
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
