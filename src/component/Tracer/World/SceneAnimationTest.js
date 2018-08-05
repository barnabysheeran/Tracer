import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";

import { HSVtoRGB, parametricBlend } from "../Util/util";

export default class SceneAnimationTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    this.animationFrameMax = 13;

    // Center
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.48, MATERIAL_DIELECTRIC);

    // Fast
    this.TAU = Math.PI * 2.0;

    // Line
    this.RADIUS = 0.6;
    this.TOTAL = 7;

    this.TIME_MARGIN = 0.01;
    this.TIME_DURATION = 0.8;
    this.TIME_DELAYS = [];

    let timeOffset =
      (1.0 - this.TIME_MARGIN * 2.0 - this.TIME_DURATION) / this.TOTAL;

    this.OFFSET_ITEM = 0.12;
    this.OFFSET_SET = this.OFFSET_ITEM * -3.0;

    let progressInterval = 1.0 / this.TOTAL;
    let y;
    let colour;

    let i;

    this.spheresAnimated = [];

    for (i = 0; i < this.TOTAL; i++) {
      colour = HSVtoRGB(progressInterval * i, 0.9, 0.9);

      y = this.OFFSET_SET + this.OFFSET_ITEM * i;

      this.TIME_DELAYS[i] = this.TIME_MARGIN + i * timeOffset;

      this.spheresAnimated[i] = this.addSphere(
        vec3.fromValues(this.RADIUS, y, 0.0),
        0.05,
        new MaterialMetal(vec3.fromValues(colour.r, colour.g, colour.b), 0.1)
      );
    }

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.51, -1.0),
      100,
      new MaterialMetal(vec3.fromValues(0.8, 0.8, 0.8), 0.2)
    );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    const TOTAL = this.TOTAL;
    const RADIUS = this.RADIUS;
    const OFFSET_ITEM = this.OFFSET_ITEM;
    const OFFSET_SET = this.OFFSET_SET;
    const TIME_DELAYS = this.TIME_DELAYS;
    const TIME_DURATION = this.TIME_DURATION;
    const TAU = this.TAU;

    // Camera
    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.1);
    CAMERA_CONTROLLER.setPosition(4.0, 1.0, 2.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);

    // Positions
    let y;
    let rotation;
    let delay;
    let i;

    for (i = 0; i < TOTAL; i++) {
      y = OFFSET_SET + OFFSET_ITEM * i;

      delay = TIME_DELAYS[i];

      if (time < delay) {
        rotation = 0.0;
      } else if (time > delay + TIME_DURATION) {
        rotation = 1.0;
      } else {
        rotation = parametricBlend((time - delay) / TIME_DURATION);
      }

      rotation *= TAU;

      this.spheresAnimated[i].setPositionCenter(
        Math.cos(rotation) * RADIUS,
        y,
        Math.sin(rotation) * RADIUS
      );
    }
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
