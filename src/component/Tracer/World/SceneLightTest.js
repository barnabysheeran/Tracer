import { vec3, quat } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureImage from "../Texture/TextureImage";
import MaterialLightDiffuse from "../Material/MaterialLightDiffuse";
import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneLightTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    // Old
    this.HITABLES = [];

    // World center
    const TEXTURE_CENTER = new TextureConstant(vec3.fromValues(0.0, 0.0, 0.0));
    const MATERIAL_CENTER = new MaterialLambertian(TEXTURE_CENTER);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.25, MATERIAL_CENTER);

    // X
    const TEXTURE_X = new TextureConstant(vec3.fromValues(1.0, 0.0, 0.0));
    const MATERIAL_X = new MaterialLambertian(TEXTURE_X);
    this.addSphere(vec3.fromValues(1.0, 0.0, 0.0), 0.1, MATERIAL_X);
    this.addSphere(vec3.fromValues(2.0, 0.0, 0.0), 0.1, MATERIAL_X);

    this.addSphere(vec3.fromValues(-1.0, 0.0, 0.0), 0.05, MATERIAL_X);
    this.addSphere(vec3.fromValues(-2.0, 0.0, 0.0), 0.05, MATERIAL_X);

    // Y
    const TEXTURE_Y = new TextureConstant(vec3.fromValues(0.0, 1.0, 0.0));
    const MATERIAL_Y = new MaterialLambertian(TEXTURE_Y);
    this.addSphere(vec3.fromValues(0.0, 1.0, 0.0), 0.1, MATERIAL_Y);
    this.addSphere(vec3.fromValues(0.0, 2.0, 0.0), 0.1, MATERIAL_Y);

    this.addSphere(vec3.fromValues(0.0, -1.0, 0.0), 0.05, MATERIAL_Y);
    this.addSphere(vec3.fromValues(0.0, -2.0, 0.0), 0.05, MATERIAL_Y);

    // Z
    const TEXTURE_Z = new TextureConstant(vec3.fromValues(0.0, 0.0, 1.0));
    const MATERIAL_Z = new MaterialLambertian(TEXTURE_Z);
    this.addSphere(vec3.fromValues(0.0, 0.0, 1.0), 0.1, MATERIAL_Z);
    this.addSphere(vec3.fromValues(0.0, 0.0, 2.0), 0.1, MATERIAL_Z);

    this.addSphere(vec3.fromValues(0.0, 0.0, -1.0), 0.05, MATERIAL_Z);
    this.addSphere(vec3.fromValues(0.0, 0.0, -2.0), 0.05, MATERIAL_Z);

    // Image
    const TEXTURE_IMAGE = new TextureImage(
      this.getTextureImageDimensions(2),
      this.getTextureImageData(2)
    );
    const MATERIAL_IMAGE = new MaterialLambertian(TEXTURE_IMAGE);

    const PI = this.addPlane(2, 2, MATERIAL_IMAGE);
    PI.setPosition(vec3.fromValues(0, 0, -2));
    PI.setRotation(quat.create());

    // Light
    const TEXTURE_LIGHT = new TextureConstant(vec3.fromValues(4.0, 4.0, 4.0));
    const MATERIAL_LIGHT = new MaterialLightDiffuse(TEXTURE_LIGHT);

    const PL = this.addPlane(2, 2, MATERIAL_LIGHT);
    PL.setPosition(vec3.fromValues(0, 0, 2));
    PL.setRotation(quat.create());
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(25.0);
    CAMERA_CONTROLLER.setAperture(0.1);

    CAMERA_CONTROLLER.setPosition(5.0, 5.0, 5.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    // return vec3.fromValues(0.0, 0.0, 0.0);
    return vec3.fromValues(0.5, 0.5, 0.5);
  }
}
