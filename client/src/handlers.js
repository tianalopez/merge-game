import Matter from "matter-js";

export function logHandler(pair) {
  const {bodyA, bodyB} = pair
  if (bodyA.level === bodyB.level) {
    console.log("Merge Candidates:", bodyA, bodyB)
  }
}

export function mergeHandler(pair, pendingMerges) {

  const { bodyA, bodyB } = pair
  if (bodyA.level === bodyB.level && !bodyA.isMerging && !bodyB.isMerging) {
    console.log("REMOVING", bodyA.id, bodyB.id);
    bodyA.isMerging = true;
    bodyB.isMerging = true;

    // push only valid merge pairs
    pendingMerges.push({ bodyA, bodyB });
  }

}
