const Header = () => {
  return (
    <header
      className={`p-2 flex justify-center fixed top-2 left-1/2 -translate-x-1/2 rounded-full bg-white/30 backdrop-blur-lg z-[999] transition-transform duration-300 "translate-y-0""
      }`}
    >
      <nav>
        <ul className="flex gap-2">
          <a
            href="#landing"
            className="py-2 px-3 sm:px-5 rounded-full bg-white/50 hover:scale-95 hover:bg-white/75 text-black font-thin"
          >
            Home
          </a>
          <a
            href="#about"
            className="py-2 px-3 sm:px-5 rounded-full bg-white/50 hover:scale-95 hover:bg-white/75 text-black font-thin"
          >
            About
          </a>
          <a
            href="#projects"
            className="py-2 px-3 sm:px-5 rounded-full bg-white/50 hover:scale-95 hover:bg-white/75 text-black font-thin"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="py-2 px-3 sm:px-5 rounded-full bg-white/50 hover:scale-95 hover:bg-white/75 text-black font-thin"
          >
            Contact
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
