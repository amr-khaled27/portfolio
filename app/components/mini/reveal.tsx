"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  style?: string;
}

const Reveal = ({ children, style = "" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      slideControls.start("visible");
    }
  }, [controls, isInView, slideControls]);

  return (
    <div ref={ref} className={`relative w-fit overflow-hidden ${style}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5, delay: 0.33 }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute top-0 bottom-0 left-0 right-0 z-20 bg-[#74baf0] h-full"
        style={{ clipPath: "inset(0 100% 0 0)" }}
        variants={{
          hidden: { clipPath: "inset(0 0 0 0)" },
          visible: { clipPath: "inset(0 0 0 100%)" },
        }}
        initial="hidden"
        animate={slideControls}
        exit={{ display: "none" }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      />
    </div>
  );
};

export default Reveal;
