import { vec3 } from "gl-matrix";

import Scene from "./Scene";
import SceneHelper from "./SceneHelper";

import TextureImage from "../Texture/TextureImage";

import MaterialLambertian from "../Material/MaterialLambertian";
// import MaterialDielectric from "../Material/MaterialDielectric";
// import MaterialMetal from "../Material/MaterialMetal";

export default class SceneSubsurface extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Helper
    new SceneHelper(this, 5.0, 0.2);

    // Dielectric
    // const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    // this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.53, MATERIAL_DIELECTRIC);

    // Environment reflections

    // Floor
    const TEXTURE_FLOOR = new TextureImage(
      this.getTextureImageDimensions(2),
      this.getTextureImageData(2)
    );
    const MATERIAL_FLOOR = new MaterialLambertian(TEXTURE_FLOOR);

    const DIMENSIONS_FLOOR = 10.0;
    const DIMENSIONS_FLOOR_HALF = DIMENSIONS_FLOOR * 0.5;

    const OFFSET_FLOOR_Y = 0.0;

    this.addPlane(
      vec3.fromValues(
        -DIMENSIONS_FLOOR_HALF,
        OFFSET_FLOOR_Y,
        -DIMENSIONS_FLOOR_HALF
      ),
      vec3.fromValues(
        DIMENSIONS_FLOOR_HALF,
        OFFSET_FLOOR_Y,
        -DIMENSIONS_FLOOR_HALF
      ),
      vec3.fromValues(
        DIMENSIONS_FLOOR_HALF,
        OFFSET_FLOOR_Y,
        DIMENSIONS_FLOOR_HALF
      ),
      vec3.fromValues(
        -DIMENSIONS_FLOOR_HALF,
        OFFSET_FLOOR_Y,
        DIMENSIONS_FLOOR_HALF
      ),
      MATERIAL_FLOOR
    );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.2);

    CAMERA_CONTROLLER.setPosition(-30.0, 30.0, -30.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
