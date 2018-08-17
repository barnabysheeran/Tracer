import HitRecord from "../Hit/HitRecord";
import HitableSphere from "../Hit/HitableSphere";

import SceneTest from "./SceneTest";
import SceneAnimationTest from "./SceneAnimationTest";
import SceneMarbleTest from "./SceneMarbleTest";
import SceneImageTest from "./SceneImageTest";

export default class World {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;

    this.SCENE_TEST = new SceneTest(cameraController);
    this.SCENE_ANIMATION_TEST = new SceneAnimationTest(cameraController);
    this.SCENE_MARBLE_TEST = new SceneMarbleTest(cameraController);
    this.SCENE_IMAGE_TEST = new SceneImageTest(cameraController);

    // Default
    this.scene;
    this.setScene(0);
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    switch (sceneId) {
      case 0:
        this.scene = this.SCENE_TEST;
        break;
      case 1:
        this.scene = this.SCENE_ANIMATION_TEST;
        break;
      case 2:
        this.scene = this.SCENE_MARBLE_TEST;
        break;
      case 3:
        this.scene = this.SCENE_IMAGE_TEST;
        break;
    }
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    this.scene.setAnimationTime(time);
  }

  getAnimationFrameMax() {
    return this.scene.getAnimationFrameMax();
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    return this.scene.getBackground(rayDirectionNormalized);
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
