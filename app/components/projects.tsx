"use Client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./mini/reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { faGlobeAfrica } from "@fortawesome/free-solid-svg-icons/faGlobeAfrica";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  demo?: string;
  collaborator?: {
    name: string;
    link: string;
  };
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/projectsData.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  return (
    <motion.div>
      <motion.div className="bg-stone-600 p-4 flex flex-col justify-center text-white text-center">
        <motion.div className="flex justify-center">
          <p className="flex flex-col gap-1 pointer-events-none select-none text-4xl font-bold">
            Projects
            <motion.span
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="h-1 bg-white rounded-full"
            ></motion.span>
          </p>
        </motion.div>

        <motion.div className="mt-4 container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {projects.map((project, i) => {
            return <ProjectCard project={project} key={i} />;
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div className="bg-stone-800 rounded-3xl transition p-4 flex flex-col gap-4">
      <div className="w-full h-full ">
        <div className="rounded-3xl relative">
          <Reveal style="w-full h-full overflow-hidden">
            <Image
              src={project.image}
              alt={`Image of ${project.title}`}
              width={600}
              height={400}
              layout="responsive"
              className="rounded-3xl"
            />
          </Reveal>
        </div>
      </div>
      <div className="col-span-2 text-start flex flex-col gap-4 justify-between h-full">
        <div>
          <Reveal>
            <p className="text-3xl font-semibold">{project.title}</p>
          </Reveal>
          <Reveal>
            <p className="text-base">{project.description}</p>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <div className="flex gap-2">
              <a
                href={project.link}
                target="_blank"
                className="p-4 block mt-1 bg-white font-semibold text-black duration-300 rounded-3xl mb-4 hover:scale-95"
              >
                Check it out!
                <FontAwesomeIcon
                  className="ml-2 font-light"
                  icon={faExternalLink}
                ></FontAwesomeIcon>
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  className="p-4 block mt-1 bg-green-600 font-semibold text-white duration-300 rounded-3xl mb-4 hover:scale-95"
                >
                  Live Demo
                  <FontAwesomeIcon
                    className="ml-2 font-light"
                    icon={faGlobeAfrica}
                  ></FontAwesomeIcon>
                </a>
              )}
            </div>
          </Reveal>

          <div
            className={`text-end flex ${
              project.collaborator ? "justify-between" : "justify-end"
            }`}
          >
            {project.collaborator && (
              <Reveal>
                <a
                  href={project.collaborator.link}
                  target="_blank"
                  className="text-xs text-gray-400"
                >
                  Collaborator: {project.collaborator?.name}
                </a>
              </Reveal>
            )}
            <Reveal>
              {project.tags.map((tag, i) => {
                return (
                  <span
                    key={i}
                    className="bg-stone-700 text-white text-xs p-1 rounded-md ml-1"
                  >
                    {tag}
                  </span>
                );
              })}
            </Reveal>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
