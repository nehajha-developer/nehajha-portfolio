import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import profile from "../../data/profile";
import { SECTIONS, SECTION_IDS } from "../../utils/sections";
import { hasLink } from "../../utils/links";
import useActiveSection from "../../hooks/useActiveSection";
import { goToSection } from "../../utils/scroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Glass effect once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const showResume = hasLink(profile.resume);
  const glass = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
          glass ? "border-white/10 bg-bg/75 shadow-[0_10px_40px_-20px_rgba(37,99,235,0.6)] backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-3 pl-3 pr-2 sm:pl-4">
          <a href="#home" className="flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-os/30 bg-cyan-os/10 font-mono text-[11px] text-cyan-os" aria-hidden="true">&lt;/&gt;</span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">{profile.name}</span>
              <span className="block text-[11px] text-muted">{profile.role}</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={`relative rounded-lg px-3 py-2 text-sm transition-colors hover:text-ink ${active === id ? "bg-cyan-os/10 text-cyan-os" : "text-muted"}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {showResume && (
              <a href={profile.resume} download className="btn-ghost hidden !px-4 !py-2 sm:inline-flex">
                <Download size={14} aria-hidden="true" /> Resume
              </a>
            )}
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              className="overflow-hidden lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <ul className="space-y-1 border-t border-white/10 p-3">
                {SECTIONS.map(({ id, label }, i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => goToSection(e, id, () => setOpen(false))}
                      aria-current={active === id ? "true" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 font-mono text-sm ${active === id ? "bg-cyan-os/10 text-cyan-os" : "text-muted"}`}
                    >
                      <span className="text-xs opacity-60">0{i + 1}</span> {label}
                    </a>
                  </li>
                ))}
                {showResume && (
                  <li>
                    <a href={profile.resume} download className="btn-ghost mt-2 w-full">
                      <Download size={14} aria-hidden="true" /> Download Resume
                    </a>
                  </li>
                )}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
