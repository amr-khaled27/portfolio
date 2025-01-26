"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ParallaxText from "./velocity";

const ParallaxSection = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end 50vh"],
  });
  const widthBottom = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={container}
      className="h-screen bg-colors-background w-full flex justify-center items-center"
    >
      <div className="flex flex-col gap-12 w-full relative">
        <ParallaxText style="z-20" baseVelocity={-5}>
          It&apos;s Passion
        </ParallaxText>
        <ParallaxText style="z-20" baseVelocity={5}>
          It&apos;s Art
        </ParallaxText>
        <motion.span
          style={{ width: widthBottom }}
          className="w-full h-[calc(100%+_36px)] z-10 bg-black/50 absolute left-0 top-1/2 -translate-y-1/2"
        ></motion.span>
      </div>
    </motion.div>
  );
};

export default ParallaxSection;