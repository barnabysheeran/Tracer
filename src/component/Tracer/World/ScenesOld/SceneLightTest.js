import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureChecker from "../Texture/TextureChecker";

import MaterialMetal from "../Material/MaterialMetal";
import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialLightDiffuse from "../Material/MaterialLightDiffuse";

export default class SceneLightTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));

    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.1);

    this.addSphere(vec3.fromValues(0.0, 0.3, 0.0), 0.5, MATERIAL_METAL);

    // Light Red
    const SCALAR_LIGHT = 10.0;

    const TEXTURE_LIGHT_RED = new TextureConstant(
      vec3.fromValues(SCALAR_LIGHT, 0.0, 0.0)
    );

    const MATERIAL_LIGHT_RED = new MaterialLightDiffuse(TEXTURE_LIGHT_RED);

    this.addSphere(
      vec3.fromValues(-0.35, -0.35, 0.0),
      0.02,
      MATERIAL_LIGHT_RED
    );

    // Light Green
    const TEXTURE_LIGHT_GREEN = new TextureConstant(
      vec3.fromValues(0.0, SCALAR_LIGHT, 0.0)
    );

    const MATERIAL_LIGHT_GREEN = new MaterialLightDiffuse(TEXTURE_LIGHT_GREEN);

    this.addSphere(
      vec3.fromValues(0.0, -0.35, 0.0),
      0.02,
      MATERIAL_LIGHT_GREEN
    );

    // Light Blue
    const TEXTURE_LIGHT_BLUE = new TextureConstant(
      vec3.fromValues(0.0, 0.0, SCALAR_LIGHT)
    );

    const MATERIAL_LIGHT_BLUE = new MaterialLightDiffuse(TEXTURE_LIGHT_BLUE);

    this.addSphere(
      vec3.fromValues(0.35, -0.35, 0.0),
      0.02,
      MATERIAL_LIGHT_BLUE
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

    CAMERA_CONTROLLER.setFov(12.0);
    CAMERA_CONTROLLER.setAperture(0.1);

    CAMERA_CONTROLLER.setPosition(3.0, 0.0, 3.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, -0.4, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;
    // let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    // let white = 1.0 - t;

    // return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);

    return vec3.fromValues(0.0, 0.0, 0.0);
  }
}
