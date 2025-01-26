import {
  faExternalLink,
  faGlobeAfrica,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import Reveal from "../mini/reveal";
import Image from "next/image";
import { ProjectInterface } from "./projects";

type ProjectCardProps = {
  project: ProjectInterface;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div className="bg-[#303030] shadow-2xl rounded-3xl transition p-4 flex flex-col gap-4">
      <div className="w-full h-full ">
        <div className="rounded-3xl relative shadow-xl">
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
            <div className="flex gap-2 items-center">
              <p className="text-3xl font-semibold">{project.title}</p>
              {project.collaborator && (
                <span className="py-1 px-2 h-fit rounded-md bg-slate-500">
                  collabration
                </span>
              )}
              {project.mainTags &&
                project.mainTags.map((tag, i) => {
                  return (
                    <span
                      className="py-1 px-2 h-fit rounded-md bg-slate-600"
                      key={i}
                    >
                      {tag}
                    </span>
                  );
                })}
            </div>
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
                className="p-4 shadow-xl block mt-1 bg-white font-semibold text-black duration-300 rounded-3xl mb-4 hover:scale-95"
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
                  className="p-4 shadow-xl block mt-1 bg-green-600 font-semibold text-white duration-300 rounded-3xl mb-4 hover:scale-95"
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

export default ProjectCard;
