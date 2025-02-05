"use client";
import { useEffect, useRef } from "react";
import "../../styles/landing.css";

const Tiles = () => {
  const parent = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let columns: number = 0;
    let rows: number = 0;

    const createTile = () => {
      const tile = document.createElement("div");

      tile.style.backgroundColor = "#242424";

      return tile;
    };

    const createTiles = (quantity: number) => {
      Array.from(Array(quantity)).forEach(() => {
        wrapper.current?.appendChild(createTile());
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
      <div ref={wrapper} id="tiles" className="tiles gap-[1px]"></div>
    </div>
  );
};

export default Tiles;
