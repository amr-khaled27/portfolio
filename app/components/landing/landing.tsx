import "../../styles/landing.css";
import Tiles from "./tiles";

const Landing = () => {
  return (
    <div>
      <Tiles />
      <div
        id="title"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white text-5xl pointer-events-none overflow-hidden"
      >
        Hey There 👋, I&apos;m <h1 className="font-bold">Amr Khaled</h1>
      </div>
      <h2
        id="subtitle"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl font-semibold"
      >
        A fullstack developer proficient in <span>modern web technologies</span>
        .
      </h2>
    </div>
  );
};

export default Landing;
