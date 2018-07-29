import HitRecord from "../Hit/HitRecord";
import HitableSphere from "../Hit/HitableSphere";

import SceneTest from "./SceneTest";

export default class World {
  constructor() {
    this.HITABLES = [];

    this.SCENE_TEST = new SceneTest();
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    this.clear();

    switch (sceneId) {
      case 0: // Test Material
        this.HITABLES = this.SCENE_TEST.HITABLES;
        break;
    }
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
    const HITABLES = this.HITABLES;

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
