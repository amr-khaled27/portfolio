"use client";
import { useEffect, useRef } from "react";
import Matter, {
  Bodies,
  Common,
  Engine,
  Render,
  Runner,
  World,
} from "matter-js";
import "matter-wrap";

interface TechStackProps {
  numberOfPolygons?: number;
  options: {
    wrap: boolean;
    walled: boolean;
  };
  technology?: {
    type?: string;
    width: number;
    height: number;
    radius: number;
    pngLocation: string;
  }[];
  style?: string;
}

const TechStack = ({
  numberOfPolygons = 0,
  options: { wrap, walled },
  technology,
  style,
}: TechStackProps) => {
  const tickness: number = 400;
  const scene = useRef<HTMLDivElement>(null);

  Matter.use("matter-wrap");

  useEffect(() => {
    const memory = navigator.deviceMemory || 4;
    console.log(`Device Memory: ${memory} GB`);
    const lowEndDevice = memory < 4;

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

    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const tickness = 400;
    const createWall = (x: number, y: number, width: number, height: number) =>
      Bodies.rectangle(x, y, width, height, { isStatic: true });

    const ground = createWall(
      render.options.width / 2,
      render.options.height + tickness / 2,
      10000,
      tickness
    );
    const ceiling = createWall(
      render.options.width / 2,
      -tickness / 2,
      10000,
      tickness
    );
    const leftWall = createWall(
      -tickness / 2,
      render.options.height / 2,
      tickness,
      render.options.height
    );
    const rightWall = createWall(
      render.options.width + tickness / 2,
      render.options.height / 2,
      tickness,
      render.options.height
    );

    if (walled) {
      World.add(engine.world, [ground, ceiling, leftWall, rightWall]);
    }

    const boxes: Matter.Body[] = [];
    const polygons: Matter.Body[] = [];

    if (!lowEndDevice && technology) {
      technology.forEach((tech) => {
        let shape: Matter.Body;

        if (tech.type === "hex") {
          shape = Bodies.polygon(
            Math.random() * render.options.width,
            Math.random() * render.options.height,
            6,
            tech.width,
            {
              angle: (Math.random() - 0.5) * (Math.PI / 8),
              plugin: wrap
                ? {
                    wrap: {
                      min: { x: 0, y: 0 },
                      max: {
                        x: render.options.width,
                        y: render.options.height,
                      },
                    },
                  }
                : "",
              frictionAir: 0,
              render: {
                sprite: {
                  texture: tech.pngLocation,
                  xScale: 1,
                  yScale: 1,
                },
              },
            }
          );
        } else {
          shape = Bodies.rectangle(
            Math.random() * render.options.width,
            Math.random() * render.options.height,
            tech.width,
            tech.height,
            {
              angle: (Math.random() - 0.5) * (Math.PI / 8),
              chamfer: { radius: tech.radius },
              plugin: wrap
                ? {
                    wrap: {
                      min: { x: 0, y: 0 },
                      max: {
                        x: render.options.width,
                        y: render.options.height,
                      },
                    },
                  }
                : "",
              frictionAir: 0,
              render: {
                sprite: {
                  texture: tech.pngLocation,
                  xScale: 1,
                  yScale: 1,
                },
              },
            }
          );
        }

        Matter.Body.applyForce(shape, shape.position, {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
        });

        boxes.push(shape);
        World.add(engine.world, shape);
      });
    }

    const polyCount = lowEndDevice ? 5 : numberOfPolygons;

    for (let i = 0; i < polyCount; i++) {
      const poly = Bodies.polygon(
        Common.random(0, render.options.width),
        Common.random(0, render.options.height),
        Common.random(3, 5),
        Common.random(5, 20),
        {
          force: {
            x: (Math.random() - 0.5) * 0.001,
            y: (Math.random() - 0.5) * 0.001,
          },
          render: {
            fillStyle: Common.choose([
              "#858AE3",
              "#FF6F61",
              "#6B4226",
              "#F7CAC9",
              "#92A8D1",
              "#034F84",
              "#F7786B",
              "#DE5D83",
              "#C94C4C",
              "#FFA07A",
              "#D33F49",
            ]),
          },
          friction: 0,
          frictionAir: 0,
          plugin: wrap
            ? {
                wrap: {
                  min: { x: 0, y: 0 },
                  max: { x: render.options.width, y: render.options.height },
                },
              }
            : "",
        }
      );
      polygons.push(poly);
      World.add(engine.world, poly);
    }

    const runner = Runner.create();
    let lastTime = 0;
    const targetFPS = 90;
    const interval = 1000 / targetFPS;

    const animate = (time: number) => {
      const delta = time - lastTime;
      if (delta >= interval) {
        Render.world(render);
        lastTime = time;
      }
      requestAnimationFrame(animate);
    };
    Runner.run(runner, engine);
    requestAnimationFrame(animate);

    const handleResize = () => {
      render.canvas.width = scene.current!.clientWidth;
      render.canvas.height = scene.current!.clientHeight;

      Matter.Body.setPosition(ground, {
        x: render.canvas.width / 2,
        y: render.canvas.height + tickness / 2,
      });

      Matter.Body.setPosition(rightWall, {
        x: render.canvas.width + tickness / 2,
        y: render.canvas.height / 2,
      });

      Matter.Body.setPosition(ceiling, {
        x: render.canvas.width / 2,
        y: -tickness / 2,
      });

      boxes.concat(polygons).forEach((body) => {
        Matter.Body.set(body, {
          plugin: wrap
            ? {
                wrap: {
                  min: { x: 0, y: 0 },
                  max: {
                    x: render.canvas.width,
                    y: render.canvas.height,
                  },
                },
              }
            : "",
        });
      });
    };

    window.addEventListener("resize", handleResize);

    if (!lowEndDevice) {
      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      World.add(engine.world, mouseConstraint);
    }

    // Pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          Runner.stop(runner);
        } else {
          Runner.run(runner, engine);
        }
      },
      { threshold: 0.1 }
    );
    if (scene.current) observer.observe(scene.current);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener("resize", handleResize);
      if (scene.current) observer.unobserve(scene.current);
    };
  }, [numberOfPolygons, technology, walled, wrap]);

  return (
    <div className={`h-screen text-colors-text ${style}`} ref={scene}></div>
  );
};

export default TechStack;
