import { vec3 } from "gl-matrix";

import Scene from "../Scene";

import TextureImage from "../../Texture/TextureImage";
import TextureConstant from "../../Texture/TextureConstant";

import MaterialDielectric from "../../Material/MaterialDielectric";
import MaterialMetal from "../../Material/MaterialMetal";
import MaterialLightDiffuse from "../../Material/MaterialLightDiffuse";

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

    const TEXTURE_VOLUME_A = new TextureConstant(
      vec3.fromValues(1.0, 1.0, 0.0)
    );
    const TEXTURE_VOLUME_B = new TextureConstant(
      vec3.fromValues(0.0, 1.0, 1.0)
    );
    const TEXTURE_VOLUME_C = new TextureConstant(
      vec3.fromValues(1.0, 0.0, 1.0)
    );

    // A
    this.addSphere(vec3.fromValues(0.0, 0.5, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.5, 0.0), -0.45, MATERIAL_DIELECTRIC);

    this.addVolumeSphere(
      vec3.fromValues(0.0, 0.5, 0.0),
      0.25,
      TEXTURE_VOLUME_A,
      0.2
    );

    // B
    this.addSphere(vec3.fromValues(-1.05, 0.5, 0.0), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(
      vec3.fromValues(-1.05, 0.5, 0.0),
      -0.45,
      MATERIAL_DIELECTRIC
    );

    this.addVolumeSphere(
      vec3.fromValues(-1.05, 0.5, 0.0),
      0.25,
      TEXTURE_VOLUME_B,
      0.2
    );

    // C
    this.addSphere(vec3.fromValues(0.0, 0.5, 1.05), 0.5, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.5, 1.05), -0.45, MATERIAL_DIELECTRIC);

    this.addVolumeSphere(
      vec3.fromValues(0.0, 0.5, 1.05),
      0.25,
      TEXTURE_VOLUME_C,
      0.2
    );

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
    let scalarLight = 1.0;

    total = 29;

    let progressInterval = 1.0 / total;
    let progress;

    let materialLight = new MaterialLightDiffuse(
      new TextureConstant(
        vec3.fromValues(scalarLight, scalarLight, scalarLight)
      )
    );

    for (let i = 0; i < total; i++) {
      progress = progressInterval * i;
      radius = 3.0 * progress;

      // Sphere
      this.addSphere(
        vec3.fromValues(
          Math.sin(progress * 3.0 * Math.PI) * radius,
          1.8 + 1.0 * progress,
          Math.cos(progress * 3.0 * Math.PI) * radius
        ),
        0.02 + 0.1 * progress,
        materialLight
      );
    }

    // this.addSphere(
    //   vec3.fromValues(-4.5, 5.0, -10.0),
    //   1.0,
    //   new MaterialLightDiffuse(
    //     new TextureConstant(
    //       vec3.fromValues(SCALAR_LIGHT, SCALAR_LIGHT, SCALAR_LIGHT)
    //     )
    //   )
    // );

    // this.addSphere(
    //   vec3.fromValues(0.0, 5.0, -10.0),
    //   1.0,
    //   new MaterialLightDiffuse(
    //     new TextureConstant(
    //       vec3.fromValues(SCALAR_LIGHT, SCALAR_LIGHT, SCALAR_LIGHT)
    //     )
    //   )
    // );

    // this.addSphere(
    //   vec3.fromValues(4.5, 5.0, -10.0),
    //   1.0,
    //   new MaterialLightDiffuse(
    //     new TextureConstant(
    //       vec3.fromValues(SCALAR_LIGHT, SCALAR_LIGHT, SCALAR_LIGHT)
    //     )
    //   )
    // );

    // Floor and walls
    const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));
    const MATERIAL_FLOOR = new MaterialMetal(TEXTURE_FLOOR, 0.1);

    const BOX_SIZE = 4;
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
      this.getTextureImageDimensions(2),
      this.getTextureImageData(2)
    );

    this.ENVIRONMENT = new EnvironmentSpherical(ENVIRONMENT_TEXTURE);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(28.0);
    CAMERA_CONTROLLER.setAperture(0.05);

    CAMERA_CONTROLLER.setPosition(3.0, 1.2, -3.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.7, 0.0);
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
