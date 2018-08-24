import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureImage from "../Texture/TextureImage";

import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialMetal from "../Material/MaterialMetal";

export default class SceneTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    // Old
    this.HITABLES = [];

    let WIDTH_HALF = 0.5;
    let HEIGHT_HALF = 0.5;
    let DEPTH = 0.0;

    // Material
    const TEXTURE_WHITE = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));
    const MATERIAL_WHITE = new MaterialLambertian(TEXTURE_WHITE);

    const TEXTURE_IMAGE = new TextureImage(
      this.getTextureImageDimensions(2),
      this.getTextureImageData(2)
    );
    const MATERIAL_IMAGE = new MaterialLambertian(TEXTURE_IMAGE);

    // 0
    // this.addTriangle(
    //   vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(-WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   MATERIAL_IMAGE
    // );

    // this.addTriangle(
    //   vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   MATERIAL_IMAGE
    // );

    // 1
    DEPTH = 1;

    // this.addTriangle(
    //   vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(-WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   MATERIAL_IMAGE
    // );

    // this.addTriangle(
    //   vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   MATERIAL_IMAGE
    // );

    // 2
    DEPTH = 2;

    // this.addTriangle(
    //   vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(-WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   MATERIAL_IMAGE
    // );

    // this.addTriangle(
    //   vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(WIDTH_HALF, HEIGHT_HALF, DEPTH),
    //   vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, DEPTH),
    //   MATERIAL_IMAGE
    // );

    // Sphere Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(4.0, 4.0, 4.0));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.0);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 100, MATERIAL_METAL);
    this.addSphere(vec3.fromValues(0.0, 0.0, 120.0), 100, MATERIAL_METAL);
    this.addSphere(vec3.fromValues(0.0, 0.0, 240.0), 100, MATERIAL_METAL);

    // 'Floor'
    // const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));

    // this.addSphere(
    //   vec3.fromValues(0.0, -100.5, -1.0),
    //   100,
    //   new MaterialMetal(TEXTURE_FLOOR, 0.5)
    // );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(40.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(0.0, 0.0, -800);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
