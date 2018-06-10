import { vec3 } from "gl-matrix";

import Ray from "./Ray";

export default class Camera {
  constructor() {
    // Const
    this.LOWER_LEFT_CORNER = vec3.fromValues(-2.0, -1.0, -1.0);
    this.HORIZONTAL = vec3.fromValues(4.0, 0.0, 0.0); // TODO Set with shape
    this.VERTICAL = vec3.fromValues(0.0, 2.0, 0.0); // TODO Set with shape
    this.POSITION_ORIGIN = vec3.fromValues(0.0, 0.0, 0.0);

    // Reuseable ray
    this.RAY = new Ray();

    this.RAY.setPositionOrigin(
      this.POSITION_ORIGIN[0],
      this.POSITION_ORIGIN[1],
      this.POSITION_ORIGIN[2]
    );
  }

  getRay(u, v) {
    const LOWER_LEFT_CORNER = this.LOWER_LEFT_CORNER;
    const HORIZONTAL = this.HORIZONTAL;
    const VERTICAL = this.VERTICAL;
    const RAY = this.RAY;

    RAY.setDirection(
      LOWER_LEFT_CORNER[0] + u * HORIZONTAL[0] + v * VERTICAL[0],
      LOWER_LEFT_CORNER[1] + u * HORIZONTAL[1] + v * VERTICAL[1],
      LOWER_LEFT_CORNER[2] + u * HORIZONTAL[2] + v * VERTICAL[2]
    );

    return RAY;
  }
}
