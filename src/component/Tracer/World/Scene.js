import HitableSphere from "../Hit/HitableSphere";
import { vec3 } from "gl-matrix";

export default class Scene {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;
    this.ANIMATION_FRAME_TOTAL = 1;
    this.HITABLES = [];
  }

  // ____________________________________________________________________ Sphere

  addSphere(position, radius, material) {
    this.HITABLES.push(new HitableSphere(position, radius, material));
  }

  // _________________________________________________________________ Animation

  setAnimationFrame(frame) {
    frame;
  }

  getAnimationFrameTotal() {
    return this.ANIMATION_FRAME_TOTAL;
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.5, 0.5, 0.5);
  }
}
