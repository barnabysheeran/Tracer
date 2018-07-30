import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialMetal from "../Material/MaterialMetal";

export default class ScenePyramid extends Scene {
  constructor(cameraController) {
    super(cameraController);

    this.ANIMATION_FRAME_TOTAL = 20;

    const MATERIAL_METAL = new MaterialMetal(
      vec3.fromValues(0.8, 0.8, 0.8),
      0.1
    );

    // 25
    let step = 0.21;
    let offsetX = step * -2.0;
    let offsetZ = step * -2.0;

    let x = 0;
    let z = 0;

    for (let i = 0; i < 25; i++) {
      this.addSphere(
        vec3.fromValues(offsetX + step * x, 0.0, offsetZ + step * z),
        0.1,
        MATERIAL_METAL
      );

      x++;
      if (x > 4) {
        x = 0;
        z++;
      }
    }

    // 16
    x = 0;
    z = 0;

    offsetX = step * -1.5;
    offsetZ = step * -1.5;

    for (let i = 0; i < 16; i++) {
      this.addSphere(
        vec3.fromValues(offsetX + step * x, 0.1, offsetZ + step * z),
        0.1,
        MATERIAL_METAL
      );

      x++;
      if (x > 3) {
        x = 0;
        z++;
      }
    }

    // 9
    x = 0;
    z = 0;

    offsetX = step * -1.0;
    offsetZ = step * -1.0;

    for (let i = 0; i < 9; i++) {
      this.addSphere(
        vec3.fromValues(offsetX + step * x, 0.2, offsetZ + step * z),
        0.1,
        MATERIAL_METAL
      );

      x++;
      if (x > 2) {
        x = 0;
        z++;
      }
    }

    // 4
    x = 0;
    z = 0;

    offsetX = step * -0.5;
    offsetZ = step * -0.5;

    for (let i = 0; i < 4; i++) {
      this.addSphere(
        vec3.fromValues(offsetX + step * x, 0.3, offsetZ + step * z),
        0.1,
        MATERIAL_METAL
      );

      x++;
      if (x > 1) {
        x = 0;
        z++;
      }
    }

    // 1
    this.addSphere(vec3.fromValues(0.0, 0.4, 0.0), 0.1, MATERIAL_METAL);

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

    const progress = (1.0 / this.ANIMATION_FRAME_TOTAL) * frame;
    const rotation = Math.PI * 0.5 * progress;
    const RADIUS = 3.0;

    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    CAMERA_CONTROLLER.setPosition(
      Math.cos(rotation) * RADIUS,
      1.0,
      Math.sin(rotation) * RADIUS
    );

    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }
}
