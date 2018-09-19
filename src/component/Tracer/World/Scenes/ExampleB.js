import { vec3 } from "gl-matrix";

import Scene from "../Scene";

import TextureConstant from "../../Texture/TextureConstant";
import TextureChecker from "./../../Texture/TextureChecker";

import MaterialDielectric from "../../Material/MaterialDielectric";
import MaterialLambertian from "../../Material/MaterialLambertian";
import MaterialLightDiffuse from "../../Material/MaterialLightDiffuse";

export default class SceneExampleB extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Helper
    //this.addSceneHelper(100, 10);

    // Dimensions
    const BOX_HEIGHT = 150;
    const BOX_WIDTH = 150;
    const BOX_DEPTH = 150;

    // Materials
    const TEXTURE_WHITE = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));
    const TEXTURE_RED = new TextureConstant(vec3.fromValues(1.0, 0.0, 0.0));
    const TEXTURE_GREEN = new TextureConstant(vec3.fromValues(0.0, 1.0, 0.0));

    const MATERIAL_WHITE = new MaterialLambertian(TEXTURE_WHITE);
    const MATERIAL_RED = new MaterialLambertian(TEXTURE_RED);
    const MATERIAL_GREEN = new MaterialLambertian(TEXTURE_GREEN);

    // Roof
    const ROOF = this.addPlane(BOX_WIDTH, BOX_DEPTH, MATERIAL_WHITE);
    ROOF.setPosition(0.0, BOX_HEIGHT * 0.5, 0.0);
    ROOF.setRotationEuler(90.0, 0.0, 0.0);

    // Floor
    const FLOOR = this.addPlane(BOX_WIDTH, BOX_DEPTH, MATERIAL_WHITE);
    FLOOR.setPosition(0.0, BOX_HEIGHT * -0.5, 0.0);
    FLOOR.setRotationEuler(-90.0, 0.0, 0.0);

    // Left
    const LEFT = this.addPlane(BOX_DEPTH, BOX_HEIGHT, MATERIAL_RED);
    LEFT.setPosition(BOX_WIDTH * -0.5, 0.0, 0.0);
    LEFT.setRotationEuler(0.0, 90.0, 0.0);

    // Right
    const RIGHT = this.addPlane(BOX_DEPTH, BOX_HEIGHT, MATERIAL_GREEN);
    RIGHT.setPosition(BOX_WIDTH * 0.5, 0.0, 0.0);
    RIGHT.setRotationEuler(0.0, -90.0, 0.0);

    // Back
    const BACK = this.addPlane(BOX_WIDTH, BOX_HEIGHT, MATERIAL_WHITE);
    BACK.setPosition(0.0, 0.0, BOX_DEPTH * -0.5);

    // Light
    const SCALAR_LIGHT = 1000000.0;

    this.addSphere(
      vec3.fromValues(1.0, 1.0, 1.0),
      1.0,
      new MaterialLightDiffuse(
        new TextureConstant(
          vec3.fromValues(SCALAR_LIGHT, SCALAR_LIGHT, SCALAR_LIGHT)
        )
      )
    );

    // Light Red
    //const SCALAR_LIGHT = 1000.0;

    const TEXTURE_LIGHT_RED = new TextureConstant(
      vec3.fromValues(SCALAR_LIGHT, 0.0, 0.0)
    );

    const MATERIAL_LIGHT_RED = new MaterialLightDiffuse(TEXTURE_LIGHT_RED);

    this.addSphere(vec3.fromValues(-10, -0.0, 0.0), 2.0, MATERIAL_LIGHT_RED);

    // Light Green
    const TEXTURE_LIGHT_GREEN = new TextureConstant(
      vec3.fromValues(0.0, SCALAR_LIGHT, 0.0)
    );

    const MATERIAL_LIGHT_GREEN = new MaterialLightDiffuse(TEXTURE_LIGHT_GREEN);

    this.addSphere(vec3.fromValues(0.0, -0.0, 0.0), 2.0, MATERIAL_LIGHT_GREEN);

    // Light Blue
    const TEXTURE_LIGHT_BLUE = new TextureConstant(
      vec3.fromValues(0.0, 0.0, SCALAR_LIGHT)
    );

    const MATERIAL_LIGHT_BLUE = new MaterialLightDiffuse(TEXTURE_LIGHT_BLUE);

    this.addSphere(vec3.fromValues(10.0, -0.0, 0.0), 2.0, MATERIAL_LIGHT_BLUE);

    // Floor Plane
    const TEXTURE_CHECKER_BLACK = new TextureConstant(
      vec3.fromValues(0.0, 0.0, 0.0)
    );
    const TEXTURE_CHECKER_WHITE = new TextureConstant(
      vec3.fromValues(1.0, 1.0, 1.0)
    );

    const TEXTURE_CHECKER = new TextureChecker(
      TEXTURE_CHECKER_BLACK,
      TEXTURE_CHECKER_WHITE,
      2.0
    );

    const MATERIAL_CHECKER = new MaterialLambertian(TEXTURE_CHECKER);

    const FLOOR_TEST = this.addPlane(100.0, 100.0, MATERIAL_CHECKER);
    FLOOR_TEST.setPosition(0.0, 0.0, -20.0);
    // FLOOR.setRotationEuler(-90.0, 0.0, 0.0);

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    this.addSphere(
      vec3.fromValues(0.0, BOX_DEPTH * -0.5 + 25.0, 0.0),
      25.0,
      MATERIAL_DIELECTRIC
    );

    this.addSphere(
      vec3.fromValues(0.0, BOX_DEPTH * -0.5 + 25.0, 0.0),
      -23.0,
      MATERIAL_DIELECTRIC
    );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(38.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(30.0, 30.0, 300.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.1, 0.1, 0.1);
  }
}
