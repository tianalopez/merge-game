import Matter from "matter-js";

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

export function createEngine() {
  const engine = Engine.create();
  const world = engine.world;
  return { engine, world };
}

export function createRenderer(engine, containerId = "play-box") {
  const render = Render.create({
    element: document.getElementById(containerId),
    engine,
    options: {
      width: 400,
      height: 650,
      wireframes: false,
      background: "transparent",
      id: 'matter-canvas'
    }
  });
  return render;
}

// helper to create walls
export function createWalls(world) {
  const width = 400;
  const height = 650;
  const thickness = 20;

  const floor = Bodies.rectangle(
    width / 2,
    height + thickness / 2,
    width,
    thickness,
    { isStatic: true }
  );

  const leftWall = Bodies.rectangle(
    -thickness / 2,
    height / 2,
    thickness,
    height,
    { isStatic: true }
  );

  const rightWall = Bodies.rectangle(
    width + thickness / 2,
    height / 2,
    thickness,
    height,
    { isStatic: true }
  );

  Composite.add(world, [floor, leftWall, rightWall]);
}
