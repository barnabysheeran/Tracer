import { vec3 } from "gl-matrix";

import Ray from "../Ray/Ray";

export default class Camera {
  constructor() {
    this.LOWER_LEFT_CORNER = vec3.create();
    this.HORIZONTAL = vec3.create();
    this.VERTICAL = vec3.create();
    this.POSITION_ORIGIN = vec3.create();

    this.PIXELS_TO_WORLD = 200;

    // Reuseable ray
    this.RAY = new Ray();

    this.RAY.setPositionOrigin(
      this.POSITION_ORIGIN[0],
      this.POSITION_ORIGIN[1],
      this.POSITION_ORIGIN[2]
    );
  }

  // _______________________________________________________________________ Ray

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

  // _____________________________________________________________________ Shape

  shape(pixelWidth, pixelHeight) {
    let w = pixelWidth / this.PIXELS_TO_WORLD;
    let h = pixelHeight / this.PIXELS_TO_WORLD;

    let LOWER_LEFT_CORNER = this.LOWER_LEFT_CORNER;
    LOWER_LEFT_CORNER[0] = -w;
    LOWER_LEFT_CORNER[1] = -h;
    LOWER_LEFT_CORNER[2] = -h;

    this.HORIZONTAL[0] = w * 2;

    this.VERTICAL[1] = h * 2;
  }
}
