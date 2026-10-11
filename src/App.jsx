import { useState, useCallback } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import BootScreen from "./components/BootScreen";
import SystemToast from "./components/SystemToast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AmbientBackground from "./components/ui/AmbientBackground";
import ScrollProgress from "./components/ui/ScrollProgress";
import SectionIndicator from "./components/ui/SectionIndicator";
import CursorGlow from "./components/ui/CursorGlow";
import { readSession, writeSession } from "./utils/session";

const BOOT_KEY = "dos-booted"; // boot shows once per browser session

export default function App() {
  const [booted, setBooted] = useState(() => readSession(BOOT_KEY) === "1");
  const [justEntered, setJustEntered] = useState(false);

  const handleEnter = useCallback(() => {
    writeSession(BOOT_KEY, "1");
    setBooted(true);
    setJustEntered(true);
  }, []);

  return (
    // reducedMotion="user": Framer Motion skips movement for visitors who prefer less motion
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded focus:bg-royal focus:px-4 focus:py-2">
        Skip to content
      </a>
      <AmbientBackground />
      <AnimatePresence>{!booted && <BootScreen key="boot" onEnter={handleEnter} />}</AnimatePresence>
      <SystemToast show={justEntered} />
      <ScrollProgress />
      <SectionIndicator />
      <CursorGlow />

      <Navbar />

      <main id="main">
        <Hero play={booted} />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
