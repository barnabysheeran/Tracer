export default class AABB {
  constructor(min, max) {
    const PADDING = 0.001;

    // Pad
    min[0] -= PADDING;
    min[1] -= PADDING;
    min[2] -= PADDING;

    max[0] += PADDING;
    max[1] += PADDING;
    max[2] += PADDING;

    this.MIN = min;
    this.MAX = max;
  }

  didHit(ray, tMin, tMax) {
    const MIN = this.MIN;
    const MAX = this.MAX;
    const RAY_ORIGIN = ray.getPositionOrigin();
    const RAY_DIRECTION = ray.getDirection();

    let invD;
    let t0;
    let t1;
    let tt;

    let i;
    for (i = 0; i < 3; i++) {
      invD = 1.0 / RAY_DIRECTION[i];

      t0 = (MIN[i] - RAY_ORIGIN[i]) * invD;
      t1 = (MAX[i] - RAY_ORIGIN[i]) * invD;

      if (invD < 0.0) {
        tt = t0;
        t0 = t1;
        t1 = tt;
      }

      tMin = t0 > tMin ? t0 : tMin;
      tMax = t1 < tMax ? t1 : tMax;

      if (tMax <= tMin) {
        return false;
      }
    }

    return true;
  }
}
