import { vec3 } from "gl-matrix";

export default class Sphere {
  constructor(positionCenter, radius) {
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

  // _______________________________________________________________________ Hit

  didHit(ray) {
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

    const B = 2.0 * vec3.dot(OC, RAY_DIRECTION);

    const C = vec3.dot(OC, OC) - RADIUS * RADIUS;

    const DISCRIMINANT = B * B - 4 * A * C;

    if (DISCRIMINANT < 0) {
      return -1.0;
    } else {
      return (-B - Math.sqrt(DISCRIMINANT)) / (2.0 + A);
    }
  }
}
