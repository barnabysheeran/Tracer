import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureChecker from "../Texture/TextureChecker";
import TextureSimplex from "../Texture/TextureSimplex";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialMetal";
import MaterialLambertian from "../Material/MaterialLambertian";
//import TextureImage from "../Texture/TextureImage";

export default class SceneImageTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Marble
    const TEXTURE_SIMPLEX = new TextureSimplex(0.7);
    const MATERIAL_SIMPLEX = new MaterialLambertian(TEXTURE_SIMPLEX);

    this.addSphere(vec3.fromValues(-1.08, 0.0, 0.0), 0.5, MATERIAL_SIMPLEX);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_SIMPLEX);
    this.addSphere(vec3.fromValues(1.08, 0.0, 0.0), 0.5, MATERIAL_SIMPLEX);

    // Image
    // const TEXTURE_IMAGE = new TextureImage(
    //   "https://www.nasa.gov/centers/goddard/images/content/312043main_skyview_pop_car.jpg"
    // );
    // const MATERIAL_IMAGE = new MaterialLambertian(TEXTURE_SIMPLEX);

    // Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(0.8, 0.1, 0.1));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.2);
    this.addSphere(vec3.fromValues(0.0, 0.0, 1.08), 0.1, MATERIAL_METAL);

    // Dielectric
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, -1.08), 0.1, MATERIAL_DIELECTRIC);

    // Floor
    const TEXTURE_CHECKER_BLACK = new TextureConstant(
      vec3.fromValues(0.0, 0.0, 0.0)
    );
    const TEXTURE_CHECKER_WHITE = new TextureConstant(
      vec3.fromValues(1.0, 1.0, 1.0)
    );

    const TEXTURE_CHECKER = new TextureChecker(
      TEXTURE_CHECKER_BLACK,
      TEXTURE_CHECKER_WHITE,
      20.0
    );

    const MATERIAL_CHECKER = new MaterialLambertian(TEXTURE_CHECKER);

    this.addSphere(vec3.fromValues(0.0, -100.5, -1.0), 100, MATERIAL_CHECKER);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(18.0);
    CAMERA_CONTROLLER.setAperture(0.2);

    CAMERA_CONTROLLER.setPosition(3.0, 3.0, 2.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, -0.15, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
