import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import MeshHelper from "../Library/MeshHelper";

import TextureConstant from "../Texture/TextureConstant";
import MaterialMetal from "../Material/MaterialMetal";

export default class SceneBunny extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // 'Floor'
    const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));

    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      new MaterialMetal(TEXTURE_FLOOR, 0.5)
    );
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Mesh
    const MESH_HELPER = new MeshHelper(this.getMeshAsset(0));

    // Test sphere
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(1.0, 0.0, 0.0));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.0);

    this.addSphere(vec3.fromValues(0.0, 0.0, 0.0), 20, MATERIAL_METAL);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(22.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    CAMERA_CONTROLLER.setPosition(75.0, 75.0, 75.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
