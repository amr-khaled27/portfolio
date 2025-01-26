"use client";
import Image from "next/image";
import { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ParallaxSection from "./parallaxSection";
import TechStack from "./techstack";
import AnimateScroll from "../mini/animatescroll";

type Technology = {
  width: number;
  height: number;
  radius: number;
  pngLocation: string;
};

const technologies: Technology[] = [
  {
    width: 300,
    height: 60,
    radius: 30,
    pngLocation: "html.png",
  },
  {
    width: 150,
    height: 150,
    radius: 30,
    pngLocation: "css.png",
  },
  {
    width: 150,
    height: 150,
    radius: 30,
    pngLocation: "js.png",
  },
  {
    width: 160,
    height: 160,
    radius: 80,
    pngLocation: "react.png",
  },
  {
    width: 150,
    height: 150,
    radius: 0,
    pngLocation: "ts.png",
  },
  {
    width: 300,
    height: 60,
    radius: 30,
    pngLocation: "tailwind.png",
  },
  {
    width: 275,
    height: 75,
    radius: 10,
    pngLocation: "nextjs.png",
  },
];

const About = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const { scrollYProgress: scrollYProgressContainer } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const rounded = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const pos = useTransform(scrollYProgressContainer, [0, 1], [100, -100]);

  return (
    <>
      <div
        ref={container}
        className="bg-colors-background relative h-[300vh] flex justify-center"
      >
        <motion.div
          ref={ref}
          style={{
            scale,
            borderRadius: rounded,
          }}
          className="w-full h-screen sticky top-0 shadow-xl flex justify-center items-center overflow-hidden"
        >
          <motion.div className="absolute w-full h-full">
            <motion.div
              style={{
                y: pos,
              }}
              className="w-full h-full top-0 absolute"
            >
              <Image
                src="/about.jpg"
                alt="Picture of a developer"
                layout="fill"
                objectFit="cover"
                className="w-full h-full scale-[1.35]"
              />
            </motion.div>
          </motion.div>
          <OverlayCopy
            progress={scrollYProgressContainer}
            text="I love transforming concepts into functional designs. Beyond the technical, I'm drawn to the storytelling potential. For me, creating websites is not just a profession."
          />
          <motion.div
            style={{ opacity }}
            className="absolute w-full h-full bg-black/75 z-0 left-0 top-0"
          />
        </motion.div>
      </div>

      <ParallaxSection />

      <div className="bg-colors-background">
        <AnimateScroll>
          <div className="relative w-screen h-screen">
            <h3 className="text-4xl text-colors-text p-4 flex flex-col z-30 bg-black/50 backdrop-blur-sm w-screen font-bold text-center absolute left-1/2 -translate-x-1/2 pointer-events-none">
              My Tech Stack
              <span className="text-lg font-normal hidden sm:inline">
                Feel free to play around with them!
              </span>
            </h3>
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

            <div className="absolute left-0 top-0 w-screen pointer-events-none sm:pointer-events-auto bg-[#1E1E1E]">
              <TechStack
                numberOfPolygons={50}
                options={{ wrap: true, walled: false }}
              />
            </div>
            <div className="absolute left-0 top-0 w-screen pointer-events-none sm:pointer-events-auto h-screen z-20">
              <TechStack
                numberOfPolygons={0}
                options={{ wrap: false, walled: true }}
                technology={technologies}
              />
            </div>
          </div>
        </AnimateScroll>
      </div>
    </>
  );
};

type OverlayCopyProps = {
  text: string;
  progress: MotionValue<number>;
};

const OverlayCopy = ({ text, progress }: OverlayCopyProps) => {
  const scrollY = useTransform(progress, [0, 1], [150, -150]);

  const words = text.split(" ");

  return (
    <motion.div
      style={{ y: scrollY }}
      className="z-30 p-4 h-screen flex items-center text-colors-text"
    >
      <p className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={progress}>
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
    <span className="mr-2 mt-2 2xl:mr-6 2xl:mt-3 relative font-bold text-4xl sm:text-5xl 2xl:text-7xl">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="">
        {children}
      </motion.span>
    </span>
  );
};

export default About;
