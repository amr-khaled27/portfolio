import { motion } from "motion/react";

const Header = () => {
  return (
    <motion.header
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      className={`p-2 flex justify-center fixed top-2 left-1/2 -translate-x-1/2 rounded-full bg-white/30 z-[999] transition-transform duration-300 "translate-y-0""
      }`}
    >
      <nav>
        <ul className="flex gap-2">
          <a
            href="#landing"
            className="py-2 px-3 sm:px-5 rounded-full bg-white hover:scale-95 duration-300 hover:bg-white/75 text-black font-thin"
          >
            Home
          </a>
          <a
            href="#about"
            className="py-2 px-3 sm:px-5 rounded-full bg-white hover:scale-95 duration-300 hover:bg-white/75 text-black font-thin"
          >
            About
          </a>
          <a
            href="#projects"
            className="py-2 px-3 sm:px-5 rounded-full bg-white hover:scale-95 duration-300 hover:bg-white/75 text-black font-thin"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="py-2 px-3 sm:px-5 rounded-full bg-white hover:scale-95 duration-300 hover:bg-white/75 text-black font-thin"
          >
            Contact
          </a>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
