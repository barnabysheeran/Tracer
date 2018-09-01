import { vec3 } from "gl-matrix";

import AABB from "./AABB";
import Hitable from "./Hitable";

export default class HitableNode extends Hitable {
  constructor(hitables, depth) {
    super();

    //console.log("HitableNode " + depth + ". Populate " + hitables.length);

    this.nodeLeft = null;
    this.nodeRight = null;
    this.hitables = null;

    this.boundingBoxLeft = null;
    this.boundingBoxRight = null;

    const ITEM_TOTAL = hitables.length;

    if (ITEM_TOTAL <= 1) {
      console.log(
        "HitableNode " + depth + " - Small group size " + hitables.length
      );
      this.hitables = hitables;
      return;
    }

    // TODO Find best split, remove random seed
    Math.seedrandom("random");

    // Pick random axis
    const AXIS_ID = Math.floor(Math.random() * 3);

    // Find center on axis
    let positionOnAxis;
    let axisMin = Infinity;
    let axisMax = -Infinity;

    let i;

    for (i = 0; i < ITEM_TOTAL; i++) {
      positionOnAxis = hitables[i].getPositionCenter()[AXIS_ID];

      if (positionOnAxis < axisMin) {
        axisMin = positionOnAxis;
      }
      if (positionOnAxis > axisMax) {
        axisMax = positionOnAxis;
      }
    }

    let axisRange = axisMax - axisMin;

    if (axisRange == 0) {
      console.log(
        "HitableNode " + depth + " - no range on axis " + hitables.length
      );
      this.hitables = hitables;
      return;
    }

    // Create left/right
    const AXIS_CENTER = axisMin + (axisMax - axisMin) * 0.5;

    let hitablesLeft = [];
    let hitablesRight = [];

    for (i = 0; i < ITEM_TOTAL; i++) {
      positionOnAxis = hitables[i].getPositionCenter()[AXIS_ID];

      if (positionOnAxis < AXIS_CENTER) {
        hitablesLeft.push(hitables[i]);
      } else {
        hitablesRight.push(hitables[i]);
      }
    }

    // Nodes
    this.nodeLeft = new HitableNode(hitablesLeft, depth + 1);
    this.nodeRight = new HitableNode(hitablesRight, depth + 1);
  }

  didHit() {
    // TODO
  }

  createBoundingBox() {
    const NODE_LEFT = this.nodeLeft;
    const NODE_RIGHT = this.nodeRight;
    const HITABLES = this.hitables;

    // Left/Right
    if (NODE_LEFT != null) {
      NODE_LEFT.createBoundingBox();
    }

    if (NODE_RIGHT != null) {
      NODE_RIGHT.createBoundingBox();
    }

    // Hitables
    if (HITABLES == null) {
      return;
    }

    let min = vec3.create(Infinity, Infinity, Infinity);
    let max = vec3.create(-Infinity, -Infinity, -Infinity);

    let bb;
    let i;

    for (i = 0; i < HITABLES.length; i++) {
      bb = HITABLES[i].boundingBox;

      // Min XYZ
      if (bb.MIN[0] < min[0]) {
        min[0] = bb.MIN[0];
      }

      if (bb.MIN[1] < min[1]) {
        min[1] = bb.MIN[1];
      }

      if (bb.MIN[2] < min[2]) {
        min[2] = bb.MIN[2];
      }

      // Max XYZ
      if (bb.MAX[0] < max[0]) {
        max[0] = bb.MAX[0];
      }

      if (bb.MAX[1] < max[1]) {
        max[1] = bb.MAX[1];
      }

      if (bb.MAX[2] < max[2]) {
        max[2] = bb.MAX[2];
      }
    }

    this.boundingBox = new AABB(min, max);
  }
}
