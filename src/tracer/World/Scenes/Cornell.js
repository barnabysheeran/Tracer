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

    // Materials
    const MATERIAL_RED = new MaterialLambertian(
      new TextureConstant(vec3.fromValues(0.65, 0.05, 0.05))
    );

    const MATERIAL_WHITE = new MaterialLambertian(
      new TextureConstant(vec3.fromValues(0.73, 0.73, 0.73))
    );

    const MATERIAL_GREEN = new MaterialLambertian(
      new TextureConstant(vec3.fromValues(0.12, 0.45, 0.15))
    );

    // Light
    const L = 10.0;

    const MATERIAL_LIGHT = new MaterialLightDiffuse(
      new TextureConstant(vec3.fromValues(L, L, L))
    );

    // Walls
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

    const LIGHT = this.addPlane(BOX_SIZE * 0.3, BOX_SIZE * 0.5, MATERIAL_LIGHT);
    LIGHT.setPosition(0.0, OFFSET - 0.01, 0.0);
    LIGHT.setRotationEuler(90.0, 0.0, 0.0);

    // Spheres
    const SPHERE_SIZE = 20.0;
    const SPHERE_Y = -OFFSET + SPHERE_SIZE + 0.01;
    const RADIUS = 25.0;
    const ROTATION_INCREMENT = Math.PI;
    const ROTATION_OFFSET = Math.PI * 0.25;

    // Metal
    const MATERIAL_METAL = new MaterialMetal(
      new TextureConstant(vec3.fromValues(0.9, 0.9, 0.9)),
      0.0
    );

    this.addSphere(
      vec3.fromValues(
        Math.sin(ROTATION_OFFSET + ROTATION_INCREMENT) * RADIUS,
        SPHERE_Y,
        Math.cos(ROTATION_OFFSET + ROTATION_INCREMENT) * RADIUS
      ),
      SPHERE_SIZE,
      MATERIAL_METAL
    );

    // Dielectric
    const MATERIAL_GLASS = new MaterialDielectric(1.5);

    this.addSphere(
      vec3.fromValues(
        Math.sin(ROTATION_OFFSET + ROTATION_INCREMENT * 2.0) * RADIUS,
        SPHERE_Y,
        Math.cos(ROTATION_OFFSET + ROTATION_INCREMENT * 2.0) * RADIUS
      ),
      SPHERE_SIZE,
      MATERIAL_GLASS
    );

    this.addSphere(
      vec3.fromValues(
        Math.sin(ROTATION_OFFSET + ROTATION_INCREMENT * 2.0) * RADIUS,
        SPHERE_Y,
        Math.cos(ROTATION_OFFSET + ROTATION_INCREMENT * 2.0) * RADIUS
      ),
      SPHERE_SIZE * 0.9,
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
