import { vec3 } from "gl-matrix";

import Hitable from "./Hitable";

export default class HitablePlane extends Hitable {
  constructor(x0, x1, y0, y1, k, material) {
    super();

    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;

    this.k = k;

    this.MATERIAL = material;
  }

  didHit(ray, tMin, tMax, hitRecord) {
    const X0 = this.x0;
    const X1 = this.x1;
    const Y0 = this.y0;
    const Y1 = this.y1;
    const K = this.k;

    const RAY_ORIGIN = ray.getPositionOrigin();
    const RAY_DIRECTION = ray.getDirection();

    const T = (K - RAY_ORIGIN[2]) / RAY_DIRECTION[2];

    if (T < tMin || T > tMax) {
      return false;
    }

    const X = RAY_ORIGIN[0] + T * RAY_DIRECTION[0];
    const Y = RAY_ORIGIN[1] + T * RAY_DIRECTION[1];

    if (X < X0 || X > X1 || Y < Y0 || Y > Y1) {
      return false;
    }

    hitRecord.u = (X - X0) / (X1 - X0);
    hitRecord.v = (Y - Y0) / (Y1 - Y0);

    hitRecord.t = T;

    hitRecord.material = this.MATERIAL;

    hitRecord.position = ray.getPointAtParameter(hitRecord.t);
    hitRecord.normal = vec3.fromValues(0, 0, 1);

    return true;
  }
}
