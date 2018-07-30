import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";
import MaterialLambertian from "../Material/MaterialLambertian";

import { HSVtoRGB } from "../Util/util";

export default class SceneTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.45, MATERIAL_DIELECTRIC);

    this.addSphere(vec3.fromValues(0.1, 0.0, 0.0), 0.2, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.1, 0.0, 0.0), -0.18, MATERIAL_DIELECTRIC);

    // Colours
    let total = 13;
    let progressIntervalTau = (Math.PI * 2) / total;
    let progressInterval = 1.0 / total;

    let radius = 0.5;
    let material;
    let colour;

    for (let i = 0; i < total; i++) {
      colour = HSVtoRGB(progressInterval * i, 0.8, 0.8);

      // Material
      material = new MaterialMetal(
        vec3.fromValues(colour.r, colour.g, colour.b),
        0.1
      );

      // Sphere
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressIntervalTau * i) * radius,
          -0.39,
          Math.cos(progressIntervalTau * i) * radius
        ),
        0.1,
        material
      );
    }

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

    CAMERA_CONTROLLER.setPosition(3.0, 3.0, 2.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, -0.24, 0.0);
  }
}
