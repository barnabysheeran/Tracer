import { vec3 } from "gl-matrix";

import Scene from "./Scene";
//import SceneHelper from "./SceneHelper";

//import TextureImage from "../Texture/TextureImage";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";

//import MaterialIsotropic from "../Material/MaterialIsotropic";
import TextureConstant from "../Texture/TextureConstant";
import HitableConstantMedium from "../Hit/HitableConstantMedium";
//import MaterialLambertian from "../Material/MaterialLambertian";
import HitableSphere from "../Hit/HitableSphere";
//import TextureConstant from "../Texture/TextureConstant";
//import MaterialLambertian from "../Material/MaterialLambertian";

import { HSVtoRGB } from "../Util/colour";

export default class SceneSubsurface extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    //Math.seedrandom("thread");

    // Helper
    // new SceneHelper(this, 5.0, 0.2);

    // Volume
    // const TEXTURE_SPHERE = new TextureConstant(vec3.fromValues(0.0, 0.0, 0.0));

    // const SPHERE = new HitableSphere(vec3.fromValues(0.0, 5.01, 0.0), 1.0);

    // this.HITABLES.push(new HitableConstantMedium(SPHERE, 1.0, TEXTURE_SPHERE));

    // Volumes
    const TOTAL = 7;
    const RADIUS_MIN = 2.0;
    const RADIUS_INCREMENT = (5.0 - RADIUS_MIN) / TOTAL;

    const PROGRESS_INTERVAL = 1.0 / TOTAL;

    const DENSITY_MIN = 0.01;
    const DENSITY_MAX = 0.15;
    const DENSITY_INTERVAL = (DENSITY_MAX - DENSITY_MIN) / TOTAL;

    let colour;
    let texture;
    let sphere;

    let i;

    for (i = 0; i < TOTAL; i++) {
      colour = HSVtoRGB(PROGRESS_INTERVAL * i, 0.8, 0.8);

      texture = new TextureConstant(
        vec3.fromValues(colour.r, colour.g, colour.b)
      );

      sphere = new HitableSphere(
        vec3.fromValues(0.0, 5.01, 0.0),
        RADIUS_MIN + RADIUS_INCREMENT * i
      );

      this.HITABLES.push(
        new HitableConstantMedium(
          sphere,
          DENSITY_MAX - DENSITY_INTERVAL * i,
          texture
        )
      );
    }

    // Dielectric
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    this.addSphere(vec3.fromValues(10.02, 5.01, 0.0), 5.0, MATERIAL_DIELECTRIC);
    this.addSphere(
      vec3.fromValues(10.02, 5.01, 0.0),
      -4.5,
      MATERIAL_DIELECTRIC
    );

    this.addSphere(vec3.fromValues(0.0, 5.01, 10.02), 5.0, MATERIAL_DIELECTRIC);
    this.addSphere(
      vec3.fromValues(0.0, 5.01, 10.02),
      -4.5,
      MATERIAL_DIELECTRIC
    );

    // Environment reflections
    // const TEXTURE_REFLECTION_BLOCK = new TextureConstant(1.0, 1.0, 1.0);

    // const MATERIAL_REFLECTION_BLOCK = new MaterialLambertian(
    //   TEXTURE_REFLECTION_BLOCK
    // );

    // const REFLECTION_BLOCK_HEIGHT = 1.0;
    // const REFLECTION_BLOCK_WIDTH = 1.0;
    // const REFLECTION_BLOCK_MARGIN = 0.2;

    // const BLOCK_TOTAL = 3;

    // const P0 = vec3.fromValues(0.0, 0.0, 0.0);
    // const P1 = vec3.fromValues(0.0, 0.0, 0.0);
    // const P2 = vec3.fromValues(0.0, 0.0, 0.0);
    // const P3 = vec3.fromValues(0.0, 0.0, 0.0);

    // let i;
    // let offsetZ;

    // for (i = 0; i < BLOCK_TOTAL; i++) {
    //   offsetZ = i * (REFLECTION_BLOCK_WIDTH + REFLECTION_BLOCK_MARGIN);

    //   this.addPlane(
    //     vec3.fromValues(P0[0], P0[1], P0[2] + offsetZ),
    //     vec3.fromValues(P1[0], P1[1], P1[2] + offsetZ),
    //     vec3.fromValues(P2[0], P2[1], P2[2] + offsetZ),
    //     vec3.fromValues(P3[0], P3[1], P3[2] + offsetZ),
    //     MATERIAL_REFLECTION_BLOCK
    //   );
    // }

    // Floor Plane
    // const TEXTURE_FLOOR = new TextureImage(
    //   this.getTextureImageDimensions(3),
    //   this.getTextureImageData(3)
    // );

    const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(1.0, 1.0, 1.0));

    const MATERIAL_FLOOR = new MaterialMetal(TEXTURE_FLOOR, 0.1);

    const DIMENSIONS_FLOOR = 8.0;
    const DIMENSIONS_FLOOR_HALF = DIMENSIONS_FLOOR * 0.5;

    const OFFSET_FLOOR_Y = 0.0;

    this.addPlane(
      vec3.fromValues(
        DIMENSIONS_FLOOR_HALF,
        OFFSET_FLOOR_Y,
        -DIMENSIONS_FLOOR_HALF
      ),
      vec3.fromValues(
        -DIMENSIONS_FLOOR_HALF,
        OFFSET_FLOOR_Y,
        -DIMENSIONS_FLOOR_HALF
      ),
      vec3.fromValues(
        -DIMENSIONS_FLOOR_HALF,
        OFFSET_FLOOR_Y,
        DIMENSIONS_FLOOR_HALF
      ),
      vec3.fromValues(
        DIMENSIONS_FLOOR_HALF,
        OFFSET_FLOOR_Y,
        DIMENSIONS_FLOOR_HALF
      ),
      MATERIAL_FLOOR
    );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(17.0);
    CAMERA_CONTROLLER.setAperture(0.2);

    CAMERA_CONTROLLER.setPosition(-30.0, 30.0, -30.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 5.3, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
