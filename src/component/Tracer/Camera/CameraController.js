import { vec3 } from "gl-matrix";

import Camera from "./Camera";

export default class CameraController {
  constructor() {
    // Position
    this.position = vec3.fromValues(3.0, 3.0, 2.0);
    this.positionTarget = vec3.fromValues(0.0, 0.0, -1.0);

    // Up
    this.UP = vec3.fromValues(0.0, 1.0, 0.0);

    // FOV
    this.fov = 20.0;

    // Aspect
    this.aspectRatio = 800 / 400; // TODO Update on shape

    // Aperture
    this.aperture = 2.0;

    // Focus
    this.distanceFocus = this.calculateDistanceFocus();

    // Camera
    this.CAMERA = new Camera(
      this.position,
      this.positionTarget,
      this.UP,
      this.fov,
      this.aspectRatio,
      this.aperture,
      this.distanceFocus
    );
  }

  calculateDistanceFocus() {
    const POSITION = this.position;
    const POSITION_TARGET = this.positionTarget;

    let path = vec3.fromValues(
      POSITION[0] - POSITION_TARGET[0],
      POSITION[1] - POSITION_TARGET[1],
      POSITION[2] - POSITION_TARGET[2]
    );

    return vec3.length(path);
  }

  getRay(u, v) {
    return this.CAMERA.getRay(u, v);
  }

  shape(w, h) {
    this.CAMERA.shape(w, h);
  }
}
