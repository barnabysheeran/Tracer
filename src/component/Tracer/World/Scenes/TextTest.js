import { vec3 } from "gl-matrix";

import Scene from "../Scene";

import TextureImage from "../../Texture/TextureImage";
import TextureConstant from "../../Texture/TextureConstant";

import MaterialDielectric from "../../Material/MaterialDielectric";
import MaterialMetal from "../../Material/MaterialMetal";
import MaterialLightDiffuse from "../../Material/MaterialLightDiffuse";

import EnvironmentSpherical from "../../Environment/EnvironmentSpherical";
import MaterialLambertian from "../../Material/MaterialLambertian";
import ColourRGBA from "../../Colour/ColourRGBA";

export default class TextTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Define text
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Text Hello
    const TEXTURE_HELLO = new TextureImage(
      this.getTextureImageDimensions(4),
      this.getTextureImageData(4)
    );

    const MATERIAL_HELLO = new MaterialLambertian(TEXTURE_HELLO);

    const TEXT_HELLO = this.addText(
      this.getTextureImageDimensions(4)[0] * 0.01,
      this.getTextureImageDimensions(4)[1] * 0.01,
      MATERIAL_HELLO
    );

    TEXT_HELLO.setRotationEuler(0.0, 80.0, 0.0);
    TEXT_HELLO.setPosition(0.2, 1.2, 0.0);

    // const MATERIAL_HELLO = new MaterialLightDiffuse(TEXTURE_HELLO);

    // const PLANE_HELLO = this.addPlane(
    //   this.getTextureImageDimensions(4)[0] * 0.01,
    //   this.getTextureImageDimensions(4)[1] * 0.01,
    //   MATERIAL_HELLO
    // );
    // PLANE_HELLO.setRotationEuler(0.0, 80.0, 0.0);
    // PLANE_HELLO.setPosition(0.2, 1.2, 0.0);

    // // Text World
    // const TEXTURE_WORLD = new TextureImage(
    //   this.getTextureImageDimensions(4),
    //   this.getTextureImageData(4)
    // );

    // const MATERIAL_WORLD = new MaterialLambertian(TEXTURE_WORLD);

    // const PLANE_WORLD = this.addPlane(
    //   this.getTextureImageDimensions(4)[0] * 0.005,
    //   this.getTextureImageDimensions(4)[1] * 0.005,
    //   MATERIAL_WORLD
    // );
    // PLANE_WORLD.setRotationEuler(0.0, 100.0, 0.0);
    // PLANE_WORLD.setPosition(0.2, 0.8, 0.0);

    // Dialectic
    this.addSphere(
      vec3.fromValues(-1.0, 1.0, 1.0),
      1.0,
      new MaterialDielectric(1.5)
    );

    // Red
    this.addSphere(
      vec3.fromValues(-1.0, 1.0, 1.0),
      0.8,
      new MaterialMetal(
        new TextureConstant(new ColourRGBA(1.0, 0.0, 0.0, 1.0)),
        0.0
      )
    );

    // Floor and walls
    const TEXTURE_FLOOR = new TextureConstant(
      new ColourRGBA(0.8, 0.8, 0.8, 1.0)
    );
    const MATERIAL_FLOOR = new MaterialMetal(TEXTURE_FLOOR, 0.1);

    const BOX_SIZE = 8;
    const BOX_SIZE_HALF = BOX_SIZE * 0.5;

    // Wall A
    const WALL_A = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_FLOOR);
    WALL_A.setRotationEuler(0.0, 90.0, 0.0);
    WALL_A.setPosition(-BOX_SIZE_HALF, BOX_SIZE_HALF, 0.0);

    // Wall B
    const WALL_B = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_FLOOR);
    WALL_B.setRotationEuler(0.0, 180.0, 0.0);
    WALL_B.setPosition(0.0, BOX_SIZE_HALF, BOX_SIZE_HALF);

    // Floor
    const FLOOR = this.addPlane(BOX_SIZE, BOX_SIZE, MATERIAL_FLOOR);
    FLOOR.setRotationEuler(-90.0, 90.0, 0.0);

    // Environment
    const ENVIRONMENT_TEXTURE = new TextureImage(
      this.getTextureImageDimensions(3),
      this.getTextureImageData(3)
    );

    this.ENVIRONMENT = new EnvironmentSpherical(ENVIRONMENT_TEXTURE);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(45.0);
    CAMERA_CONTROLLER.setAperture(0.05);

    CAMERA_CONTROLLER.setPosition(3.0, 1.2, -3.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.9, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    // // Flip texture X
    // let reversed = vec3.fromValues(
    //   rayDirectionNormalized[0],
    //   rayDirectionNormalized[1],
    //   -rayDirectionNormalized[2]
    // );

    // return this.ENVIRONMENT.getColour(reversed);

    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    // return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
    return new ColourRGBA(
      white + 0.5 * t,
      white + 0.7 * t,
      white + 1.0 * t,
      1.0
    );
  }
}
