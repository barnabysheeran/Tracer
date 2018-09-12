import { vec3, quat } from "gl-matrix";

import Scene from "./Scene";
//import SceneHelper from "./SceneHelper";

import TextureImage from "../Texture/TextureImage";
import TextureConstant from "../Texture/TextureConstant";

import MaterialMetal from "../Material/MaterialMetal";
//import MaterialLambertian from "../Material/MaterialLambertian";

import EnvironmentSpherical from "../Environment/EnvironmentSpherical";

export default class SceneTestBox extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Animation
    this.animationFrameMax = 200;
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Helper
    //new SceneHelper(this, 5.0, 0.2);

    // Material Image
    // const TEXTURE_IMAGE = new TextureImage(
    //   this.getTextureImageDimensions(5),
    //   this.getTextureImageData(5)
    // );

    // const MATERIAL_IMAGE = new MaterialLambertian(TEXTURE_IMAGE);

    // Material Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));

    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.0);

    // Quat
    let rotation = quat.create();

    // Box
    this.BOX = this.addBox(50.0, 50.0, 50.0, MATERIAL_METAL);

    quat.fromEuler(rotation, 0.0, 0.0, 0.0);
    this.BOX.setRotation(rotation);

    this.BOX.setPosition(vec3.fromValues(0.0, 0.0, 0.0));

    // Environment
    const ENVIRONMENT_TEXTURE = new TextureImage(
      this.getTextureImageDimensions(4),
      this.getTextureImageData(4)
    );

    this.ENVIRONMENT = new EnvironmentSpherical(ENVIRONMENT_TEXTURE);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    // Box
    let rotation = quat.create();
    quat.fromEuler(rotation, time * 360.0, time * 360.0, time * 360.0);
    this.BOX.setRotation(rotation);

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(60.0);
    CAMERA_CONTROLLER.setAperture(0.2);

    const TAU = Math.PI * 2.0;
    const RADIUS = 100.0;
    const ROTATION = 0.85;

    CAMERA_CONTROLLER.setPosition(
      Math.cos(ROTATION * TAU) * RADIUS,
      0.0,
      Math.sin(ROTATION * TAU) * RADIUS
    );
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    // Flip texture X
    let reversed = vec3.fromValues(
      rayDirectionNormalized[0],
      rayDirectionNormalized[1],
      -rayDirectionNormalized[2]
    );

    return this.ENVIRONMENT.getColour(reversed);
  }
}
