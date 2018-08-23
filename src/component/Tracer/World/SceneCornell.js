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
    // Old
    this.HITABLES = [];

    // Cornell
    const CORNELL_HEIGHT = 1;
    const CORNELL_HEIGHT_HALF = CORNELL_HEIGHT * 0.5;

    const CORNELL_WIDTH = 1;
    const CORNELL_WIDTH_HALF = CORNELL_WIDTH * 0.5;

    const CORNELL_DEPTH = 1;
    const CORNELL_DEPTH_HALF = CORNELL_DEPTH * 0.5;

    const TEXTURE_WHITE = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));
    const MATERIAL_WHITE = new MaterialLambertian(TEXTURE_WHITE);

    const TEXTURE_RED = new TextureConstant(vec3.fromValues(1.0, 0.0, 0.0));
    const MATERIAL_RED = new MaterialLambertian(TEXTURE_RED);

    const TEXTURE_GREEN = new TextureConstant(vec3.fromValues(0.0, 1.0, 0.0));
    const MATERIAL_GREEN = new MaterialLambertian(TEXTURE_GREEN);

    // Roof
    this.addTriangle(
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      MATERIAL_WHITE
    );

    this.addTriangle(
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      MATERIAL_WHITE
    );

    // Floor
    this.addTriangle(
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      MATERIAL_WHITE
    );

    this.addTriangle(
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      MATERIAL_WHITE
    );

    // Back
    this.addTriangle(
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      MATERIAL_WHITE
    );

    this.addTriangle(
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      MATERIAL_WHITE
    );

    // Left
    this.addTriangle(
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      MATERIAL_GREEN
    );

    this.addTriangle(
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        -CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      MATERIAL_GREEN
    );

    // Right
    this.addTriangle(
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      MATERIAL_RED
    );

    this.addTriangle(
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        CORNELL_HEIGHT_HALF,
        -CORNELL_DEPTH_HALF
      ),
      vec3.fromValues(
        CORNELL_WIDTH_HALF,
        -CORNELL_HEIGHT_HALF,
        CORNELL_DEPTH_HALF
      ),
      MATERIAL_RED
    );

    // Light
    const LIGHT_WIDTH = 0.5;
    const LIGHT_WIDTH_HALF = LIGHT_WIDTH * 0.5;

    const LIGHT_DEPTH = 0.5;
    const LIGHT_DEPTH_HALF = LIGHT_DEPTH * 0.5;

    const LIGHT_HEIGHT = 0.49;

    const TEXTURE_LIGHT = new TextureConstant(vec3.fromValues(4.0, 4.0, 4.0));
    const MATERIAL_LIGHT = new MaterialLightDiffuse(TEXTURE_LIGHT);

    this.addTriangle(
      vec3.fromValues(-LIGHT_WIDTH_HALF, LIGHT_HEIGHT, -LIGHT_DEPTH_HALF),
      vec3.fromValues(-LIGHT_WIDTH_HALF, LIGHT_HEIGHT, LIGHT_DEPTH_HALF),
      vec3.fromValues(LIGHT_WIDTH_HALF, LIGHT_HEIGHT, LIGHT_DEPTH_HALF),
      MATERIAL_LIGHT
    );

    this.addTriangle(
      vec3.fromValues(-LIGHT_WIDTH_HALF, LIGHT_HEIGHT, -LIGHT_DEPTH_HALF),
      vec3.fromValues(LIGHT_WIDTH_HALF, LIGHT_HEIGHT, -LIGHT_DEPTH_HALF),
      vec3.fromValues(LIGHT_WIDTH_HALF, LIGHT_HEIGHT, LIGHT_DEPTH_HALF),
      MATERIAL_LIGHT
    );

    // Sphere Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(4.0, 4.0, 4.0));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.0);

    this.addSphere(
      vec3.fromValues(0.0, -CORNELL_HEIGHT_HALF + 0.1, 0.0),
      0.1,
      MATERIAL_METAL
    );

    // Sphere Glass
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    this.addSphere(
      vec3.fromValues(0.25, -CORNELL_HEIGHT_HALF + 0.1, 0.0),
      0.1,
      MATERIAL_DIELECTRIC
    );

    // Tri
    // const TEXTURE_TRI = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));
    // const MATERIAL_TRI = new MaterialLambertian(TEXTURE_TRI);

    // this.addTriangle(
    //   vec3.fromValues(0.0, 0.0, 0.0),
    //   vec3.fromValues(0.0, 2.0, 0.0),
    //   vec3.fromValues(2.0, 0.0, 0.0),
    //   MATERIAL_TRI
    // );

    // this.addTriangle(
    //   vec3.fromValues(0.0, 0.0, 0.0),
    //   vec3.fromValues(2.0, 0.0, 0.0),
    //   vec3.fromValues(0.0, 2.0, 0.0),
    //   MATERIAL_TRI
    // );

    // Light
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(25.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(0.0, 0.0, 3.8);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.0, 0.0, 0.0);
  }
}
