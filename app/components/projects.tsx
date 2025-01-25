"use Client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
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
          <p className="flex w-fit flex-col gap-1 pointer-events-none select-none text-4xl font-bold">
            Projects
            <motion.span
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="h-1 bg-white rounded-full"
            ></motion.span>
          </p>
        </motion.div>

        <motion.div className="mt-4 container mx-auto grid grid-cols-1 gap-x-2 gap-y-[100vh]">
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
    <motion.div className="bg-stone-800 rounded-3xl transition p-4 sticky top-4 grid grid-cols-1 lg:grid gap-4 lg:grid-cols-5">
      <div
        className="col-span-3 rounded-3xl overflow-hidden 
      "
      >
        <Image
          className="scale-105"
          src={project.image}
          alt={`Image of ${project.title}`}
          width={600}
          height={400}
          layout="responsive"
        />
      </div>
      <div className="col-span-2 text-start flex flex-col gap-4 justify-between">
        <div>
          <p className="text-3xl font-semibold">{project.title}</p>
          <p className="text-xl">{project.description}</p>
          <a
            href={project.link}
            className="p-4 block w-fit bg-white font-semibold text-black duration-300 rounded-3xl"
          >
            Check it out!
            <FontAwesomeIcon
              className="ml-2 font-light"
              icon={faExternalLink}
            ></FontAwesomeIcon>
          </a>
        </div>
        <div className="text-end">
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
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
