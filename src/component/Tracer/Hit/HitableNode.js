import { vec3 } from "gl-matrix";

import AABB from "./AABB";
import HitRecord from "./HitRecord";
import Hitable from "./Hitable";

export default class HitableNode extends Hitable {
  constructor(hitables, depth) {
    super();

    //console.log("HitableNode " + depth + ". Populate " + hitables.length);

    // TODO ??
    if (hitables.length == 0) {
      return;
    }

    this.nodeLeft = null;
    this.nodeRight = null;
    this.hitable = null;

    this.boundingBox = null;

    const ITEM_TOTAL = hitables.length;

    if (ITEM_TOTAL == 1) {
      //console.log("HitableNode " + depth + " - Done " + hitables.length);
      this.hitable = hitables[0];
      return;
    }

    // TODO Find best split, remove random seed
    //Math.seedrandom("random");

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

    const AXIS_RANGE = axisMax - axisMin;
    const AXIS_CENTER = axisMin + (axisMax - axisMin) * 0.5;

    // Count
    let countLeft = 0;
    let countRight = 0;

    for (i = 0; i < ITEM_TOTAL; i++) {
      positionOnAxis = hitables[i].getPositionCenter()[AXIS_ID];

      if (positionOnAxis < AXIS_CENTER) {
        countLeft++;
      } else {
        countRight++;
      }
    }

    // Subdivide left/right
    let hitablesLeft = [];
    let hitablesRight = [];

    if (countLeft == 0 || countRight == 0 || AXIS_RANGE == 0) {
      // Subdivide arbitrarily
      hitablesLeft.push(hitables[0]);

      for (i = 1; i < ITEM_TOTAL; i++) {
        hitablesRight.push(hitables[i]);
      }
    } else {
      // Subdivide around axis center

      for (i = 0; i < ITEM_TOTAL; i++) {
        positionOnAxis = hitables[i].getPositionCenter()[AXIS_ID];

        if (positionOnAxis < AXIS_CENTER) {
          hitablesLeft.push(hitables[i]);
        } else {
          hitablesRight.push(hitables[i]);
        }
      }
    }

    // console.log(
    //   "Placing left:" + hitablesLeft.length + " right:" + hitablesRight.length
    // );

    // Create nodes
    this.nodeLeft = new HitableNode(hitablesLeft, depth + 1);
    this.nodeRight = new HitableNode(hitablesRight, depth + 1);
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    const BOUNDINGBOX = this.boundingBox;
    const NODE_LEFT = this.nodeLeft;
    const NODE_RIGHT = this.nodeRight;
    const HITABLE = this.hitable;

    if (BOUNDINGBOX.didHit(ray, tMin, tMax, hitRecord) == true) {
      if (NODE_LEFT != null && NODE_RIGHT != null) {
        let hitRecordLeft = new HitRecord();
        let hitRecordRight = new HitRecord();

        let hitLeft = NODE_LEFT.didHit(ray, tMin, tMax, hitRecordLeft);
        let hitRight = NODE_RIGHT.didHit(ray, tMin, tMax, hitRecordRight);

        if (hitLeft == true && hitRight == true) {
          if (hitRecordLeft.t < hitRecordRight.t) {
            hitRecordLeft.cloneThisInto(hitRecord);
            return true;
          } else {
            hitRecordRight.cloneThisInto(hitRecord);
            return true;
          }
        } else if (hitLeft == true) {
          hitRecordLeft.cloneThisInto(hitRecord);
          return true;
        } else if (hitRight == true) {
          hitRecordRight.cloneThisInto(hitRecord);
          return true;
        } else {
          return false;
        }
      } else if (HITABLE != null) {
        return HITABLE.didHit(ray, tMin, tMax, hitRecord);
      }
    }

    return false;
  }

  createBoundingBox() {
    const NODE_LEFT = this.nodeLeft;
    const NODE_RIGHT = this.nodeRight;
    const HITABLE = this.hitable;

    // Left/Right
    if (NODE_RIGHT != null && NODE_LEFT != null) {
      NODE_LEFT.createBoundingBox();
      NODE_RIGHT.createBoundingBox();

      // This
      let min = vec3.create(Infinity, Infinity, Infinity);
      let max = vec3.create(-Infinity, -Infinity, -Infinity);

      let bbLeft = NODE_LEFT.boundingBox;
      let bbRight = NODE_RIGHT.boundingBox;

      // Min X
      if (bbLeft.MIN[0] < min[0]) {
        min[0] = bbLeft.MIN[0];
      }

      if (bbRight.MIN[0] < min[0]) {
        min[0] = bbRight.MIN[0];
      }

      // Min Y
      if (bbLeft.MIN[1] < min[1]) {
        min[1] = bbLeft.MIN[1];
      }

      if (bbRight.MIN[1] < min[1]) {
        min[1] = bbRight.MIN[1];
      }

      // Min Z
      if (bbLeft.MIN[2] < min[2]) {
        min[2] = bbLeft.MIN[2];
      }

      if (bbRight.MIN[2] < min[2]) {
        min[2] = bbRight.MIN[2];
      }

      // Max X
      if (bbLeft.MAX[0] > max[0]) {
        max[0] = bbLeft.MAX[0];
      }

      if (bbRight.MAX[0] > max[0]) {
        max[0] = bbRight.MAX[0];
      }

      // Max Y
      if (bbLeft.MAX[1] > max[1]) {
        max[1] = bbLeft.MAX[1];
      }

      if (bbRight.MAX[1] > max[1]) {
        max[1] = bbRight.MAX[1];
      }

      // Max Z
      if (bbLeft.MAX[2] > max[2]) {
        max[2] = bbLeft.MAX[2];
      }

      if (bbRight.MAX[2] > max[2]) {
        max[2] = bbRight.MAX[2];
      }

      //
      this.boundingBox = new AABB(min, max);
    } else if (HITABLE != null) {
      this.boundingBox = HITABLE.boundingBox;
    }
  }
}
