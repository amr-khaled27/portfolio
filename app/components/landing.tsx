import "../styles/landing.css";
import Tiles from "./tiles";

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

// Old Component

// <div className="bg-[#2b2b2b]">
// <div className="h-screen relative p-4 overflow-hidden container mx-auto flex flex-col justify-center gap-4">
//   <div className="text text-white flex flex-col *:w-fit">
//     <Reveal>
//       <p className="text-2xl">Hey There! 👋</p>
//     </Reveal>
//     <Reveal>
//       <div className="flex gap-2 items-end mb-4">
//         <span className="text-2xl">I&apos;m</span>
//         <h1 className="text-4xl font-bold">Amr Khaled.</h1>
//       </div>
//     </Reveal>
//     <Reveal>
//       <p className="text-sm mb-2">
//         A fullstack developer proficient in modern web technologies.
//       </p>
//     </Reveal>
//     <Reveal>
//       <p className="text-sm mb-2">
//         Let&apos;s build something amazing together!
//       </p>
//     </Reveal>
//   </div>
// </div>
// </div>
