import HitRecord from "../Hit/HitRecord";
import HitableSphere from "../Hit/HitableSphere";

import SceneTest from "./SceneTest";
import ScenePyramid from "./ScenePyramid";
import SceneAnimationTest from "./SceneAnimationTest";

export default class World {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;

    this.SCENE_TEST = new SceneTest(cameraController);
    this.SCENE_ANIMATION_TEST = new SceneAnimationTest(cameraController);
    this.SCENE_PYRAMID = new ScenePyramid(cameraController);

    // Default
    this.scene;
    this.setScene(0);
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    this.clear();

    switch (sceneId) {
      case 0:
        this.scene = this.SCENE_TEST;
        break;
      case 1:
        this.scene = this.SCENE_ANIMATION_TEST;
        break;
      case 2:
        this.scene = this.SCENE_PYRAMID;
        break;
    }
  }

  // _________________________________________________________________ Animation

  setAnimationFrame(frame) {
    this.scene.setAnimationFrame(frame);
  }

  getAnimationFrameTotal() {
    return this.scene.getAnimationFrameTotal();
  }

  // _____________________________________________________________________ Clear

  clear() {
    this.HITABLES = [];
  }

  // ____________________________________________________________________ Sphere

  addSphere(position, radius, material) {
    this.HITABLES.push(new HitableSphere(position, radius, material));
  }

  // _______________________________________________________________________ Hit

  didHitAnything(ray, tMin, tMax, hitRecord) {
    const HITABLES = this.scene.HITABLES;

    let hitRecordTemp = new HitRecord();

    let hit = false;
    let closest = tMax;
    let i;

    for (i = 0; i < HITABLES.length; i++) {
      if (HITABLES[i].didHit(ray, tMin, closest, hitRecordTemp) == true) {
        hit = true;
        closest = hitRecordTemp.t;
        hitRecordTemp.cloneThisInto(hitRecord);
      }
    }

    return hit;
  }
}
