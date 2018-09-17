import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureImage from "../Texture/TextureImage";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";

export default class SceneImageSphere extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    const TEXTURE_TEST_A = new TextureImage(
      this.getTextureImageDimensions(0),
      this.getTextureImageData(0)
    );

    const TEXTURE_TEST_B = new TextureImage(
      this.getTextureImageDimensions(1),
      this.getTextureImageData(1)
    );

    const MATERIAL_IMAGE_A = new MaterialMetal(TEXTURE_TEST_A, 0.0);

    const MATERIAL_IMAGE_B = new MaterialMetal(TEXTURE_TEST_B, 0.0);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_IMAGE_B);

    this.addSphere(vec3.fromValues(0.0, -10.5, 0.0), 10, MATERIAL_IMAGE_A);

    // Dielectric
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.53, MATERIAL_DIELECTRIC);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(16.0);
    CAMERA_CONTROLLER.setAperture(0.2);

    CAMERA_CONTROLLER.setPosition(3.0, 4.0, 3.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, -0.2, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
