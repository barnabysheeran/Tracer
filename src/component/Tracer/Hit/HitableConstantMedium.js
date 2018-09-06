import Hitable from "./Hitable";

export default class HitableConstantMedium extends Hitable {
  constructor() {
    super();
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    ray;
    tMin;
    tMax;
    hitRecord;
  }
}
