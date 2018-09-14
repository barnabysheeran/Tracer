import { vec3 } from "gl-matrix";

import Scene from "./Scene";
//import SceneHelper from "./SceneHelper";

import TextureImage from "../Texture/TextureImage";
import TextureConstant from "../Texture/TextureConstant";

import MaterialMetal from "../Material/MaterialMetal";
//import MaterialDialectric from "../Material/MaterialDielectric";
//import MaterialLambertian from "../Material/MaterialLambertian";

import EnvironmentSpherical from "./../Environment/EnvironmentSpherical";
//import HitableSphere from "./../Hit/HitableSphere";
//import HitableConstantMedium from "./../Hit/HitableConstantMedium";

export default class SceneTestBox extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Helper
    //new SceneHelper(this, 5.0, 0.2);

    // Material Glass
    // const MATERIAL_DIELECTRIC = new MaterialDialectric(1.5);

    // Material Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(0.5, 0.5, 0.5));

    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.0);

    // Box positions
    this.POSITIONS = [];
    this.BOXES = [];

    const ROW = 5;
    const TOTAL = ROW * ROW * ROW;
    const SPACING = 10;
    const OFFSET = -(SPACING * (ROW * 0.5) - SPACING * 0.5);
    const SIZE = 8;

    let box;
    let position;
    let x = 0;
    let y = 0;
    let z = 0;
    let i;

    for (i = 0; i < TOTAL; i++) {
      box = this.addBox(SIZE, SIZE, SIZE, MATERIAL_METAL);

      position = vec3.fromValues(
        OFFSET + x * SPACING,
        OFFSET + y * SPACING,
        OFFSET + z * SPACING
      );

      box.setPosition(position);

      this.POSITIONS.push(position);
      this.BOXES.push(box);

      // Next
      x++;

      if (x >= ROW) {
        x = 0;
        y++;
        if (y >= ROW) {
          y = 0;
          z++;
          if (z >= ROW) {
            z = 0;
          }
        }
      }
    }

    // Environemt Fog
    // let TEXTURE_FOG = new TextureConstant(vec3.fromValues(0.0, 0.0, 0.0));

    // let SPHERE_FOG = new HitableSphere(
    //   vec3.fromValues(0.0, 0.0, 0.0),
    //   500,
    //   null
    // );

    // this.HITABLES.push(
    //   new HitableConstantMedium(SPHERE_FOG, 0.0005, TEXTURE_FOG)
    // );

    // Environment Image
    const ENVIRONMENT_TEXTURE = new TextureImage(
      this.getTextureImageDimensions(5),
      this.getTextureImageData(5)
    );

    this.ENVIRONMENT = new EnvironmentSpherical(ENVIRONMENT_TEXTURE);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;
    // Box
    // let rotation = quat.create();
    // quat.fromEuler(rotation, time * 360.0, time * 360.0, time * 360.0);
    // this.BOX.setRotation(rotation);

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
