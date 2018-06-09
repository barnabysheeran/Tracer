import { vec3 } from "gl-matrix";

export default class Ray {
  constructor() {
    this.POSITION_ORIGIN = vec3.fromValues(0, 0, 0);
    this.DIRECTION = vec3.fromValues(0, 0, 0);
  }

  // _______________________________________________________________________ Set

  setPositionOrigin(x, y, z) {
    const POSITION_ORIGIN = this.POSITION_ORIGIN;
    POSITION_ORIGIN[0] = x;
    POSITION_ORIGIN[1] = y;
    POSITION_ORIGIN[2] = z;
  }

  setDirection(x, y, z) {
    const DIRECTION = this.DIRECTION;
    DIRECTION[0] = x;
    DIRECTION[1] = y;
    DIRECTION[2] = z;
  }

  // _______________________________________________________________________ Get

  getPositionOrigin() {
    return this.POSITION_ORIGIN;
  }

  getDirection() {
    return this.DIRECTION;
  }

  getDirectionNormalized() {
    let normalized = vec3.fromValues(0, 0, 0);

    vec3.normalizd = vec3.normalize(normalized, this.DIRECTION);

    return normalized;
  }

  // ______________________________________________________________ Point on Ray

  getPointAtParameter(t) {
    const POSITION_ORIGIN = this.POSITION_ORIGIN;
    const DIRECTION = this.DIRECTION;

    return vec3.fromValues(
      POSITION_ORIGIN[0] + t * DIRECTION[0],
      POSITION_ORIGIN[1] + t * DIRECTION[1],
      POSITION_ORIGIN[2] + t * DIRECTION[2]
    );
  }
}