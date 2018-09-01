export default class Hitable {
  constructor() {
    this.boundingBox = null;
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

  // ____________________________________________________________________ Access

  getPositionCenter() {}
}
