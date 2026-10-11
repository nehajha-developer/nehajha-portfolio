import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import projects from "../../data/projects";
import Section from "../ui/Section";
import ProjectCard from "./ProjectCard";

const ProjectCaseStudy = lazy(() => import("./ProjectCaseStudy"));

export default function Projects() {
  const [active, setActive] = useState(null);
  const triggerRef = useRef(null);

  const open = useCallback((project, trigger) => { triggerRef.current = trigger; setActive(project); }, []);
  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus(); 
  }, []);

  return (
    <Section
      id="projects" index="05" label="PROJECT LAB" title="Project Lab"
      subtitle={<>Things I've built. Problems I've solved.<br className="hidden sm:block" /> Ideas I've turned into products.</>}
    >
      <div className="space-y-8 lg:space-y-10">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} reverse={i % 2 === 1} onOpen={open} />)}
      </div>
      <Suspense fallback={null}>
        <AnimatePresence>{active && <ProjectCaseStudy key={active.id} project={active} onClose={close} />}</AnimatePresence>
      </Suspense>
    </Section>
  );
}
