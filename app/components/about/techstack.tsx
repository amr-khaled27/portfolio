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
      10000,
      tickness
    );

    const ceiling = createWall(
      scene.current!.clientWidth / 2,
      -tickness / 2,
      10000,
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

    if (walled) {
      World.add(engine.world, [ground, ceiling, leftWall, rightWall]);
    }

    const boxes: Matter.Body[] = [];

    if (technology) {
      technology.forEach((tech) => {
        let shape: Matter.Body;

        if (tech.type === "hex") {
          const sideLength = tech.width;
          shape = Matter.Bodies.polygon(
            Math.random() * scene.current!.clientWidth,
            Math.random() * scene.current!.clientHeight,
            6,
            sideLength,
            {
              angle: (Math.random() - 0.5) * (Math.PI / 8),
              plugin: wrap
                ? {
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
          shape = Matter.Bodies.rectangle(
            Math.random() * scene.current!.clientWidth,
            Math.random() * scene.current!.clientHeight,
            tech.width,
            tech.height,
            {
              angle: (Math.random() - 0.5) * (Math.PI / 8),
              chamfer: { radius: tech.radius },
              plugin: wrap
                ? {
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

    const polygons: Matter.Body[] = [];

    if (numberOfPolygons > 0) {
      for (let i = 0; i < numberOfPolygons; i++) {
        const polygon = Bodies.polygon(
          Common.random(0, render.options.width),
          Common.random(0, render.options.height),
          Common.random(1, 5),
          Common.random() > 0.9 ? Common.random(15, 25) : Common.random(5, 10),

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
                    min: {
                      x: 0,
                      y: 0,
                    },
                    max: {
                      x: scene.current!.clientWidth,
                      y: scene.current!.clientHeight,
                    },
                  },
                }
              : "",
          }
        );

        polygons.push(polygon);
        World.add(engine.world, polygon);
      }
    }

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

      polygons.forEach((polygon) => {
        Matter.Body.set(polygon, {
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

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

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
  }, [numberOfPolygons, technology, walled, wrap]);
  return (
    <div className={`h-screen text-colors-text ${style}`} ref={scene}></div>
  );
};

export default TechStack;
