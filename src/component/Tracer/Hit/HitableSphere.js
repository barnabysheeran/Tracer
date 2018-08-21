import { vec3 } from "gl-matrix";

import Hitable from "./Hitable";

export default class HitableSphere extends Hitable {
  constructor(positionCenter, radius, material) {
    super();

    this.POSITION_CENTER = positionCenter;
    this.RADIUS = radius;
    this.MATERIAL = material;
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

    let uv;

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

        hitRecord.position = ray.getPointAtParameter(temp); //TODO Use temp

        hitRecord.normal = vec3.fromValues(
          (hitRecord.position[0] - POSITION_CENTER[0]) / RADIUS,
          (hitRecord.position[1] - POSITION_CENTER[1]) / RADIUS,
          (hitRecord.position[2] - POSITION_CENTER[2]) / RADIUS
        );

        hitRecord.material = this.MATERIAL;

        uv = this.generateUV(hitRecord.normal);
        hitRecord.u = uv[0];
        hitRecord.v = uv[1];

        return true;
      }

      temp = (-B + Math.sqrt(B * B - A * C)) / A;

      if (temp < tMax && temp > tMin) {
        hitRecord.t = temp;

        hitRecord.position = ray.getPointAtParameter(temp); //TODO Use temp

        hitRecord.normal = vec3.fromValues(
          (hitRecord.position[0] - POSITION_CENTER[0]) / RADIUS,
          (hitRecord.position[1] - POSITION_CENTER[1]) / RADIUS,
          (hitRecord.position[2] - POSITION_CENTER[2]) / RADIUS
        );

        hitRecord.material = this.MATERIAL;

        uv = this.generateUV(hitRecord.normal);

        hitRecord.u = uv[0];
        hitRecord.v = uv[1];

        return true;
      }
    }

    return false;
  }

  // ________________________________________________________________________ UV

  generateUV(position) {
    const PI = Math.PI;
    const PHI = Math.atan2(position[2], position[0]);
    const THETA = Math.asin(position[1]);

    const U = 1.0 - (PHI + PI) / (2.0 * PI);
    const V = (THETA + PI / 2.0) / PI;

    return [U, V];
  }
}
