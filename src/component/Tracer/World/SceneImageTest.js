import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureChecker from "../Texture/TextureChecker";
import TextureImage from "../Texture/TextureImage";

import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneImageTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    // Old
    this.HITABLES = [];

    // Image
    const TEXTURE_IMAGE = new TextureImage(
      this.getTextureImageDimensions(0),
      this.getTextureImageData(0)
    );
    const MATERIAL_IMAGE = new MaterialLambertian(TEXTURE_IMAGE);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_IMAGE);

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

    CAMERA_CONTROLLER.setFov(18.0);
    CAMERA_CONTROLLER.setAperture(0.2);

    CAMERA_CONTROLLER.setPosition(3.0, 3.0, 2.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, -0.15, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
