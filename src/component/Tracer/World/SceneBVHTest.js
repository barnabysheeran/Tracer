import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureChecker from "../Texture/TextureChecker";

import MaterialMetal from "../Material/MaterialMetal";
import MaterialLambertian from "../Material/MaterialLambertian";

import { HSVtoRGB } from "../Util/util";

export default class SceneBVHTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

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
          0,
          Math.cos(progressIntervalTau * i) * radius
        ),
        0.1,
        material
      );
    }

    // 'Floor'
    const TEXTURE_CHECKER_BLACK = new TextureConstant(
      vec3.fromValues(0.0, 0.0, 0.0)
    );
    const TEXTURE_CHECKER_WHITE = new TextureConstant(
      vec3.fromValues(1.0, 1.0, 1.0)
    );

    const TEXTURE_CHECKER = new TextureChecker(
      TEXTURE_CHECKER_BLACK,
      TEXTURE_CHECKER_WHITE,
      20.0
    );

    const MATERIAL_CHECKER = new MaterialLambertian(TEXTURE_CHECKER);

    this.addSphere(vec3.fromValues(0.0, -100.5, -1.0), 100, MATERIAL_CHECKER);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(18.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    CAMERA_CONTROLLER.setPosition(3.0, 1.0, 3.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
