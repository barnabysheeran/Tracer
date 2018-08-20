import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureChecker from "../Texture/TextureChecker";

import MaterialLightDiffuse from "../Material/MaterialLightDiffuse";
import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneLightTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    // Old
    this.HITABLES = [];

    // White A
    const TEXTURE_LIGHT_WHITE_A = new TextureConstant(
      vec3.fromValues(10.0, 10.0, 10.0)
    );

    this.addSphere(
      vec3.fromValues(0.75, 0.0, 0.5),
      0.05,
      new MaterialLightDiffuse(TEXTURE_LIGHT_WHITE_A)
    );

    // White B
    const TEXTURE_LIGHT_WHITE_B = new TextureConstant(
      vec3.fromValues(3.0, 3.0, 3.0)
    );

    this.addSphere(
      vec3.fromValues(0.75, 0.0, 0.0),
      0.05,
      new MaterialLightDiffuse(TEXTURE_LIGHT_WHITE_B)
    );

    // White C
    const TEXTURE_LIGHT_WHITE_C = new TextureConstant(
      vec3.fromValues(1.0, 1.0, 1.0)
    );

    this.addSphere(
      vec3.fromValues(0.75, 0.0, -0.5),
      0.05,
      new MaterialLightDiffuse(TEXTURE_LIGHT_WHITE_C)
    );

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.45, MATERIAL_DIELECTRIC);

    // RGB
    const TEXTURE_LIGHT_R = new TextureConstant(vec3.fromValues(4.0, 0.0, 0.0));

    this.addSphere(
      vec3.fromValues(-0.75, -0.0, 0.5),
      0.05,
      new MaterialLightDiffuse(TEXTURE_LIGHT_R)
    );

    const TEXTURE_LIGHT_G = new TextureConstant(vec3.fromValues(0.0, 4.0, 0.0));

    this.addSphere(
      vec3.fromValues(-0.75, 0.0, 0.0),
      0.05,
      new MaterialLightDiffuse(TEXTURE_LIGHT_G)
    );

    const TEXTURE_LIGHT_B = new TextureConstant(vec3.fromValues(0.0, 0.0, 4.0));

    this.addSphere(
      vec3.fromValues(-0.75, 0.0, -0.5),
      0.05,
      new MaterialLightDiffuse(TEXTURE_LIGHT_B)
    );

    // Floor
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

    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.1);

    CAMERA_CONTROLLER.setPosition(3.0, 3.0, 2.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, -0.15, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.0, 0.0, 0.0);
  }
}
