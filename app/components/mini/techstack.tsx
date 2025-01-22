"use client";
import { useEffect, useRef } from "react";
import Matter, { Engine, Render, Runner, World } from "matter-js";
import "matter-wrap";

const TechStack = () => {
  const tickness: number = 200;
  const scene = useRef<HTMLDivElement>(null);

  Matter.use("matter-wrap");

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

    // const leftWall = createWall(
    //   -tickness / 2,
    //   scene.current!.clientHeight / 2,
    //   tickness,
    //   scene.current!.clientHeight
    // );

    const rightWall = createWall(
      scene.current!.clientWidth + tickness / 2,
      scene.current!.clientHeight / 2,
      tickness,
      scene.current!.clientHeight
    );

    const boxes: Matter.Body[] = [];

    for (let i = 0; i < 5; i++) {
      const box = Matter.Bodies.rectangle(
        Math.random() * scene.current!.clientWidth,
        Math.random() * scene.current!.clientHeight,
        300,
        60,
        {
          angle: Math.random() * Math.PI * 2,
          frictionAir: 0.05,
          chamfer: { radius: 30 },
          plugin: {
            wrap: {
              min: {
                x: 0,
                y: 0,
              },
              max: {
                x: scene.current!.clientWidth,
                y: scene.current!.clientHeight,
              },
            },
          },
          render: {
            fillStyle: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            sprite: {
              texture: "html.png",
              xScale: 1,
              yScale: 1,
            },
          },
        }
      );

      boxes.push(box);

      console.log(boxes);

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

      boxes.forEach((box) => {
        Matter.Body.set(box, {
          plugin: {
            wrap: {
              min: {
                x: 0,
                y: 0,
              },
              max: {
                x: scene.current!.clientWidth,
                y: scene.current!.clientHeight,
              },
            },
          },
        });
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
