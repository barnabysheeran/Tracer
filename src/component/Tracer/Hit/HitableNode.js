import Statistics from "./../Statistics/Statistics";
import AABB from "./AABB";
import Hitable from "./Hitable";

export default class HitableNode extends Hitable {
  constructor() {
    super();

    this.nodeLeft = undefined;
    this.nodeRight = undefined;
  }

  populate(hitables, depth) {
    console.log("HitableNode " + depth + ". Populate " + hitables.length);

    const ITEM_TOTAL = hitables.length;

    if (ITEM_TOTAL <= 1) {
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
      console.log("- NO range on axis ");
      return;
    }

    const AXIS_CENTER = axisMin + (axisMax - axisMin) * 0.5;

    // console.log(
    //   "min " + axisMin + " max " + axisMax + " center " + AXIS_CENTER
    // );

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

    console.log(
      "- AXIS_ID:" +
        AXIS_ID +
        " AXIS_CENTER:" +
        AXIS_CENTER +
        " L:" +
        hitablesLeft.length +
        " R:" +
        hitablesRight.length
    );

    // Nodes
    this.nodeLeft = new HitableNode();
    this.nodeRight = new HitableNode();

    this.nodeLeft.populate(hitablesLeft, depth + 1);
    this.nodeRight.populate(hitablesRight, depth + 1);
  }

  didHit() {
    // TODO
  }

  createBoundingBox() {
    // TODO This box
    // TODO child boxes
    //     this.boundingBox = new AABB(p0, p1);
  }
}
