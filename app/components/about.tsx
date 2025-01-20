"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const About = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  return (
    <div className="bg-slate-600 relative h-[200vh] p-4 flex justify-center">
      <motion.div
        ref={ref}
        style={{
          backgroundImage: "url(/about.jpg)",
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundPosition: "center",
          scale,
        }}
        className="container sticky top-4 h-screen shadow-xl flex justify-center items-center overflow-hidden mx-auto rounded-xl"
      >
        <OverlayCopy />
        <motion.div
          style={{ opacity }}
          className="absolute w-full h-full bg-black/50 z-0 left-0 top-0"
        />
      </motion.div>
    </div>
  );
};

const OverlayCopy = () => {
  return (
    <motion.div
      className="z-30 h-screen flex items-center
     text-white text-6xl"
    >
      <p>hello world!</p>
    </motion.div>
  );
};

export default About;
