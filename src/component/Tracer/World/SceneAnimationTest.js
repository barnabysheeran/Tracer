import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";
import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneAnimationTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Center
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.45, MATERIAL_DIELECTRIC);

    // Sphere
    const MATERIAL_METAL = new MaterialMetal(
      vec3.fromValues(1.0, 0.5, 0.5),
      0.1
    );
    this.addSphere(vec3.fromValues(-1, 0.0, 0.0), 0.1, MATERIAL_METAL);

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

    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    CAMERA_CONTROLLER.setPosition(2.0, 2.0, 2.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }
}
