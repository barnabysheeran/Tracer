import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";

import MaterialLightDiffuse from "../Material/MaterialLightDiffuse";
import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialMetal from "../Material/MaterialMetal";
import MaterialDielectric from "../Material/MaterialDielectric";

export default class SceneCornell extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Cornell
    const TEXTURE_WHITE = new TextureConstant(vec3.fromValues(1.0, 0.0, 1.0));
    const MATERIAL_WHITE = new MaterialLambertian(TEXTURE_WHITE);

    const TEXTURE_RED = new TextureConstant(vec3.fromValues(1.0, 0.0, 0.0));
    const MATERIAL_RED = new MaterialLambertian(TEXTURE_RED);

    const TEXTURE_GREEN = new TextureConstant(vec3.fromValues(0.0, 1.0, 0.0));
    const MATERIAL_GREEN = new MaterialLambertian(TEXTURE_GREEN);

    const C_HEIGHT_HALF = 300.0;
    const C_WIDTH_HALF = 300;
    const C_DEPTH_HALF = 300;

    // Back
    this.addPlane(
      vec3.fromValues(-C_WIDTH_HALF, -C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, -C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(-C_WIDTH_HALF, C_HEIGHT_HALF, -C_DEPTH_HALF),
      MATERIAL_WHITE
    );

    // Left
    this.addPlane(
      vec3.fromValues(-C_WIDTH_HALF, C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(-C_WIDTH_HALF, C_HEIGHT_HALF, C_DEPTH_HALF),
      vec3.fromValues(-C_WIDTH_HALF, -C_HEIGHT_HALF, C_DEPTH_HALF),
      vec3.fromValues(-C_WIDTH_HALF, -C_HEIGHT_HALF, -C_DEPTH_HALF),
      MATERIAL_RED
    );

    // Right
    this.addPlane(
      vec3.fromValues(C_WIDTH_HALF, C_HEIGHT_HALF, C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, -C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, -C_HEIGHT_HALF, C_DEPTH_HALF),
      MATERIAL_GREEN
    );

    // Roof
    this.addPlane(
      vec3.fromValues(-C_WIDTH_HALF, C_HEIGHT_HALF, C_DEPTH_HALF),
      vec3.fromValues(-C_WIDTH_HALF, C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, C_HEIGHT_HALF, C_DEPTH_HALF),
      MATERIAL_WHITE
    );

    // Floor
    this.addPlane(
      vec3.fromValues(-C_WIDTH_HALF, -C_HEIGHT_HALF, C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, -C_HEIGHT_HALF, C_DEPTH_HALF),
      vec3.fromValues(C_WIDTH_HALF, -C_HEIGHT_HALF, -C_DEPTH_HALF),
      vec3.fromValues(-C_WIDTH_HALF, -C_HEIGHT_HALF, -C_DEPTH_HALF),
      MATERIAL_WHITE
    );

    // TEST
    const TEXTURE_TEST = new TextureConstant(vec3.fromValues(1.0, 1.0, 0.0));
    const MATERIAL_TEST = new MaterialLambertian(TEXTURE_TEST);

    const PI = this.addOldPlane(400, 400, MATERIAL_TEST);
    PI.setPosition(vec3.fromValues(0, 0, -400));
    //PI.setRotation(quat.create());
    // END TEST

    // Light
    const TEXTURE_LIGHT = new TextureConstant(
      vec3.fromValues(10.0, 10.0, 10.0)
    );
    const MATERIAL_LIGHT = new MaterialLightDiffuse(TEXTURE_LIGHT);

    const L_HEIGHT_HALF = 299.99;
    const L_WIDTH_HALF = 150;
    const L_DEPTH_HALF = 150;

    this.addPlane(
      vec3.fromValues(-L_WIDTH_HALF, L_HEIGHT_HALF, L_DEPTH_HALF),
      vec3.fromValues(-L_WIDTH_HALF, L_HEIGHT_HALF, -L_DEPTH_HALF),
      vec3.fromValues(L_WIDTH_HALF, L_HEIGHT_HALF, -L_DEPTH_HALF),
      vec3.fromValues(L_WIDTH_HALF, L_HEIGHT_HALF, L_DEPTH_HALF),
      MATERIAL_LIGHT
    );

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 50.0, MATERIAL_LIGHT);

    // Sphere Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(4.0, 4.0, 4.0));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.0);

    this.addSphere(
      vec3.fromValues(100.0, -C_HEIGHT_HALF + 100.001, 0.0),
      100.0,
      MATERIAL_METAL
    );

    // // Sphere Glass
    // const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    // this.addSphere(
    //   vec3.fromValues(0.25, -C_HEIGHT_HALF + 0.101, 0.0),
    //   10.0,
    //   MATERIAL_DIELECTRIC
    // );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(20.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(1.0, 0.0, 2100);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.5, 0.5, 0.5);
  }
}
