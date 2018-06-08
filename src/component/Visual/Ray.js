import { vec3 } from "gl-matrix";

export default class Ray {
  constructor() {
    this.ORIGIN = vec3.fromValues(0, 0, 0);
    this.DIRECTION = vec3.fromValues(0, 0, 0);

    // Reuseable
    this.POINT = vec3.fromvalues(0, 0, 0);
  }

  // _______________________________________________________________________ Set

  setOrigin(x, y, z) {
    const ORIGIN = this.ORIGIN;
    ORIGIN[0] = x;
    ORIGIN[1] = y;
    ORIGIN[2] = z;
  }

  setDirection(x, y, z) {
    const DIRECTION = this.DIRECTION;
    DIRECTION[0] = x;
    DIRECTION[1] = y;
    DIRECTION[2] = z;
  }

  // _______________________________________________________________________ Set

  getPointAtParameter(t) {
    const ORIGIN = this.ORIGIN;
    const DIRECTION = this.DIRECTION;
    const POINT = this.POINT;

    vec3.multiply(DIRECTION, DIRECTION, t);
    vec3.add(POINT, POINT, ORIGIN);

    return POINT;
  }
}
