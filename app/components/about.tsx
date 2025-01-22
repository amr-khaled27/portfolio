"use client";
import Image from "next/image";
import { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ParallaxText from "./mini/velocity";
import TechStack from "./mini/techstack";

const About = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const { scrollYProgress: scrollYProgressContainer } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const rounded = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const pos = useTransform(scrollYProgressContainer, [0, 1], [100, -100]);

  return (
    <>
      <div
        ref={container}
        className="bg-slate-600 relative h-[600vh] flex justify-center"
      >
        <motion.div
          ref={ref}
          style={{
            scale,
            borderRadius: rounded,
          }}
          className="w-full h-screen sticky top-0 shadow-xl flex justify-center items-center overflow-hidden"
        >
          <motion.div className="bg-red-600 absolute w-full h-full">
            <motion.div
              style={{
                y: pos,
              }}
              className="w-full h-full top-0 absolute"
            >
              <Image
                src="/about.jpg"
                alt="Descriptive Alt Text"
                layout="fill"
                objectFit="cover"
                className="w-full h-full scale-[1.35]"
              />
            </motion.div>
          </motion.div>
          <OverlayCopy
            parent={ref}
            text="I love transforming concepts into functional designs. Beyond the technical, I'm drawn to the storytelling potential. For me, creating websites is not just a profession."
          />
          <motion.div
            style={{ opacity }}
            className="absolute w-full h-full bg-black/75 z-0 left-0 top-0"
          />
        </motion.div>
      </div>

      <div className="h-screen bg-slate-600 w-full flex justify-center items-center">
        <div className="flex flex-col gap-12 w-full">
          <ParallaxText baseVelocity={-5}>It&apos;s Passion</ParallaxText>
          <ParallaxText baseVelocity={5}>It&apos;s Art </ParallaxText>
        </div>
      </div>

      <div className="relative">
        <h3 className="text-3xl text-white font-bold text-center absolute left-1/2 -translate-x-1/2 top-4">
          My Tech Stack
        </h3>
        <TechStack />
      </div>
    </>
  );
};

type OverlayCopyProps = {
  parent: React.RefObject<HTMLDivElement | null>;
  text: string;
};

const OverlayCopy = ({ parent, text }: OverlayCopyProps) => {
  const { scrollYProgress } = useScroll({
    target: parent,
    offset: ["start start", "end 300vh"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const words = text.split(" ");
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  scrollYProgress.onChange((latest) => {
    console.log("scrollYProgress:", latest);
  });

  return (
    <motion.div
      style={{ opacity, y: scrollY }}
      className="z-30 p-4 h-screen flex items-center
     text-white text-3xl"
    >
      <p className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </p>
    </motion.div>
  );
};
type WordProps = {
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
};

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="mr-2 mt-2 relative text-4xl font-bold">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="">
        {children}
      </motion.span>
    </span>
  );
};

export default About;
