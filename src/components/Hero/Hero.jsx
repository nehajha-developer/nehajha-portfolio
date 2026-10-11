import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import profile from "../../data/profile";
import { hasLink } from "../../utils/links";
import { GithubIcon } from "../icons/BrandIcons";
import LaptopScene from "../LaptopScene";
import Marquee from "./Marquee";
import TechIcons from "./TechIcons";

const makeVariants = (reduce) => ({
  container: { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.11, delayChildren: reduce ? 0 : 0.5 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5 } } },
});

function Avatar() {
  const [failed, setFailed] = useState(false);
  const showPhoto = hasLink(profile.photo) && !failed;
  return (
    <div className="shrink-0 rounded-[1.4rem] bg-gradient-to-br from-cyan-os via-royal to-violet-os p-[2px]" style={{ boxShadow: "0 12px 40px -12px rgba(0,217,255,0.45)" }}>
      <div className="h-24 w-24 overflow-hidden rounded-[1.3rem] bg-bg sm:h-28 sm:w-28">
        {showPhoto ? (
          <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="112" height="112" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-cover" />
        ) : (
          <div aria-hidden="true" className="grid h-full w-full place-items-center bg-navy font-mono text-3xl font-bold text-cyan-os">
            {profile.initials || profile.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero({ play }) {
  const reduce = useReducedMotion();
  const { container, item } = makeVariants(reduce);

  return (
    <>
      <section id="home" aria-labelledby="hero-title" className="relative flex items-center overflow-x-clip pb-16 pt-28 md:min-h-screen md:pb-24 md:pt-24">
        <TechIcons />

        <div className="container-x relative z-10 grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <motion.div variants={container} initial="hidden" animate={play ? "show" : "hidden"}>
            {/* Photo + intro */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <Avatar />
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-os/30 bg-cyan-os/5 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-cyan-os">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-os" aria-hidden="true" /> DEVELOPER PORTFOLIO
                </p>
                <p className="mt-3 text-2xl text-muted">Hi, I'm</p>
              </div>
            </motion.div>

            <motion.h1 id="hero-title" variants={item} className="text-gradient mt-3 pb-1 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {profile.name}
            </motion.h1>
            <motion.p variants={item} className="mt-3 text-xl font-medium text-cyan-os sm:text-2xl">{profile.role}</motion.p>
            <motion.p variants={item} className="mt-4 max-w-md text-base text-muted sm:text-lg">{profile.tagline}</motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#projects" className="btn-primary group">
                View Projects <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              {hasLink(profile.resume) && (
                <a href={profile.resume} download className="btn-ghost"><Download size={16} aria-hidden="true" /> Download Resume</a>
              )}
              {hasLink(profile.github) && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <GithubIcon size={16} /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </motion.div>

            <motion.ul variants={item} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
              <li className="flex items-center gap-1.5"><span className="text-cyan-os" aria-hidden="true">●</span> SYSTEM ONLINE</li>
              <li className="flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" /> {profile.location}</li>
              <li><a href="#contact" className="-my-2 flex min-h-[40px] items-center gap-1.5 hover:text-cyan-os"><Mail size={13} aria-hidden="true" /> Get in touch</a></li>
            </motion.ul>
          </motion.div>

          <LaptopScene play={play} />
        </div>

        {/* Scroll indicator (hidden on mobile where the page is short) */}
        <a href="#about" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-widest text-muted hover:text-ink md:flex">
          SCROLL TO ENTER SYSTEM
          <span className="flex h-7 w-4 justify-center rounded-full border border-muted/60 pt-1.5" aria-hidden="true">
            <span className="animate-scrolldot h-1.5 w-0.5 rounded bg-cyan-os" />
          </span>
        </a>
      </section>

     
      <Marquee />
    </>
  );
}
