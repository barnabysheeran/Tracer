export default class Hitable {
  constructor() {
    this.AABB;
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    ray;
    tMin;
    tMax;
    hitRecord;
  }

  // ______________________________________________________________________ AABB

  createAABB() {}
}
