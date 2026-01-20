import Matter from "matter-js";
import { createEngine, createRenderer, createWalls } from "./physics.js";
import { createCircle } from "./circles.js";
import { collisionEvent, mergeEvent } from "./events.js";
import { logHandler, mergeHandler } from "./handlers.js";

// destructure needed Matter objects
const { Render, Runner, Composite } = Matter;

// create engine + world
const { engine, world } = createEngine();

// create renderer
const render = createRenderer(engine);
Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// create walls
createWalls(world);

const pendingMerges = []

// handle collisions of objects
collisionEvent(engine, [pair => mergeHandler(pair, pendingMerges)])

mergeEvent(engine, world, pendingMerges)

// spawn a test circle
const testCircle = createCircle(220, 50, 8);
const testCircle1 = createCircle(220, 500, 8);
Composite.add(world, [
  testCircle,
  testCircle1
]);
