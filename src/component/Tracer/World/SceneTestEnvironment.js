import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureImage from "../Texture/TextureImage";
import TextureConstant from "../Texture/TextureConstant";
import MaterialMetal from "../Material/MaterialMetal";

import EnvironmentSpherical from "../Environment/EnvironmentSpherical";

export default class SceneTestEnvironment extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Animation
    this.animationFrameMax = 250;
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Material Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.0);

    // Sphere
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 44.0, MATERIAL_METAL);

    // Environment
    const ENVIRONMENT_TEXTURE = new TextureImage(
      this.getTextureImageDimensions(4),
      this.getTextureImageData(4)
    );

    this.ENVIRONMENT = new EnvironmentSpherical(ENVIRONMENT_TEXTURE);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(60.0);
    CAMERA_CONTROLLER.setAperture(0.2);

    const TAU = Math.PI * 2.0;
    const RADIUS = 100.0;

    CAMERA_CONTROLLER.setPosition(
      Math.cos(time * TAU) * RADIUS,
      0.0,
      Math.sin(time * TAU) * RADIUS
    );
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    return this.ENVIRONMENT.getColour(rayDirectionNormalized);
  }
}
