const Header = () => {
  return (
    <header
      className={`p-2 flex justify-center fixed top-2 left-1/2 -translate-x-1/2 rounded-full bg-white/30 backdrop-blur-lg z-[999] transition-transform duration-300 "translate-y-0""
      }`}
    >
      <nav>
        <ul className="flex gap-2">
          <button className="btn btn-primary">Home</button>
          <button className="btn btn-primary">About</button>
          <button className="btn btn-primary">Projects</button>
          <button className="btn btn-primary">Contact</button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
