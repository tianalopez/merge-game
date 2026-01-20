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

export function spawnRandomCircle(world) => {
  const randomCircle = createCircle(220, 50, getRandomLevel())
  Composite.add(world, randomCircle)
  return randomCircle
}
