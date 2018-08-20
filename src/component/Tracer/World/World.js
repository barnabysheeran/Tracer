import HitRecord from "../Hit/HitRecord";

import SceneTest from "./SceneTest";
import SceneAnimationTest from "./SceneAnimationTest";
import SceneMarbleTest from "./SceneMarbleTest";
import SceneImageTest from "./SceneImageTest";
import SceneLightTest from "./SceneLightTest";

export default class World {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;

    this.SCENES = [
      new SceneTest(cameraController),
      new SceneAnimationTest(cameraController),
      new SceneMarbleTest(cameraController),
      new SceneImageTest(cameraController),
      new SceneLightTest(cameraController)
    ];

    // Default
    this.scene;
    this.setScene(0);
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    this.scene = this.SCENES[sceneId];
    this.scene.init();
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    return this.scene.getBackground(rayDirectionNormalized);
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

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    this.scene.setAnimationTime(time);
  }

  getAnimationFrameMax() {
    return this.scene.getAnimationFrameMax();
  }

  // __________________________________________________________ TextureImageData

  setTextureImageDimensions(dimensions) {
    const SCENES = this.SCENES;

    let i;

    for (i = 0; i < SCENES.length; i++) {
      SCENES[i].setTextureImageDimensions(dimensions);
    }
  }

  setTextureImageData(data) {
    const SCENES = this.SCENES;

    let i;

    for (i = 0; i < SCENES.length; i++) {
      SCENES[i].setTextureImageData(data);
    }
  }
}
