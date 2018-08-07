import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureChecker from "../Texture/TextureChecker";
import TextureSimplex from "../Texture/TextureSimplex";
import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialMetal from "../Material/MaterialLambertian";
import MaterialLambertian from "../Material/MaterialLambertian";

import { HSVtoRGB } from "../Util/util";

export default class SceneTextureTest extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Dialectric
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.55, MATERIAL_DIELECTRIC);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), -0.51, MATERIAL_DIELECTRIC);

    // Simplex
    const TEXTURE_SIMPLEX = new TextureSimplex(20.0);
    const MATERIAL_SIMPLEX = new MaterialMetal(TEXTURE_SIMPLEX, 0.01);
    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 0.5, MATERIAL_SIMPLEX);

    // Dialectric surround
    let total = 13;
    let progressIntervalTau = (Math.PI * 2) / total;

    let radius = 0.5;

    for (let i = 0; i < total; i++) {
      // Sphere
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressIntervalTau * i) * radius,
          -0.39,
          Math.cos(progressIntervalTau * i) * radius
        ),
        0.1,
        MATERIAL_DIELECTRIC
      );

      this.addSphere(
        vec3.fromValues(
          Math.sin(progressIntervalTau * i) * radius,
          -0.39,
          Math.cos(progressIntervalTau * i) * radius
        ),
        0.09,
        MATERIAL_DIELECTRIC
      );
    }

    // Coloured surround
    total = 32;
    progressIntervalTau = (Math.PI * 2) / total;

    let ringTotal = 10.0;
    let progressInterval = 1.0 / ringTotal;
    let rotationOffset = 0.0;

    let colour;
    let texture;
    let material;
    let rotation;

    radius = 0.66;

    for (let j = 0; j < ringTotal; j++) {
      // Material
      colour = HSVtoRGB(1.0 - progressInterval * j, 0.9, 0.9);

      texture = new TextureConstant(
        vec3.fromValues(colour.r, colour.g, colour.b)
      );

      material = new MaterialMetal(texture, 0.1);

      // Spheres
      for (let i = 0; i < total; i++) {
        rotation = progressIntervalTau * i + rotationOffset;

        this.addSphere(
          vec3.fromValues(
            Math.sin(rotation) * radius,
            -0.45,
            Math.cos(rotation) * radius
          ),
          0.05,
          material
        );
      }

      // Next
      rotationOffset += progressInterval * 0.5;
      radius += 0.12;
    }

    // 'Floor'
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
    CAMERA_CONTROLLER.setAperture(0.5);

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
