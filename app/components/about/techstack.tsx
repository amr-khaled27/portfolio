"use client";
import React, { useEffect, useRef } from "react";
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

const lowEndDevice = (() => {
  if (typeof window === "undefined") return false;
  return (
    navigator.hardwareConcurrency <= 2 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
})();

const TechStack = React.memo<TechStackProps>(
  ({ numberOfPolygons = 0, options: { wrap, walled }, technology, style }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    const scene = useRef<HTMLDivElement>(null);

    Matter.use("matter-wrap");

    useEffect(() => {
      if (!scene.current) return;

      const engine = Engine.create();
      const render = Render.create({
        element: scene.current,
        engine: engine,
        options: {
          width: scene.current.clientWidth,
          height: scene.current.clientHeight,
          background: "transparent",
          wireframes: false,
          showDebug: false,
          showVelocity: false,
          showAngleIndicator: false,
        },
      });

      // Optimize engine settings for performance
      engine.world.gravity.y = 0;
      engine.world.gravity.x = 0;
      engine.constraintIterations = lowEndDevice ? 1 : 2;
      engine.velocityIterations = lowEndDevice ? 3 : 6;
      engine.positionIterations = lowEndDevice ? 3 : 6;

      // Type-safe dimensions
      const width = render.options.width || scene.current.clientWidth;
      const height = render.options.height || scene.current.clientHeight;

      const tickness = 400;
      const createWall = (
        x: number,
        y: number,
        width: number,
        height: number
      ) => Bodies.rectangle(x, y, width, height, { isStatic: true });

      const ground = createWall(
        width / 2,
        height + tickness / 2,
        10000,
        tickness
      );
      const ceiling = createWall(width / 2, -tickness / 2, 10000, tickness);
      const leftWall = createWall(-tickness / 2, height / 2, tickness, height);
      const rightWall = createWall(
        width + tickness / 2,
        height / 2,
        tickness,
        height
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
              Math.random() * width,
              Math.random() * height,
              6,
              tech.width,
              {
                angle: (Math.random() - 0.5) * (Math.PI / 8),
                plugin: wrap
                  ? {
                      wrap: {
                        min: { x: 0, y: 0 },
                        max: {
                          x: width,
                          y: height,
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
              Math.random() * width,
              Math.random() * height,
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
                          x: width,
                          y: height,
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
          Common.random(0, width),
          Common.random(0, height),
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
                    max: { x: width, y: height },
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

      return () => {
        console.log("⚡ TechStack cleanup started");
        Render.stop(render);
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
        render.canvas.remove();
        render.textures = {};
        window.removeEventListener("resize", handleResize);
        console.log("⚡ TechStack cleanup completed");
      };
    }, [numberOfPolygons, technology, walled, wrap]);

    return (
      <div className={`h-screen text-colors-text ${style}`} ref={scene}></div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.numberOfPolygons === nextProps.numberOfPolygons &&
      prevProps.options.wrap === nextProps.options.wrap &&
      prevProps.options.walled === nextProps.options.walled &&
      prevProps.technology === nextProps.technology &&
      prevProps.style === nextProps.style
    );
  }
);

TechStack.displayName = "TechStack";

export default TechStack;
