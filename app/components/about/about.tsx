"use client";
import React from "react";
import Image from "next/image";
import { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo } from "react";
import ParallaxSection from "./parallaxSection";
import TechStack from "./techstack";
import AnimateScroll from "../mini/animatescroll";

type Technology = {
  type?: string;
  width: number;
  height: number;
  radius: number;
  pngLocation: string;
};

const technologies: Technology[] = [
  {
    width: 60,
    height: 60,
    radius: 15,
    pngLocation: "html.png",
  },
  {
    width: 60,
    height: 60,
    radius: 15,
    pngLocation: "css.png",
  },
  {
    width: 60,
    height: 60,
    radius: 15,
    pngLocation: "js.png",
  },
  {
    width: 250,
    height: 75,
    radius: 15,
    pngLocation: "react.png",
  },
  {
    width: 90,
    height: 90,
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
    width: 280,
    height: 60,
    radius: 30,
    pngLocation: "nextjs.png",
  },
  {
    width: 200,
    height: 80,
    radius: 15,
    pngLocation: "drizzle.png",
  },
  {
    width: 100,
    height: 100,
    radius: 15,
    pngLocation: "vite.png",
  },
  {
    type: "hex",
    width: 48,
    height: 0,
    radius: 15,
    pngLocation: "node.png",
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

  const isInViewport = useRef(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!isInViewport.current) return;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYProgressContainer]);

  return (
    <>
      <div
        id="about"
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
                fill
                style={{ objectFit: "cover" }}
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
            <h3 className="text-4xl 2xl:text-6xl text-colors-text p-4 flex flex-col z-30 bg-black/50 backdrop-blur-sm w-screen font-bold text-center absolute left-1/2 -translate-x-1/2 pointer-events-none">
              My Tech Stack
              <span className="text-lg xl:text-2xl font-normal hidden sm:inline">
                Feel free To Drag Them Around!
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

const OverlayCopy = React.memo(
  ({ text, progress }: OverlayCopyProps) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    const scrollY = useTransform(progress, [0, 1], [150, -150]);

    const words = useMemo(() => text.split(" "), [text]);

    const wordRanges = useMemo(
      () =>
        words.map((_, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return [start, end] as [number, number];
        }),
      [words]
    );

    return (
      <motion.div
        style={{ y: scrollY }}
        className="z-30 p-4 h-screen flex items-center text-colors-text"
      >
        <p className="flex flex-wrap">
          {words.map((word, i) => (
            <Word key={i} range={wordRanges[i]} progress={progress}>
              {word}
            </Word>
          ))}
        </p>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.text === nextProps.text &&
      prevProps.progress === nextProps.progress
    );
  }
);

OverlayCopy.displayName = "OverlayCopy";

type WordProps = {
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
};

const Word: React.FC<WordProps> = React.memo(
  ({ children, range, progress }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    const opacity = useTransform(progress, range, [0, 1]);
    return (
      <span className="mr-2 mt-2 2xl:mr-6 2xl:mt-3 relative font-bold text-4xl sm:text-5xl 2xl:text-7xl">
        <span className="absolute opacity-20">{children}</span>
        <motion.span style={{ opacity }} className="">
          {children}
        </motion.span>
      </span>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.children === nextProps.children &&
      prevProps.range[0] === nextProps.range[0] &&
      prevProps.range[1] === nextProps.range[1] &&
      prevProps.progress === nextProps.progress
    );
  }
);

Word.displayName = "Word";

export default About;
