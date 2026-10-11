import { MapPin } from "lucide-react";
import profile from "../../data/profile";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import Window from "../ui/Window";

const prompt = <span className="text-cyan-os">&gt;</span>;

export default function About() {
  const { status } = profile;
  return (
    <Section
      id="about"
      index="01"
      label="INTRO"
      title="Who am I?"
      subtitle="A quick look at the person behind the code."
    >
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="h-full">
          <Window
            title="terminal: whoami"
            className="h-full"
            bodyClassName="p-5 font-mono text-sm sm:p-7"
          >
            <p>{prompt} whoami</p>
            <p className="mt-4 font-sans text-2xl font-semibold sm:text-3xl">
              {profile.name}
            </p>
            <p className="mt-1 text-muted">
              {profile.role} · {profile.educationField}
            </p>
            <p className="mt-5 max-w-xl font-sans text-base leading-7 text-slate-300">
              {profile.about}
            </p>
            <p className="mt-7">{prompt} traits --list</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.traits.map((t) => (
                <li key={t} className="chip !px-2.5 !py-1 !text-xs">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              {prompt}
              <span className="animate-blink">_</span>
            </p>
          </Window>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <Window
            title="status.sh"
            className="h-full"
            bodyClassName="p-5 sm:p-7"
          >
            <p className="flex items-center gap-2 font-mono text-sm text-cyan-os">
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-cyan-os"
                aria-hidden="true"
              />{" "}
              SYSTEM ONLINE
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              {[
                ["Building", status.building],
                ["Learning", status.learning],
                ["Improving", status.improving],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-white/5 pb-3">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {k}
                  </dt>
                  <dd className="mt-1 text-base">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  Location
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-base">
                  <MapPin
                    size={15}
                    className="text-cyan-os"
                    aria-hidden="true"
                  />{" "}
                  {profile.location}
                </dd>
              </div>
            </dl>
          </Window>
        </Reveal>
      </div>
    </Section>
  );
}
