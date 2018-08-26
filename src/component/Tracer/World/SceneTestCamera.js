import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import MaterialMetal from "../Material/MaterialMetal";

export default class SceneTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Sphere Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(4.0, 4.0, 4.0));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.0);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 100, MATERIAL_METAL);
    this.addSphere(vec3.fromValues(0.0, 0.0, 120.0), 100, MATERIAL_METAL);
    this.addSphere(vec3.fromValues(0.0, 0.0, 240.0), 100, MATERIAL_METAL);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(40.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(0.0, 0.0, -800);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
