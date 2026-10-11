import { Mail, MapPin } from "lucide-react";
import profile from "../../data/profile";
import { hasLink } from "../../utils/links";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import Window from "../ui/Window";
import ContactForm from "./ContactForm";

export default function Contact() {
  const rows = [
    {
      icon: <Mail size={16} />,
      label: "Email",
      text: profile.email,
      href: `mailto:${profile.email}`,
    },
    hasLink(profile.github) && {
      icon: <GithubIcon size={16} />,
      label: "GitHub",
      text: profile.github.replace(/^https?:\/\//, ""),
      href: profile.github,
      ext: true,
    },
    hasLink(profile.linkedin) && {
      icon: <LinkedinIcon size={16} />,
      label: "LinkedIn",
      text: profile.linkedin.replace(/^https?:\/\//, ""),
      href: profile.linkedin,
      ext: true,
    },
    { icon: <MapPin size={16} />, label: "Location", text: profile.location },
  ].filter(Boolean);

  return (
    <Section
      id="contact"
      index="06"
      label="CONTACT"
      title="Let's build something."
      subtitle={
        <>
          Have an idea, opportunity or project?
          <br className="hidden sm:block" /> Let's talk.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="h-full">
          <Window
            title="terminal: connection"
            className="h-full"
            bodyClassName="p-5 font-mono text-sm sm:p-7"
          >
            <p>
              <span className="text-cyan-os">&gt;</span> connection.request()
            </p>
            <p className="mt-3">
              STATUS: <span className="text-cyan-os">READY</span>
            </p>
            <p className="mt-1 text-muted">
              Waiting for your message<span className="animate-blink">_</span>
            </p>
            <ul className="mt-8 space-y-4 font-sans">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-3">
                  <span className="mt-0.5 text-cyan-os" aria-hidden="true">
                    {r.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">
                      {r.label}
                    </span>
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.ext
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="-my-1 inline-block break-all py-1.5 text-base hover:text-cyan-os"
                      >
                        {r.text}
                        {r.ext && (
                          <span className="sr-only"> (opens in a new tab)</span>
                        )}
                      </a>
                    ) : (
                      <span className="text-base">{r.text}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Window>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <Window
            title="message.compose"
            className="h-full"
            bodyClassName="p-5 sm:p-7"
          >
            <ContactForm />
          </Window>
        </Reveal>
      </div>
    </Section>
  );
}
