import { vec3 } from "gl-matrix";

import Hitable from "./Hitable";

export default class HitablePlane extends Hitable {
  constructor(width, height, material) {
    super();

    this.x0 = width * -0.5;
    this.x1 = width * 0.5;
    this.y0 = height * -0.5;
    this.y1 = height * 0.5;

    this.MATERIAL = material;

    this.POSITION = vec3.create();
  }

  setPosition(position) {
    const POSITION = this.POSITION;
    POSITION[0] = position[0];
    POSITION[1] = position[1];
    POSITION[2] = position[2];
  }

  setRotation(rotation) {
    rotation;
  }

  didHit(ray, tMin, tMax, hitRecord) {
    const POSITION = this.POSITION;

    const X0 = this.x0 + POSITION[0];
    const X1 = this.x1 + POSITION[0];
    const Y0 = this.y0 + POSITION[1];
    const Y1 = this.y1 + POSITION[1];

    const RAY_ORIGIN = ray.getPositionOrigin();
    const RAY_DIRECTION = ray.getDirection();

    const T = (POSITION[2] - RAY_ORIGIN[2]) / RAY_DIRECTION[2];

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
