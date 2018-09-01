import { vec3 } from "gl-matrix";

import Scene from "./Scene";

export default class SceneEmpty extends Scene {
  constructor(cameraController) {
    super(cameraController);

    this.background = vec3.fromValues(0.5, 0.5, 0.5);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.1);

    CAMERA_CONTROLLER.setPosition(3.0, 2.0, 3.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, -0.19, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return this.background;
  }
}
