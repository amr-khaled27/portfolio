import "../../styles/landing.css";
import { motion } from "motion/react";
import Tiles from "./tiles";
import { Pattaya } from "next/font/google";

const pattaya = Pattaya({
  weight: "400",
  subsets: ["latin"],
});

const Landing = () => {
  return (
    <motion.div
      id="landing"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
    >
      <Tiles />
      <h1
        id="title"
        className="absolute left-4 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 z-10 text-4xl sm:text-6 xl md:text-7xl 2xl:text-9xl text-balance"
      >
        Hey There 👋, I&apos;m{" "}
        <span
          className={`${pattaya.className} font-bold text-5xl sm:text-7 xl md:text-8xl 2xl:text-[138px] animated-text bg-gradient-to-r from-[#858AE3] to-[#D33F49] bg-clip-text text-transparent`}
        >
          Amr Khaled
        </span>
      </h1>
      <h2
        id="subtitle"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-balance text-colors-text text-4xl sm:text-6 xl md:text-6xl 2xl:text-7xl font-thin"
      >
        A fullstack developer proficient in <span>modern web technologies</span>
      </h2>
    </motion.div>
  );
};

export default Landing;
