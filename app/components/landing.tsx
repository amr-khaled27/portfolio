"use client";
import { useEffect, useRef } from "react";
import "../styles/landing.css";
import anime from "animejs";
// import Reveal from "./reveal";

const Landing = () => {
  const wrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let columns: number = 0;
    let rows: number = 0;
    let toggled: boolean = false;

    const toggle = () => {
      toggled = !toggled;
      document.body.classList.toggle("toggled");
    };

    const handleOnClick = (index: number) => {
      console.log(`clicked: ${index}`);
      toggle();

      anime({
        targets: ".tile",
        opacity: toggled ? 0 : 1,
        delay: anime.stagger(50, {
          grid: [columns, rows],
          from: index,
        }),
      });
    };

    const createTile = (index: number) => {
      const tile = document.createElement("div");

      tile.classList.add("tile");

      tile.style.backgroundColor = "black";

      tile.style.opacity = toggled ? "0" : "1";

      tile.onclick = () => handleOnClick(index);

      return tile;
    };

    const createTiles = (quantity: number) => {
      Array.from(Array(quantity)).map((tile, index) => {
        wrapper.current?.appendChild(createTile(index));
      });
    };

    const createGrid = () => {
      wrapper.current!.innerHTML = "";

      const size: number = document.body.clientWidth > 800 ? 100 : 50;

      columns = Math.floor(document.body.clientWidth / size);
      rows = Math.floor(document.body.clientHeight / size);

      wrapper.current?.style.setProperty("--columns", columns.toString());
      wrapper.current?.style.setProperty("--rows", rows.toString());

      createTiles(columns * rows);
    };

    createGrid();

    window.onresize = () => createGrid();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div ref={wrapper} id="tiles" className="tiles gap-[1px]"></div>
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
