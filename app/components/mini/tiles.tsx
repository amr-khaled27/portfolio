"use client";
import { useEffect, useRef } from "react";
import "../../styles/landing.css";
import anime from "animejs";

const Tiles = () => {
  const parent = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let columns: number = 0;
    let rows: number = 0;
    let toggled: boolean = false;

    const toggle = () => {
      toggled = !toggled;
      parent.current?.classList.toggle("toggled");
    };

    const handleOnClick = (index: number) => {
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

      tile.style.backgroundColor = "#121212";

      tile.onmouseover = () => {
        tile.style.backgroundColor = "#323232";
      };

      tile.onmouseout = () => {
        tile.style.backgroundColor = "#121212";
      };

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

      const size: number = (parent.current?.clientWidth || 0) > 800 ? 100 : 75;

      columns = Math.floor((parent.current?.clientWidth || 0) / size);
      rows = Math.floor((parent.current?.clientHeight || 0) / size);

      wrapper.current?.style.setProperty("--columns", columns.toString());
      wrapper.current?.style.setProperty("--rows", rows.toString());

      createTiles(columns * rows);
    };

    createGrid();

    window.onresize = () => createGrid();
  }, []);
  return (
    <div
      ref={parent}
      id="parent"
      className="flex justify-center items-center h-screen"
    >
      <div ref={wrapper} id="tiles" className="tiles gap-[1px] p-[1px]"></div>
    </div>
  );
};

export default Tiles;
