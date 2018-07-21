import { vec3 } from "gl-matrix";

import Hitable from "./Hitable";

export default class HitableSphere extends Hitable {
  constructor(positionCenter, radius) {
    super();

    this.POSITION_CENTER = positionCenter;
    this.RADIUS = radius;
  }

  // _______________________________________________________________________ Set

  setPositionCenter(x, y, z) {
    const POSITION_CENTER = this.POSITION_CENTER;
    POSITION_CENTER[0] = x;
    POSITION_CENTER[1] = y;
    POSITION_CENTER[2] = z;
  }

  setRadius(radius) {
    this.RADIUS = radius;
  }

  // ____________________________________________________________________ didHit

  didHit(ray, tMin, tMax, hitRecord) {
    const POSITION_CENTER = this.POSITION_CENTER;
    const RADIUS = this.RADIUS;
    const RAY_ORIGIN = ray.getPositionOrigin();
    const RAY_DIRECTION = ray.getDirection();

    const OC = vec3.fromValues(
      RAY_ORIGIN[0] - POSITION_CENTER[0],
      RAY_ORIGIN[1] - POSITION_CENTER[1],
      RAY_ORIGIN[2] - POSITION_CENTER[2]
    );

    const A = vec3.dot(RAY_DIRECTION, RAY_DIRECTION);
    const B = vec3.dot(OC, RAY_DIRECTION);
    const C = vec3.dot(OC, OC) - RADIUS * RADIUS;
    const DISCRIMINANT = B * B - A * C;

    if (DISCRIMINANT > 0.0) {
      let temp = (-B - Math.sqrt(B * B - A * C)) / A;

      if (temp < tMax && temp > tMin) {
        hitRecord.t = temp;
        hitRecord.position = ray.getPointAtParameter(hitRecord.t);
        hitRecord.normal = vec3.fromValues(
          (hitRecord.position[0] - POSITION_CENTER[0]) / RADIUS,
          (hitRecord.position[1] - POSITION_CENTER[1]) / RADIUS,
          (hitRecord.position[2] - POSITION_CENTER[2]) / RADIUS
        );
        return true;
      }

      temp = (-B + Math.sqrt(B * B - A * C)) / A;

      if (temp < tMax && temp > tMin) {
        hitRecord.t = temp;
        hitRecord.position = ray.getPointAtParameter(hitRecord.t);
        hitRecord.normal = vec3.fromValues(
          (hitRecord.position[0] - POSITION_CENTER[0]) / RADIUS,
          (hitRecord.position[1] - POSITION_CENTER[1]) / RADIUS,
          (hitRecord.position[2] - POSITION_CENTER[2]) / RADIUS
        );
        return true;
      }
    }

    return false;
  }
}
