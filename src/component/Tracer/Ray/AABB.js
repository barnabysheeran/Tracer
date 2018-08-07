export default class AABB {
  constructor(a, b) {
    this.MIN = a;
    this.MAX = b;
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax) {
    const MIN = this.MIN;
    const MAX = this.MAX;
    const ORIGIN = ray.getPositionOrigin();
    const DIRECTION = ray.getDirection(); // TODO Normalized ?

    let i;
    let t0;
    let t1;

    for (i = 0; i < 3; i++) {
      // TODO Optimise, calc params once only

      t0 = this.ffmin(
        (MIN[i] - ORIGIN[i]) / DIRECTION[i],
        (MAX[i] - ORIGIN[i]) / DIRECTION[i]
      );

      t1 = this.ffmax(
        (MIN[i] - ORIGIN[i]) / DIRECTION[i],
        (MAX[i] - ORIGIN[i]) / DIRECTION[i]
      );

      tMin = this.ffmax(t0, tMin);
      tMax = this.ffmin(t1, tMax);

      if (tMax <= tMin) {
        return false;
      }
    }

    return true;
  }

  // ____________________________________________________________________ Access

  getMin() {
    return this.MIN;
  }

  getMax() {
    return this.MAX;
  }

  // ______________________________________________________________________ Util

  ffmin(a, b) {
    return a < b ? a : b;
  }

  ffmax(a, b) {
    return a > b ? a : b;
  }
}
