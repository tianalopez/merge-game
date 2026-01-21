import Matter from "matter-js";
import { createEngine, createRenderer, createWalls } from "./physics.js";
import { createCircle, spawnRandomCircle } from "./circles.js";
import { collisionEvent, mergeEvent, lineEvent } from "./events/matterEvents.js";
import { enableCircleMovement, setCurrentCircle } from "./events/movement.js";
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

//add loading line
lineEvent(render)

const pendingMerges = []

const firstCircle = spawnRandomCircle(world);
setCurrentCircle(firstCircle, world)

// move/drop active circle
enableCircleMovement()

// handle collisions of objects
collisionEvent(engine, [pair => mergeHandler(pair, pendingMerges)])

mergeEvent(engine, world, pendingMerges)

// spawn a test circle
// const testCircle = createCircle(200, 50, 8);
// const testCircle1 = createCircle(200, 500, 8);
// Composite.add(world, [
//   testCircle,
//   testCircle1
// ]);
