import { vec3 } from "gl-matrix";

import Scene from "../Scene";
import MaterialLambertian from "../../Material/MaterialLambertian";
import MaterialMetal from "../../Material/MaterialMetal";
import MaterialDielectric from "../../Material/MaterialDielectric";
import MaterialLightDiffuse from "../../Material/MaterialLightDiffuse";

import TextureConstant from "../../Texture/TextureConstant";

export default class SceneExampleB extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Walls
    const MATERIAL_RED = new MaterialLambertian(
      new TextureConstant(vec3.fromValues(0.65, 0.05, 0.05))
    );

    const MATERIAL_WHITE = new MaterialLambertian(
      new TextureConstant(vec3.fromValues(0.73, 0.73, 0.73))
    );

    const MATERIAL_GREEN = new MaterialLambertian(
      new TextureConstant(vec3.fromValues(0.12, 0.45, 0.15))
    );

    const BOX_SIZE = 100.0;
    const OFFSET = BOX_SIZE * 0.5;

    const BACK = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_WHITE);
    BACK.setPosition(0, 0, -OFFSET);

    const LEFT = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_RED);
    LEFT.setPosition(-OFFSET, 0.0, 0.0);
    LEFT.setRotationEuler(0.0, 90.0, 0.0);

    const RIGHT = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_GREEN);
    RIGHT.setPosition(OFFSET, 0.0, 0.0);
    RIGHT.setRotationEuler(0.0, -90.0, 0.0);

    const FLOOR = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_WHITE);
    FLOOR.setPosition(0.0, -OFFSET, 0.0);
    FLOOR.setRotationEuler(-90.0, 0.0, 0.0);

    const ROOF = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_WHITE);
    ROOF.setPosition(0.0, OFFSET, 0.0);
    ROOF.setRotationEuler(90.0, 0.0, 0.0);

    // Light
    const L = 80.0;
    const LIGHT_WIDTH = 2;
    const LIGHT_LENGTH = 23;
    const LIGHT_SPACING = 13.0;

    const MATERIAL_LIGHT = new MaterialLightDiffuse(
      new TextureConstant(vec3.fromValues(L, L, L))
    );

    const LIGHT_A = this.addPlane(LIGHT_WIDTH, LIGHT_LENGTH, MATERIAL_LIGHT);
    LIGHT_A.setPosition(0.0, OFFSET - 0.01, -LIGHT_SPACING);
    LIGHT_A.setRotationEuler(90.0, 90.0, 0.0);

    const LIGHT_B = this.addPlane(LIGHT_WIDTH, LIGHT_LENGTH, MATERIAL_LIGHT);
    LIGHT_B.setPosition(0.0, OFFSET - 0.01, 0.0);
    LIGHT_B.setRotationEuler(90.0, 90.0, 0.0);

    const LIGHT_C = this.addPlane(LIGHT_WIDTH, LIGHT_LENGTH, MATERIAL_LIGHT);
    LIGHT_C.setPosition(0.0, OFFSET - 0.01, LIGHT_SPACING);
    LIGHT_C.setRotationEuler(90.0, 90.0, 0.0);

    // Metal
    const MATERIAL_METAL = new MaterialMetal(
      new TextureConstant(vec3.fromValues(0.9, 0.9, 0.9)),
      0.0
    );

    this.addSphere(
      vec3.fromValues(-18.0, -OFFSET + 25.01, -18.0),
      25.0,
      MATERIAL_METAL
    );

    // Dielectric
    const MATERIAL_GLASS = new MaterialDielectric(1.5);

    this.addSphere(
      vec3.fromValues(20.5, -OFFSET + 14.01, 19.0),
      14.0,
      MATERIAL_GLASS
    );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(40.0);
    CAMERA_CONTROLLER.setAperture(0.0);
    CAMERA_CONTROLLER.setPosition(0, 0, 200);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.0, 0.0, 0.0);
  }
}
