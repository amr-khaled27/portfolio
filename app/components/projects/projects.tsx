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
  type: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [type, setType] = useState("all");

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
        <motion.div className="flex flex-col justify-center">
          <p className="flex flex-col gap-1 pointer-events-none select-none text-4xl font-bold">
            Projects
          </p>

          <div>
            <motion.div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
              <motion.button
                className={`${
                  type === "all" ? "bg-colors-primary" : "bg-[#3f3f3f]"
                } px-3 py-1 rounded-lg`}
                onClick={() => setType("all")}
              >
                All
              </motion.button>
              <motion.button
                className={`${
                  type === "web" ? "bg-colors-primary" : "bg-[#3f3f3f]"
                } px-3 py-1 rounded-lg`}
                onClick={() => setType("web")}
              >
                Web Development
              </motion.button>
              <motion.button
                className={`${
                  type === "tools" ? "bg-colors-primary" : "bg-[#3f3f3f]"
                } px-3 py-1 rounded-lg`}
                onClick={() => setType("tools")}
              >
                Tools
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mt-4 container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {projects.map((project, i) => {
            if (type === "all") {
              return <ProjectCard key={i} project={project} />;
            } else if (project.type === type) {
              return <ProjectCard key={i} project={project} />;
            }
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
