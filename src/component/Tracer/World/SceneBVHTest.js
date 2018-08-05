import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";
import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneBVHTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.45, MATERIAL_DIELECTRIC);

    // Colours
    const TOTAL = 100;

    let i;
    let x = 1.0;
    let y = 0.0;
    let z = -1.0;

    for (i = 0; i < TOTAL; i++) {
      this.addSphere(
        vec3.fromValues(x, y, z),
        0.19,
        new MaterialMetal(
          vec3.fromValues(Math.random(), Math.random(), Math.random()),
          Math.random()
        )
      );

      x += 0.2;

      if (x > 5.0) {
        x = 1.0;
        z += 0.2;
        y += 0.05;
      }
    }

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      new MaterialLambertian(vec3.fromValues(0.8, 0.8, 0.8))
    );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(90.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    CAMERA_CONTROLLER.setPosition(0.0, 1.0, -2.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}