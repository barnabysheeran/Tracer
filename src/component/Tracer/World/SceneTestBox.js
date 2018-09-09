import { vec3, quat } from "gl-matrix";

import Scene from "./Scene";
import SceneHelper from "./SceneHelper";

import TextureImage from "../Texture/TextureImage";

import MaterialMetal from "../Material/MaterialMetal";

export default class SceneTestBox extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Helper
    new SceneHelper(this, 5.0, 0.2);

    // Box
    const TEXTURE_BOX = new TextureImage(
      this.getTextureImageDimensions(2),
      this.getTextureImageData(2)
    );

    const MATERIAL_BOX = new MaterialMetal(TEXTURE_BOX, 0.1);

    const BOX = this.addBox(5.0, 5.0, 5.0, MATERIAL_BOX);

    const ROTATION = quat.create();
    quat.fromEuler(ROTATION, 45.0, 45.0, 45.0);

    BOX.setRotation(ROTATION);
    //BOX.setPosition(vec3.fromValues(5.0, 0.0, 0.0));

    // Floor
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(17.0);
    CAMERA_CONTROLLER.setAperture(0.2);

    CAMERA_CONTROLLER.setPosition(30.0, 30.0, 0.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
