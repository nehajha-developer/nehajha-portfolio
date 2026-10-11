import { ArrowUpRight, ArrowRight } from "lucide-react";
import { hasLink } from "../../utils/links";
import { GithubIcon } from "../icons/BrandIcons";
import Reveal from "../ui/Reveal";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project, reverse, onOpen }) {
  const { number, name, summary, stack, live, github } = project;
  return (
    <Reveal>
      <article
        className="card card-hover group grid gap-6 p-5 sm:p-7 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-9"
        aria-labelledby={`${project.id}-name`}
      >
        <div className={reverse ? "lg:order-2" : ""}>
          <p
            className="font-mono text-5xl font-bold text-white/15 transition-colors duration-300 group-hover:text-cyan-os sm:text-6xl"
            aria-hidden="true"
          >
            {number} /
          </p>
          <h3
            id={`${project.id}-name`}
            className="mt-2 text-2xl font-bold sm:text-3xl"
          >
            {name}
          </h3>
          <p className="mt-3 text-base text-muted sm:text-lg">{summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {stack.map((t) => (
              <li
                key={t}
                className="chip transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            {hasLink(live) && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group/b"
              >
                Live Demo{" "}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover/b:-translate-y-0.5 group-hover/b:translate-x-0.5"
                  aria-hidden="true"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {hasLink(github) && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <GithubIcon size={16} /> View Code
                <span className="sr-only"> on GitHub (opens in a new tab)</span>
              </a>
            )}
            {import.meta.env.DEV && !hasLink(github) && (
              <span className="inline-flex items-center rounded-lg border border-dashed border-cyan-os/40 px-3 text-xs text-cyan-os">
                No GitHub link provided
              </span>
            )}
            <button
              type="button"
              onClick={(e) => onOpen(project, e.currentTarget)}
              className="btn-ghost group/b"
              aria-label={`Open ${name} case study`}
            >
              Case Study{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover/b:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <ProjectVisual project={project} />
        </div>
      </article>
    </Reveal>
  );
}
