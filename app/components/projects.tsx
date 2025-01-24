"use Client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Projects = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const title = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: title,
    offset: ["start end", "end end"],
  });

  const { scrollYProgress: scrollYProgessContainer } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scrollX = useTransform(scrollYProgessContainer, [0, 1], ["0%", "-90%"]);

  return (
    <motion.div ref={container} className="h-[5000vh]">
      <motion.div
        ref={title}
        className="bg-stone-600 h-screen p-4 flex flex-col justify-center text-white text-center text-3xl sticky top-0 overflow-hidden"
      >
        <motion.div className="flex justify-center" style={{ y, opacity }}>
          <p className="flex w-fit flex-col gap-1 pointer-events-none select-none text-4xl font-bold">
            Projects
            <motion.span
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              style={{ width }}
              className="h-1 bg-white rounded-full"
            ></motion.span>
          </p>
        </motion.div>

        <motion.div
          style={{ y, opacity, x: scrollX }}
          className="h-[calc(100vh_-_80px)] flex w-fit mt-4 mb-4"
        >
          {Array.from({ length: 10 }).map((item, i) => {
            return (
              <div
                className="w-[calc(100vw_-_44px)] mr-4 flex justify-center items-center bg-slate-500 rounded-xl"
                key={i}
              >
                project {i + 1}
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
