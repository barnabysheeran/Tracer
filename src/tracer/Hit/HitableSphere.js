import { vec3 } from "gl-matrix";

import AABB from "./AABB";
import Hitable from "./Hitable";

export default class HitableSphere extends Hitable {
  constructor(positionCenter, radius, material) {
    super();

    this.positionCenter = positionCenter;
    this.radius = radius;
    this.MATERIAL = material;

    this.inverted = false;

    this.createBoundingBox();
  }

  // _______________________________________________________________________ Set

  setPosition(x, y, z) {
    const POSITION_CENTER = this.positionCenter;
    POSITION_CENTER[0] = x;
    POSITION_CENTER[1] = y;
    POSITION_CENTER[2] = z;

    this.createBoundingBox();
  }

  setRadius(radius) {
    this.radius = radius;

    this.createBoundingBox();
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    // Bounding box hit
    if (this.boundingBox.didHit(ray, tMin, tMax) == false) {
      return false;
    }

    // Hit
    const POSITION_CENTER = this.positionCenter;
    const RADIUS = this.radius;

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

        hitRecord.position = ray.getPointAtParameter(temp);

        hitRecord.normal = vec3.fromValues(
          (hitRecord.position[0] - POSITION_CENTER[0]) / RADIUS,
          (hitRecord.position[1] - POSITION_CENTER[1]) / RADIUS,
          (hitRecord.position[2] - POSITION_CENTER[2]) / RADIUS
        );

        if (this.inverted == true) {
          hitRecord.normal[0] = -hitRecord.normal[0];
          hitRecord.normal[1] = -hitRecord.normal[1];
          hitRecord.normal[2] = -hitRecord.normal[2];
        }

        hitRecord.material = this.MATERIAL;

        uv = this.generateUV(hitRecord.normal);
        hitRecord.u = uv[0];
        hitRecord.v = uv[1];

        return true;
      }

      temp = (-B + Math.sqrt(B * B - A * C)) / A;

      if (temp < tMax && temp > tMin) {
        hitRecord.t = temp;

        hitRecord.position = ray.getPointAtParameter(temp);

        hitRecord.normal = vec3.fromValues(
          (hitRecord.position[0] - POSITION_CENTER[0]) / RADIUS,
          (hitRecord.position[1] - POSITION_CENTER[1]) / RADIUS,
          (hitRecord.position[2] - POSITION_CENTER[2]) / RADIUS
        );

        if (this.inverted == true) {
          hitRecord.normal[0] = -hitRecord.normal[0];
          hitRecord.normal[1] = -hitRecord.normal[1];
          hitRecord.normal[2] = -hitRecord.normal[2];
        }

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

  // ______________________________________________________________________ AABB

  createBoundingBox() {
    const POSITION_CENTER = this.positionCenter;
    const RADIUS = this.radius;

    let p0 = vec3.fromValues(
      POSITION_CENTER[0] - RADIUS,
      POSITION_CENTER[1] - RADIUS,
      POSITION_CENTER[2] - RADIUS
    );

    let p1 = vec3.fromValues(
      POSITION_CENTER[0] + RADIUS,
      POSITION_CENTER[1] + RADIUS,
      POSITION_CENTER[2] + RADIUS
    );

    this.boundingBox = new AABB(p0, p1);
  }

  // ____________________________________________________________________ Normal

  invertNormals() {
    this.inverted = true;
  }

  // ____________________________________________________________________ Access

  getPositionCenter() {
    return this.positionCenter;
  }
}
