import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";

import { HSVtoRGB } from "../Util/colour";

// Before BVH 400*200*100AA
// Frame complete. 36.35s
// Sphere 381258558 17828168 0.0468% Triangle 0 0 NaN%

// Naive BB
// Frame complete. 35.93s
// Sphere 27452220 13747093 0.5008% Triangle 0 0 NaN%

export default class SceneTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.45, MATERIAL_DIELECTRIC);

    // Colours
    let total = 13;
    let progressIntervalTau = (Math.PI * 2) / total;
    let progressInterval = 1.0 / total;

    let radius = 0.5;
    let colour;
    let texture;
    let material;

    for (let i = 0; i < total; i++) {
      colour = HSVtoRGB(progressInterval * i, 0.8, 0.8);

      texture = new TextureConstant(
        vec3.fromValues(colour.r, colour.g, colour.b)
      );

      // Material
      material = new MaterialMetal(texture, 0.1);

      // Sphere
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressIntervalTau * i) * radius,
          -0.5 + 0.10001,
          Math.cos(progressIntervalTau * i) * radius
        ),
        0.1,
        material
      );
    }

    // 'Floor'
    const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));

    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      new MaterialMetal(TEXTURE_FLOOR, 0.5)
    );
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
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
