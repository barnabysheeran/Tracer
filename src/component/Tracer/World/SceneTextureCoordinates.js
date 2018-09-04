import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureImage from "../Texture/TextureImage";

import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneTextureCoordinates extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Points
    const p0 = vec3.fromValues(0.0, 0.0, 0.0);
    const pX = vec3.fromValues(100.0, 0.0, 0.0);
    const pY = vec3.fromValues(0.0, 100.0, 0.0);
    const pZ = vec3.fromValues(0.0, 0.0, 100.0);
    const pXY = vec3.fromValues(100.0, 100.0, 0.0);
    const pYZ = vec3.fromValues(0.0, 100.0, 100.0);
    const pXZ = vec3.fromValues(100.0, 0, 100.0);

    // Texture Image
    const TEXTURE_TEST_A = new TextureImage(
      this.getTextureImageDimensions(2),
      this.getTextureImageData(2)
    );

    const MATERIAL_IMAGE_A = new MaterialLambertian(TEXTURE_TEST_A, 0.0);

    // Planes
    this.addPlane(p0, pX, pXY, pY, MATERIAL_IMAGE_A);
    this.addPlane(pZ, p0, pY, pYZ, MATERIAL_IMAGE_A);
    this.addPlane(pXZ, pX, p0, pZ, MATERIAL_IMAGE_A);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.1);

    CAMERA_CONTROLLER.setPosition(300.0, 300.0, 300.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
