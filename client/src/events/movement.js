import { spawnRandomCircle } from "../circles";
import Matter from "matter-js";

let currentCircle = null;  // only one active circle at a time
let worldRef = null;
let lastMouseX = 200;

export function setCurrentCircle(circle, world) {
  currentCircle = circle;
  worldRef = world;
}

export function enableCircleMovement(containerId = "game-container") {
  const gameContainer = document.getElementById(containerId);

  // mouse movement
  gameContainer.addEventListener("mousemove", (e) => {
    if (!currentCircle) return;

    const radius = currentCircle.circleRadius;
    const leftEdge = 0;
    const rightEdge = 400;

    lastMouseX = e.layerX;
    lastMouseX = Math.max(leftEdge + radius, lastMouseX);
    lastMouseX = Math.min(rightEdge - radius, lastMouseX);

    Matter.Body.setPosition(currentCircle, { x: lastMouseX, y: 0 });
  });

  // click to drop
  gameContainer.addEventListener("click", () => {
    console.log("CLICK", performance.now());

    if (!currentCircle) return;

    currentCircle.isStatic = false; // drop the circle
    Matter.Body.setVelocity(currentCircle, { x: 0, y: 0 });
    currentCircle = null;

    // spawn next circle
    const newCircle = spawnRandomCircle(worldRef, lastMouseX);
    setCurrentCircle(newCircle, worldRef);
  });
}
