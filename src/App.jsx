import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import profile from "./data/profile";
import projects from "./data/projects";
import skills from "./data/skills";
import BootScreen from "./components/BootScreen";
import SystemToast from "./components/SystemToast";
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
    <>
      <AnimatePresence>{!booted && <BootScreen key="boot" onEnter={handleEnter} />}</AnimatePresence>
      <SystemToast show={justEntered} />

      {/* Placeholder content. Real sections are added in the next steps. */}
      <main className="min-h-screen grid place-items-center p-6">
        <div className="glass p-8 max-w-md w-full font-mono text-sm">
          <p className="text-cyan-os">● SYSTEM ONLINE (setup check)</p>
          <p className="mt-3">name: {profile.name}</p>
          <p>role: {profile.role}</p>
          <p>projects loaded: {projects.length}</p>
          <p>skill groups loaded: {skills.length}</p>
        </div>
      </main>
    </>
  );
}
