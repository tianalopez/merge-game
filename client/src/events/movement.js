import { spawnRandomCircle } from "../circles";
import Matter from "matter-js";

let currentCircle = null;  // only one active circle at a time
let worldRef = null;

export function setCurrentCircle(circle, world) {
  currentCircle = circle;
  worldRef = world;
}

export function enableCircleMovement(containerId = "game-container") {
  const gameContainer = document.getElementById(containerId);
  let newX;

  // mouse movement
  gameContainer.addEventListener("mousemove", (e) => {
    if (!currentCircle) return;

    const radius = currentCircle.circleRadius;
    const leftEdge = 0;
    const rightEdge = 400;

    let newX = e.layerX;
    newX = Math.max(leftEdge + radius, newX);
    newX = Math.min(rightEdge - radius, newX);

    Matter.Body.setPosition(currentCircle, { x: newX, y: 30 });
  });

  // click to drop
  gameContainer.addEventListener("click", () => {
    if (!currentCircle) return;

    currentCircle.isStatic = false; // drop the circle
    currentCircle = null;

    // spawn next circle
    const newCircle = spawnRandomCircle(worldRef, newX);
    setCurrentCircle(newCircle, worldRef);
  });
}
