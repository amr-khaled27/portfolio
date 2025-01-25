"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  style?: string;
}

const Reveal = ({ children, style = "" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
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
        className="absolute top-[4px] bottom-[4px] left-0 right-0 z-20 bg-[#66b6f3]"
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
      />
    </div>
  );
};

export default Reveal;
