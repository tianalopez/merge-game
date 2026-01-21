import Matter from "matter-js";
import { createCircle } from "../circles";
const { Bodies, Composite } = Matter;

export function collisionEvent(engine, handlers) {
  Matter.Events.on(engine, "collisionStart", event => {
    for (const pair of event.pairs) {
      handlers.forEach(handler => handler(pair))
    }

  })
}

export function mergeEvent(engine, world, pendingMerges) {
  Matter.Events.on(engine, 'afterUpdate', () => {
    for (const pair of pendingMerges) {
      const {bodyA, bodyB} = pair
      // remove old bodies
      Composite.remove(world, bodyA)
      Composite.remove(world, bodyB)

      //compute new position
      const newX = Math.round((bodyA.position.x + bodyB.position.x) / 2)
      const newY = Math.round((bodyA.position.y + bodyB.position.y) / 2)

      //create new circle
      const newLevel = bodyA.level + 1
      const newCircle = createCircle(newX, newY, newLevel)

      Composite.add(world, newCircle)
    }

    //clear pending merges
    pendingMerges.length = 0

  })
}

export function lineEvent(render) {
  Matter.Events.on(render, 'afterRender', () => {
    const ctx = render.context;
    ctx.beginPath();
    ctx.moveTo(0, 90);       // x start, y start
    ctx.lineTo(400, 90);     // x end, y end
    ctx.strokeStyle = "red";
    ctx.setLineDash([5, 5]); // dashed line
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);     // reset
  })
}
