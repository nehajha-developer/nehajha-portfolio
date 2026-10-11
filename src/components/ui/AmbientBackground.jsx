// Fixed, static backdrop: grid + two soft colour glows. No animation = no performance cost.
export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-royal/10 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-violet/10 blur-[120px]" />
    </div>
  );
}
