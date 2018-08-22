import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureImage from "../Texture/TextureImage";

import MaterialLightDiffuse from "../Material/MaterialLightDiffuse";
import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneCornell extends Scene {
  constructor(cameraController) {
    super(cameraController);

    this.BOX_HEIGHT = 2;
    this.BOX_HEIGHT_HALF = this.BOX_HEIGHT * 0.5;

    this.BOX_WIDTH = 1;
    this.BOX_WIDTH_HALF = this.BOX_WIDTH * 0.5;

    this.BOX_DEPTH = 1;
    this.BOX_DEPTH_HALF = this.BOX_DEPTH * 0.5;
  }

  // ______________________________________________________________________ Init

  init() {
    // Old
    this.HITABLES = [];

    // Materials
    const TEXTURE_WHITE = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));
    const MATERIAL_WHITE = new MaterialLambertian(TEXTURE_WHITE);

    // Roof

    // Back

    // Left

    // Right

    // Tri
    const TEXTURE_TRI = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));
    const MATERIAL_TRI = new MaterialLambertian(TEXTURE_TRI);

    this.addTriangle(
      vec3.fromValues(0.0, 0.0, 0.0),
      vec3.fromValues(0.0, 2.0, 0.0),
      vec3.fromValues(2.0, 0.0, 0.0),
      MATERIAL_TRI
    );

    // this.addTriangle(
    //   vec3.fromValues(0.0, 0.0, 0.0),
    //   vec3.fromValues(2.0, 0.0, 0.0),
    //   vec3.fromValues(0.0, 2.0, 0.0),
    //   MATERIAL_TRI
    // );

    // Light
    // const TEXTURE_LIGHT = new TextureConstant(vec3.fromValues(4.0, 4.0, 4.0));
    // const MATERIAL_LIGHT = new MaterialLightDiffuse(TEXTURE_LIGHT);

    // Floor
    const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));

    this.addSphere(
      vec3.fromValues(0.0, -101, -1.0),
      100,
      new MaterialLambertian(TEXTURE_FLOOR, 0.5)
    );
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
    return vec3.fromValues(0.25, 0.25, 0.25);
  }
}
