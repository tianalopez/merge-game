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

export function createRenderer(engine, containerId = "game-container") {
  const render = Render.create({
    element: document.getElementById(containerId),
    engine,
    options: {
      width: 400,
      height: 600,
      wireframes: false,
      background: "transparent"
    }
  });
  return render;
}

// helper to create walls
export function createWalls(world) {
  const floor = Bodies.rectangle(200, 600, 400, 20, { isStatic: true });
  const leftWall = Bodies.rectangle(0, 300, 20, 600, { isStatic: true });
  const rightWall = Bodies.rectangle(400, 300, 20, 600, { isStatic: true });
  const ceiling = Bodies.rectangle(200, 0, 400, 20, { isStatic: true });

  Composite.add(world, [floor, leftWall, rightWall, ceiling]);
}
