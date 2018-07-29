import HitableSphere from "../Hit/HitableSphere";

export default class Scene {
  constructor(animationFrameTotal) {
    this.ANIMATION_FRAME_TOTAL = animationFrameTotal;
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
}
