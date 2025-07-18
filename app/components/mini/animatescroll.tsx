"use client";
import { useScroll, useTransform } from "motion/react";
import React, { ReactNode, useRef } from "react";
import { motion } from "framer-motion";

interface AnimateScrollProps {
  children: ReactNode;
}

const AnimateScroll = React.memo<AnimateScrollProps>(
  ({ children }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const rounded = useTransform(scrollYProgress, [0, 1], [0, 25]);

    return (
      <motion.div
        ref={ref}
        style={{
          scale,
          borderRadius: rounded,
        }}
        className="animate-scroll overflow-hidden"
      >
        {children}
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.children === nextProps.children;
  }
);

AnimateScroll.displayName = "AnimateScroll";

export default AnimateScroll;
