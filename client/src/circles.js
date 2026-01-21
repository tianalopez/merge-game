import Matter from "matter-js";
import { LEVELS, getRandomLevel } from "./config/levels.js";

const { Bodies, Composite } = Matter;

export function createCircle(x, y, level) {
  const config = LEVELS[level];

  const body = Bodies.circle(x, y, config.radius, {
    restitution: 0.8,
    friction: 0.3,
    density: 0.001
  });

  body.level = level;

  return body;
}

export function spawnRandomCircle(world, xCoordinate=200) {

  const randomCircle = createCircle(xCoordinate, 30, getRandomLevel())
  randomCircle.isStatic = true;
  console.log("SPAWN", {
    x: xCoordinate,
    id: randomCircle.id
  });
  Composite.add(world, randomCircle)
  return randomCircle
}
