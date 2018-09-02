import { vec3 } from "gl-matrix";

import AABB from "./AABB";
import HitRecord from "./HitRecord";
import Hitable from "./Hitable";

export default class HitableNode extends Hitable {
  constructor(hitables, depth) {
    super();

    // Left/Right
    this.nodeLeft = null;
    this.nodeRight = null;

    // BB
    this.boundingBox = null;

    // Sort on random axis
    const AXIS_ID = Math.floor(Math.random() * 3);

    switch (AXIS_ID) {
      case 0:
        hitables.sort(this.compareX);
        break;
      case 1:
        hitables.sort(this.compareY);
        break;
      case 2:
        hitables.sort(this.compareZ);
        break;
    }

    // End nodes ?
    const ITEM_TOTAL = hitables.length;

    if (ITEM_TOTAL == 1) {
      this.nodeLeft = hitables[0];
      this.nodeRight = hitables[0];
      return;
    }

    if (ITEM_TOTAL == 2) {
      this.nodeLeft = hitables[0];
      this.nodeRight = hitables[1];
      return;
    }

    // Split
    let hitablesLeft = [];
    let hitablesRight = [];

    const LIST_CENTER = Math.floor(ITEM_TOTAL / 2);

    let i;

    for (i = 0; i < ITEM_TOTAL; i++) {
      if (i < LIST_CENTER) {
        hitablesLeft.push(hitables[i]);
      } else {
        hitablesRight.push(hitables[i]);
      }
    }

    // Create nodes
    this.nodeLeft = new HitableNode(hitablesLeft, depth + 1);
    this.nodeRight = new HitableNode(hitablesRight, depth + 1);
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    const BOUNDINGBOX = this.boundingBox;
    const NODE_LEFT = this.nodeLeft;
    const NODE_RIGHT = this.nodeRight;

    if (BOUNDINGBOX.didHit(ray, tMin, tMax, hitRecord) == true) {
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
    }

    return false;
  }

  // ________________________________________________________________________ BB

  createBoundingBox() {
    const NODE_LEFT = this.nodeLeft;
    const NODE_RIGHT = this.nodeRight;

    // Left / Right
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
  }

  // ______________________________________________________________________ Sort

  compareX(a, b) {
    const BB_A = a.boundingBox;
    const BB_B = b.boundingBox;

    if (BB_A.MIN[0] - BB_B.MIN[0] < 0.0) {
      return -1;
    } else {
      return 1;
    }
  }

  compareY(a, b) {
    const BB_A = a.boundingBox;
    const BB_B = b.boundingBox;

    if (BB_A.MIN[1] - BB_B.MIN[1] < 0.0) {
      return -1;
    } else {
      return 1;
    }
  }

  compareZ(a, b) {
    const BB_A = a.boundingBox;
    const BB_B = b.boundingBox;

    if (BB_A.MIN[2] - BB_B.MIN[2] < 0.0) {
      return -1;
    } else {
      return 1;
    }
  }
}
