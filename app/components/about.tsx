"use client";
import { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ParallaxText from "./mini/velocity";

const About = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  return (
    <>
      <div className="bg-slate-600 relative h-[600vh] p-4 flex justify-center">
        <motion.div
          ref={ref}
          style={{
            backgroundImage: "url(/about.jpg)",
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundPosition: "center",
            scale,
          }}
          className="container sticky top-4 h-[calc(100vh_-_25px)] shadow-xl flex justify-center items-center overflow-hidden mx-auto rounded-xl"
        >
          <OverlayCopy
            parent={ref}
            text="For me, creating websites is not just a profession."
          />
          <motion.div
            style={{ opacity }}
            className="absolute w-full h-full bg-black/50 z-0 left-0 top-0"
          />
        </motion.div>
      </div>
      <div className="h-screen bg-slate-600 w-full flex justify-center items-center">
        <div className="flex flex-col gap-12 w-full">
          <ParallaxText baseVelocity={-5}>It&apos;s Passion</ParallaxText>
          <ParallaxText baseVelocity={5}>It&apos;s Art </ParallaxText>
        </div>
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
    offset: ["start start", "end 200vh"],
  });

  const words = text.split(" ");

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ opacity }}
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
    <span className="mr-2 mt-2 relative">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="">
        {children}
      </motion.span>
    </span>
  );
};

export default About;
