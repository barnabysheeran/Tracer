import { vec3 } from "gl-matrix";

export default class Ray {
  constructor() {
    this.POSITION_ORIGIN = vec3.create();
    this.DIRECTION = vec3.create();
    this.DIRECTION_NORMALIZED = vec3.create();
    this.time = 0.0;
  }

  // _______________________________________________________________________ Set

  setPositionOrigin(x, y, z) {
    const POSITION_ORIGIN = this.POSITION_ORIGIN;
    POSITION_ORIGIN[0] = x;
    POSITION_ORIGIN[1] = y;
    POSITION_ORIGIN[2] = z;
  }

  setDirection(x, y, z) {
    // Set Direction
    const DIRECTION = this.DIRECTION;
    DIRECTION[0] = x;
    DIRECTION[1] = y;
    DIRECTION[2] = z;

    // Set Direction Normalized
    vec3.normalize(this.DIRECTION_NORMALIZED, DIRECTION);
  }

  setTime(time) {
    this.time = time;
  }

  // _______________________________________________________________________ Get

  getPositionOrigin() {
    return this.POSITION_ORIGIN;
  }

  getDirection() {
    return this.DIRECTION;
  }

  getDirectionNormalized() {
    return this.DIRECTION_NORMALIZED;
  }

  getTime() {
    return this.time;
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
