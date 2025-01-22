"use client";
import { useEffect, useRef } from "react";
import Matter, { Engine, Render, Runner, World } from "matter-js";

const TechStack = () => {
  const tickness: number = 200;
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      element: scene.current!,
      engine: engine,
      options: {
        width: scene.current!.clientWidth,
        height: scene.current!.clientHeight,
        background: "transparent",
        wireframes: false,
      },
    });

    const createWall = (
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      return Matter.Bodies.rectangle(x, y, width, height, { isStatic: true });
    };

    const ground = createWall(
      scene.current!.clientWidth / 2,
      scene.current!.clientHeight + tickness / 2,
      scene.current!.clientWidth,
      tickness
    );

    const ceiling = createWall(
      scene.current!.clientWidth / 2,
      -tickness / 2,
      scene.current!.clientWidth,
      tickness
    );

    const leftWall = createWall(
      -tickness / 2,
      scene.current!.clientHeight / 2,
      tickness,
      scene.current!.clientHeight
    );

    const rightWall = createWall(
      scene.current!.clientWidth + tickness / 2,
      scene.current!.clientHeight / 2,
      tickness,
      scene.current!.clientHeight
    );

    World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    for (let i = 0; i < 5; i++) {
      const box = Matter.Bodies.rectangle(200, (i + 2) * 60, 300, 60, {
        chamfer: { radius: 30 },
        render: {
          fillStyle: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          sprite: {
            texture: "html.png",
            xScale: 1,
            yScale: 1,
          },
        },
      });
      World.add(engine.world, box);
    }

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const handleResize = () => {
      if (!scene.current) return;
      render.canvas.width = scene.current.clientWidth;
      render.canvas.height = scene.current.clientHeight;

      Matter.Body.setPosition(ground, {
        x: scene.current.clientWidth / 2,
        y: scene.current.clientHeight + tickness / 2,
      });

      Matter.Body.setPosition(rightWall, {
        x: scene.current.clientWidth + tickness / 2,
        y: scene.current.clientHeight / 2,
      });

      Matter.Body.setPosition(ceiling, {
        x: scene.current.clientWidth / 2,
        y: -tickness / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(engine.world, mouseConstraint);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="h-screen overflow-hidden bg-[#1E1E1E]" ref={scene}></div>
  );
};

export default TechStack;
