import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";

import { HSVtoRGB } from "../Util/util";

export default class SceneAnimationTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    this.animationFrameMax = 39;

    // Center
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.48, MATERIAL_DIELECTRIC);

    // Fast
    this.TAU = Math.PI * 2.0;

    // Line
    this.RADIUS = 0.56;
    this.TOTAL = 7;
    this.OFFSET_ITEM = 0.12;
    this.OFFSET_SET = this.OFFSET_ITEM * -3.0;

    this.POSITION_CENTER = vec3.create();

    let progressInterval = 1.0 / this.TOTAL;
    //let offsetItem = 0.12;
    //let offsetSet = offsetItem * -3.0;
    let y;
    let colour;

    let i;

    this.spheresAnimated = [];

    for (i = 0; i < this.TOTAL; i++) {
      colour = HSVtoRGB(progressInterval * i, 0.9, 0.9);

      y = this.OFFSET_SET + this.OFFSET_ITEM * i;

      this.spheresAnimated[i] = this.addSphere(
        vec3.fromValues(this.RADIUS, y, 0.0),
        0.04,
        new MaterialMetal(vec3.fromValues(colour.r, colour.g, colour.b), 0.1)
      );
    }

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      new MaterialMetal(vec3.fromValues(0.9, 0.9, 0.9), 0.2)
    );
  }

  // _________________________________________________________________ Animation

  setAnimationFrame(frame) {
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    const TOTAL = this.TOTAL;
    const RADIUS = this.RADIUS;
    const OFFSET_ITEM = this.OFFSET_ITEM;
    const OFFSET_SET = this.OFFSET_SET;

    const TAU = this.TAU;

    // Camera
    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.1);
    CAMERA_CONTROLLER.setPosition(4.0, 0.01, -1.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);

    // Position Center
    const PROGRESS = (1.0 / (this.animationFrameMax + 1)) * frame;
    const ROTATION = TAU * PROGRESS;

    const POSITION_CENTER = this.POSITION_CENTER;
    POSITION_CENTER[0] = Math.cos(ROTATION) * RADIUS;
    POSITION_CENTER[1] = 0.0;
    POSITION_CENTER[2] = Math.sin(ROTATION) * RADIUS;

    // Animated spheres
    let i;
    let y;

    for (i = 0; i < TOTAL; i++) {
      y = OFFSET_SET + OFFSET_ITEM * i;

      this.spheresAnimated[i].setPositionCenter(
        POSITION_CENTER[0],
        POSITION_CENTER[1] + y,
        POSITION_CENTER[2]
      );
    }
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(
      white + 0.61 * t,
      white + 0.76 * t,
      white + 0.79 * t
    );
  }
}
