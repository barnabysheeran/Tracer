import HitableSphere from "../Hit/HitableSphere";

export default class Scene {
  constructor(cameraController, animationFrameTotal) {
    this.CAMERA_CONTROLLER = cameraController;
    this.ANIMATION_FRAME_TOTAL = animationFrameTotal;
    this.HITABLES = [];
  }

  // ____________________________________________________________________ Sphere

  addSphere(position, radius, material) {
    this.HITABLES.push(new HitableSphere(position, radius, material));
  }

  // _________________________________________________________________ Animation

  getAnimationFrameTotal() {
    return this.ANIMATION_FRAME_TOTAL;
  }
}
