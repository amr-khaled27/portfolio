"use Client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AfterTech = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={container}
      className="h-screen bg-stone-600 p-4 flex justify-center items-center text-white text-center text-3xl"
    >
      <p className="flex flex-col gap-1">
        Check out my projects below to see my skills in action
        <motion.span
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          style={{ width }}
          className="h-1 bg-white rounded-full"
        ></motion.span>
      </p>
    </motion.div>
  );
};

export default AfterTech;
