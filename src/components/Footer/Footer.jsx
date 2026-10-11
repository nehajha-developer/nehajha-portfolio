import { Mail } from "lucide-react";
import profile from "../../data/profile";
import { hasLink } from "../../utils/links";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";

export default function Footer() {
  const link =
    "grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-cyan-os/60 hover:text-cyan-os";
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-mono text-sm">
            <span className="text-cyan-os">&lt;/&gt;</span> {profile.name}
          </p>
          <p className="mt-1 font-mono text-xs tracking-widest text-muted">
            Code • Learn • Build • Grow
          </p>
          <p className="mt-3 text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
        <ul className="flex gap-3">
          {hasLink(profile.github) && (
            <li>
              <a
                className={link}
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
              >
                <GithubIcon size={17} />
              </a>
            </li>
          )}
          {hasLink(profile.linkedin) && (
            <li>
              <a
                className={link}
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
              >
                <LinkedinIcon size={17} />
              </a>
            </li>
          )}
          <li>
            <a
              className={link}
              href={`mailto:${profile.email}`}
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
