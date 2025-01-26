import "../../styles/landing.css";
import { motion } from "motion/react";
import Tiles from "./tiles";

const Landing = () => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
    >
      <Tiles />
      <div
        id="title"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-colors-text text-5xl pointer-events-none overflow-hidden"
      >
        Hey There 👋, I&apos;m <h1 className="font-bold">Amr Khaled</h1>
      </div>
      <h2
        id="subtitle"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-colors-text text-3xl font-semibold"
      >
        A fullstack developer proficient in <span>modern web technologies</span>
        .
      </h2>
    </motion.div>
  );
};

export default Landing;
