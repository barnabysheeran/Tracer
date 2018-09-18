import { vec3 } from "gl-matrix";

import Scene from "../Scene";

import TextureImage from "../../Texture/TextureImage";
import TextureConstant from "../../Texture/TextureConstant";

import MaterialDielectric from "../../Material/MaterialDielectric";
import MaterialMetal from "../../Material/MaterialMetal";
import MaterialLightDiffuse from "../../Material/MaterialLightDiffuse";
import MaterialLambertian from "../../Material/MaterialLambertian";

import EnvironmentSpherical from "../../Environment/EnvironmentSpherical";

export default class SceneExampleA extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Helper
    //this.addSceneHelper(100, 10);

    // Dialectic
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    // A
    this.addSphere(vec3.fromValues(0.0, 0.5, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.5, 0.0), -0.48, MATERIAL_DIELECTRIC);

    // B
    this.addSphere(vec3.fromValues(-1.05, 0.5, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(
      vec3.fromValues(-1.05, 0.5, 0.0),
      -0.48,
      MATERIAL_DIELECTRIC
    );

    // C
    this.addSphere(vec3.fromValues(0.0, 0.5, 1.05), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.5, 1.05), -0.48, MATERIAL_DIELECTRIC);

    // Metal
    let total = 13;
    let progressIntervalTau = (Math.PI * 2) / total;

    let radius = 0.5;
    let texture = new TextureConstant(vec3.fromValues(0.95, 0.95, 0.95));
    let material = new MaterialMetal(texture, 0.1);

    for (let i = 0; i < total; i++) {
      // Sphere
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressIntervalTau * i) * radius,
          0.1,
          Math.cos(progressIntervalTau * i) * radius
        ),
        0.1,
        material
      );
    }

    // Lights
    const SCALAR_LIGHT = 10.0;

    this.addSphere(
      vec3.fromValues(-4.5, 5.0, -10.0),
      1.0,
      new MaterialLightDiffuse(
        new TextureConstant(
          vec3.fromValues(SCALAR_LIGHT, SCALAR_LIGHT, SCALAR_LIGHT)
        )
      )
    );

    this.addSphere(
      vec3.fromValues(0.0, 5.0, -10.0),
      1.0,
      new MaterialLightDiffuse(
        new TextureConstant(
          vec3.fromValues(SCALAR_LIGHT, SCALAR_LIGHT, SCALAR_LIGHT)
        )
      )
    );

    this.addSphere(
      vec3.fromValues(4.5, 5.0, -10.0),
      1.0,
      new MaterialLightDiffuse(
        new TextureConstant(
          vec3.fromValues(SCALAR_LIGHT, SCALAR_LIGHT, SCALAR_LIGHT)
        )
      )
    );

    // Texture Image
    const TEXTURE_TEST_A = new TextureImage(
      this.getTextureImageDimensions(0),
      this.getTextureImageData(0)
    );

    const MATERIAL_IMAGE_A = new MaterialLambertian(TEXTURE_TEST_A, 0.0);

    // Floor and walls
    const TEXTURE_WALL = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));
    const MATERIAL_WALL = new MaterialMetal(TEXTURE_WALL, 0.5);

    const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));
    const MATERIAL_FLOOR = new MaterialMetal(TEXTURE_FLOOR, 0.5);

    // Wall A
    const WALL_A = this.addPlane(6, 6, MATERIAL_WALL);
    WALL_A.setRotationEuler(0.0, 90.0, 0.0);
    WALL_A.setPosition(-3.0, 3.0, 0.0);

    // Wall B
    const WALL_B = this.addPlane(6, 6, MATERIAL_IMAGE_A);
    WALL_B.setRotationEuler(0.0, 180.0, 0.0);
    WALL_B.setPosition(0.0, 3.0, 3.0);

    // Floor
    const FLOOR = this.addPlane(6, 6, MATERIAL_FLOOR);
    FLOOR.setRotationEuler(-90.0, 90.0, 0.0);

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

    CAMERA_CONTROLLER.setFov(28.0);
    CAMERA_CONTROLLER.setAperture(0.0);

    CAMERA_CONTROLLER.setPosition(3.0, 3.0, -3.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.6, 0.0);
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
