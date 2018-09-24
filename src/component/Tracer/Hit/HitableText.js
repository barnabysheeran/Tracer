import Hitable from "./Hitable";
import HitablePlaneHolder from "./HitablePlaneHolder";

export default class HitableText extends Hitable {
  constructor(scene, width, height, material) {
    super();

    this.PLANE_0 = new HitablePlaneHolder(scene, width, height, material);
    //this.PLANE_1 = new HitablePlaneHolder();
  }

  // __________________________________________________________________ Position

  setPosition(x, y, z) {
    this.PLANE_0.setPosition(x, y, z);
  }

  // __________________________________________________________________ Rotation

  setRotationEuler(x, y, z) {
    this.PLANE_1.setRotationEuler(x, y, z);
  }
}
