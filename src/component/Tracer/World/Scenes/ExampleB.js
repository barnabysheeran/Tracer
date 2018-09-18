import { vec3 } from "gl-matrix";

import Scene from "../Scene";

import TextureConstant from "../../Texture/TextureConstant";

import MaterialLambertian from "../../Material/MaterialLambertian";

export default class SceneExampleB extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Helper
    this.addSceneHelper(100, 10);

    // Plane
    const TEXTURE = new TextureConstant(vec3.fromValues(1.0, 0.0, 0.0));
    const MATERIAL = new MaterialLambertian(TEXTURE);

    const PLANE = this.addPlane(200.0, 100.0, MATERIAL);
    PLANE.setPosition(100.0, 0.0, 0.0);
    PLANE.setRotationEuler(45.0, 0.0, 0.0);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(45.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(0.0, 0.0, 300.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.5, 0.5, 0.5);
  }
}
