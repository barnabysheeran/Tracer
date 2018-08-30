import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import MaterialMetal from "../Material/MaterialMetal";

import { HSVtoRGB } from "../Util/colour";

// Before BVH 400*200*100AA
// Frame complete. 77.25s
// Sphere 2127827520 2257264 0.0011% Triangle 0 0 NaN%

export default class SceneBVHTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Colours
    let total = 30;
    let progressIntervalTau = (Math.PI * 2) / total;
    let progressInterval = 1.0 / total;

    let incrementZ = 6.0 / total;
    let radius = 1.3;

    let colour;
    let texture;
    let material;

    let rotationTotal = 7;
    let rotationIncrement = (Math.PI * 2.0) / rotationTotal;
    let rotation;

    let i;
    let j;

    for (i = 0; i < total; i++) {
      // Sphere
      colour = HSVtoRGB(progressInterval * i, 1.0, 1.0);

      texture = new TextureConstant(
        vec3.fromValues(colour.r, colour.g, colour.b)
      );

      material = new MaterialMetal(texture, 0.1);

      for (j = 0; j < rotationTotal; j++) {
        rotation = rotationIncrement * j;

        this.addSphere(
          vec3.fromValues(
            Math.sin(-rotation + progressIntervalTau * i) * radius,
            Math.cos(-rotation + progressIntervalTau * i) * radius,
            3.0 - i * incrementZ
          ),
          0.1,
          material
        );
      }
    }
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(21.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    CAMERA_CONTROLLER.setPosition(10.0, 0.0, 0.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
