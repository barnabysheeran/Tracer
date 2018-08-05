import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureChecker from "../Texture/TextureChecker";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialLambertian";
import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneTextureTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Constant
    const MATERIAL_LAMBERTIAN_R = new MaterialLambertian(
      vec3.fromValues(0.8, 0.2, 0.2),
      0.5
    );
    this.addSphere(vec3.fromValues(0.0, 0.0, 1.04), 0.5, MATERIAL_LAMBERTIAN_R);

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.45, MATERIAL_DIELECTRIC);

    // Metal
    const MATERIAL_METAL = new MaterialMetal(
      vec3.fromValues(0.5, 0.5, 0.5),
      0.5
    );
    this.addSphere(vec3.fromValues(0.0, 0.0, -1.04), 0.5, MATERIAL_METAL);

    // 'Floor'
    const TEXTURE_CHECKER = new TextureChecker();

    const MATERIAL_FLOOR = new MaterialLambertian(
      vec3.fromValues(0.8, 0.8, 0.8)
    );

    this.addSphere(vec3.fromValues(0.0, -100.5, -1.0), 100, MATERIAL_FLOOR);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(35.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    CAMERA_CONTROLLER.setPosition(3.0, 0.0, 0.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
