import HitableSphere from "../Hit/HitableSphere";
import { vec3 } from "gl-matrix";

export default class Scene {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;
    this.animationFrameMax = 0;
    this.HITABLES = [];
  }

  // ____________________________________________________________________ Sphere

  addSphere(position, radius, material) {
    let sphere = new HitableSphere(position, radius, material);

    this.HITABLES.push(sphere);

    return sphere;
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;
  }

  getAnimationFrameMax() {
    return this.animationFrameMax;
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.5, 0.5, 0.5);
  }
}
