import { vec3 } from "gl-matrix";

import Scene from "../Scene";

import TextureImage from "../../Texture/TextureImage";
import TextureConstant from "../../Texture/TextureConstant";

import MaterialMetal from "../../Material/MaterialMetal";
import MaterialDielectric from "../../Material/MaterialDielectric";

import EnvironmentSpherical from "../../Environment/EnvironmentSpherical";

export default class SceneExampleB extends Scene {
  constructor(cameraController) {
    super(cameraController);
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Materials
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(0.9, 0.9, 0.9));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.001);
    const MATERIAL_FLOOR = new MaterialMetal(TEXTURE_METAL, 0.02);

    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);

    // Mesh
    const CELLS = this.getMeshCells(0);
    const POSITIONS = this.getMeshPositions(0);
    const SCALAR = 2.0;

    let i;
    let p0;
    let p1;
    let p2;

    for (i = 0; i < CELLS.length; i++) {
      p0 = POSITIONS[CELLS[i][0]];
      p1 = POSITIONS[CELLS[i][1]];
      p2 = POSITIONS[CELLS[i][2]];

      this.addTriangle(
        vec3.fromValues(p0[0] * SCALAR, p0[1] * SCALAR, p0[2] * SCALAR),
        vec3.fromValues(p1[0] * SCALAR, p1[1] * SCALAR, p1[2] * SCALAR),
        vec3.fromValues(p2[0] * SCALAR, p2[1] * SCALAR, p2[2] * SCALAR),
        MATERIAL_METAL
      );
    }

    // Spheres
    let total = 27;
    let progressIntervalTau = (Math.PI * 2) / total;
    let radius = 120.0;

    for (i = 0; i < total; i++) {
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressIntervalTau * i) * radius,
          10.01,
          Math.cos(progressIntervalTau * i) * radius
        ),
        10,
        MATERIAL_DIELECTRIC
      );

      this.addSphere(
        vec3.fromValues(
          Math.sin(progressIntervalTau * i) * radius,
          10.01,
          Math.cos(progressIntervalTau * i) * radius
        ),
        -8,
        MATERIAL_DIELECTRIC
      );
    }

    // Large Sphere
    this.addSphere(
      vec3.fromValues(200.0, 240.0, 0.0),
      200,
      MATERIAL_DIELECTRIC
    );

    this.addSphere(
      vec3.fromValues(200.0, 240.0, 0.0),
      -195,
      MATERIAL_DIELECTRIC
    );

    // Floor and walls
    const BOX_SIZE = 500;

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

    CAMERA_CONTROLLER.setFov(60.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    const ROTATION = Math.PI * 2 * -0.48;
    const RADIUS = 300.0;

    CAMERA_CONTROLLER.setPosition(
      Math.cos(ROTATION) * RADIUS,
      30.0,
      Math.sin(ROTATION) * RADIUS
    );

    CAMERA_CONTROLLER.setPositionTarget(0.0, 120.0, 0.0);
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
