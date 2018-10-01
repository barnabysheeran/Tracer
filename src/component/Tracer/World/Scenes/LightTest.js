import { vec3 } from "gl-matrix";

import Scene from "../Scene";

import TextureSimplex from "../../Texture/TextureSimplex";
import TextureImage from "../../Texture/TextureImage";
import TextureConstant from "../../Texture/TextureConstant";

//import MaterialDielectric from "../../Material/MaterialDielectric";
import MaterialLightDiffuse from "../../Material/MaterialLightDiffuse";
import MaterialLambertian from "../../Material/MaterialLambertian";

import EnvironmentSpherical from "../../Environment/EnvironmentSpherical";

export default class SceneLightTest extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // // Dialectic
    // const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    // // A
    // this.addSphere(vec3.fromValues(0.0, 0.5, 0.0), 50, MATERIAL_DIELECTRIC);
    // this.addSphere(vec3.fromValues(0.0, 0.5, 0.0), -48, MATERIAL_DIELECTRIC);

    // Marble
    const TEXTURE_SIMPLEX = new TextureSimplex(0.5);
    const MATERIAL_SIMPLEX = new MaterialLambertian(TEXTURE_SIMPLEX);

    this.addSphere(vec3.fromValues(0.0, -500.0, 0.0), 500.0, MATERIAL_SIMPLEX);

    // Light
    const SCALAR_LIGHT = 10000.0;

    this.addSphere(
      vec3.fromValues(0.0, 15.0, 0.0),
      10.0,
      new MaterialLightDiffuse(
        new TextureConstant(
          vec3.fromValues(SCALAR_LIGHT, SCALAR_LIGHT, SCALAR_LIGHT)
        )
      )
    );

    // Environment
    const ENVIRONMENT_TEXTURE = new TextureImage(
      this.getTextureImageDimensions(0),
      this.getTextureImageData(0)
    );

    this.ENVIRONMENT = new EnvironmentSpherical(ENVIRONMENT_TEXTURE);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(10.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(20.0, 20.0, 200.0);
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
