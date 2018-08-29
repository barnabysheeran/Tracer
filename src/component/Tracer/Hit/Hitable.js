export default class Hitable {
  constructor() {
    this.boundingBox;
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    ray;
    tMin;
    tMax;
    hitRecord;
  }

  // ______________________________________________________________________ AABB

  createBoundingBox() {}
}
