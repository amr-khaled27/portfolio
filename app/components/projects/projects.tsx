"use Client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectCard from "./projectCard";

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  link: string;
  mainTags: string[];
  tags: string[];
  demo?: string;
  collaborator?: {
    name: string;
    link: string;
  };
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    fetch("/projectsData.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  return (
    <motion.div id="projects">
      <motion.div className="bg-colors-background p-4 flex flex-col justify-center text-white text-center">
        <motion.div className="flex justify-center">
          <p className="flex flex-col gap-1 pointer-events-none select-none text-4xl font-bold">
            Projects
            <motion.span
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="h-1 bg-white rounded-full"
            ></motion.span>
          </p>
        </motion.div>

        <motion.div className="mt-4 container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {projects.map((project, i) => {
            return <ProjectCard key={i} project={project} />;
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
