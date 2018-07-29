import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialLambertian from "../Material/MaterialLambertian";

export default class ScenePyramid extends Scene {
  constructor(cameraController) {
    super(cameraController, 2);

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.45, MATERIAL_DIELECTRIC);

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      new MaterialLambertian(vec3.fromValues(0.8, 0.8, 0.8))
    );
  }

  // _________________________________________________________________ Animation

  setAnimationFrame(frame) {
    frame;

    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setPosition(3.0, 0.0, 0.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }
}
