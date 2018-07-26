import { vec3 } from "gl-matrix";

import { getRandomInUnitDisc } from "../Util/util";

import Ray from "../Ray/Ray";

export default class Camera {
  constructor(position, target, up, fov, aspect, aperture, focusDistance) {
    this.lensRadius = aperture / 2;
    this.theta = (fov * Math.PI) / 180;
    this.heightHalf = Math.tan(this.theta / 2);
    this.widthHalf = aspect * this.heightHalf;

    this.origin = vec3.fromValues(position[0], position[1], position[2]);

    // W
    this.w = vec3.fromValues(
      position[0] - target[0],
      position[1] - target[1],
      position[2] - target[2]
    );
    vec3.normalize(this.w, this.w);

    // U
    this.u = vec3.create();
    vec3.cross(this.u, up, this.w);

    // V
    this.v = vec3.create();
    vec3.cross(this.v, up, this.u);

    this.lowerLeftCorner = vec3.fromValues(
      this.origin[0] -
        this.widthHalf * focusDistance * this.u[0] -
        this.heightHalf * focusDistance * this.v[0] -
        focusDistance * this.w[0],
      this.origin[1] -
        this.widthHalf * focusDistance * this.u[1] -
        this.heightHalf * focusDistance * this.v[1] -
        focusDistance * this.w[1],
      this.origin[2] -
        this.widthHalf * focusDistance * this.u[2] -
        this.heightHalf * focusDistance * this.v[2] -
        focusDistance * this.w[2]
    );

    this.horizontal = vec3.fromValues(
      2.0 * this.widthHalf * focusDistance * this.u[0],
      2.0 * this.widthHalf * focusDistance * this.u[1],
      2.0 * this.widthHalf * focusDistance * this.u[2]
    );

    this.vertical = vec3.fromValues(
      2.0 * this.heightHalf * focusDistance * this.v[0],
      2.0 * this.heightHalf * focusDistance * this.v[1],
      2.0 * this.heightHalf * focusDistance * this.v[2]
    );

    // Reuseable ray
    this.RAY = new Ray();
  }

  // _______________________________________________________________________ Ray

  getRay(s, t) {
    const LENS_RADIUS = this.lensRadius;
    const U = this.u;
    const V = this.v;
    const RAY = this.RAY;
    const ORIGIN = this.origin;
    const LOWER_LEFT_CORNER = this.lowerLeftCorner;
    const HORIZONTAL = this.horizontal;
    const VERTICAL = this.vertical;

    let disc = getRandomInUnitDisc();

    let rd = vec3.fromValues(
      LENS_RADIUS * disc[0],
      LENS_RADIUS * disc[1],
      LENS_RADIUS * disc[2]
    );

    let offset = vec3.fromValues(
      U[0] * rd[0] + V[0] + rd[1],
      U[1] * rd[0] + V[1] + rd[1],
      U[2] * rd[0] + V[2] + rd[1]
    );

    RAY.setPositionOrigin(
      ORIGIN[0] + offset[0],
      ORIGIN[1] + offset[1],
      ORIGIN[2] + offset[2]
    );

    RAY.setDirection(
      LOWER_LEFT_CORNER[0] +
        s * HORIZONTAL[0] +
        t * VERTICAL[0] -
        ORIGIN[0] -
        offset[0],
      LOWER_LEFT_CORNER[1] +
        s * HORIZONTAL[1] +
        t * VERTICAL[1] -
        ORIGIN[1] -
        offset[1],
      LOWER_LEFT_CORNER[2] +
        s * HORIZONTAL[2] +
        t * VERTICAL[2] -
        ORIGIN[2] -
        offset[2]
    );

    return RAY;
  }

  // _____________________________________________________________________ Shape

  shape(pixelWidth, pixelHeight) {
    // let w = pixelWidth / this.PIXELS_TO_WORLD;
    // let h = pixelHeight / this.PIXELS_TO_WORLD;
    // let LOWER_LEFT_CORNER = this.LOWER_LEFT_CORNER;
    // LOWER_LEFT_CORNER[0] = -w;
    // LOWER_LEFT_CORNER[1] = -h;
    // LOWER_LEFT_CORNER[2] = -h;
    // this.HORIZONTAL[0] = w * 2;
    // this.VERTICAL[1] = h * 2;
    // TODO ASPECT & FOV
    //this.fov
  }
}
