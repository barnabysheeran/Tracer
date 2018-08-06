import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureChecker from "../Texture/TextureChecker";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialLambertian";
import MaterialLambertian from "../Material/MaterialLambertian";
import TextureConstant from "../Texture/TextureConstant";

export default class SceneTextureTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Constant
    const TEXTURE_GREY = new TextureConstant(vec3.fromValues(0.5, 0.5, 0.5));
    const MATERIAL_GREY = new MaterialLambertian(TEXTURE_GREY);

    this.addSphere(vec3.fromValues(0.0, 0.0, 1.04), 0.5, MATERIAL_GREY);

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.45, MATERIAL_DIELECTRIC);

    // Metal
    const TEXTURE_METAL = new TextureConstant(0.5, 0.5, 0.5);

    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.5);

    this.addSphere(vec3.fromValues(0.0, 0.0, -1.04), 0.5, MATERIAL_METAL);

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

    CAMERA_CONTROLLER.setFov(16.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(3.0, 1.0, 3.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, -0.04, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
