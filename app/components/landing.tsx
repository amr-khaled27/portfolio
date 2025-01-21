import "../styles/landing.css";
import Tiles from "./mini/tiles";

const Landing = () => {
  return (
    <div>
      <Tiles />
      <div
        id="title"
        className="centered z-10 text-white text-6xl pointer-events-none"
      >
        Hey There 👋, <h1>I&apos;m Amr Khaled</h1>
      </div>
      <h2 id="subtitle" className="centered">
        A fullstack developer proficient in modern web technologies.
      </h2>
    </div>
  );
};

export default Landing;
