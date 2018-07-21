import { vec3 } from "gl-matrix";

import HitableSphere from "../Hit/HitableSphere";
import HitRecord from "../Hit/HitRecord";

export default class World {
  constructor() {
    this.HITABLES = [];
  }

  // __________________________________________________________________ Populate

  setScene(sceneId) {
    // Old
    this.clear();

    // New
    switch (sceneId) {
      case 0:
        this.addSphere(vec3.fromValues(0.0, 0.0, -1.0), 0.5);
        this.addSphere(vec3.fromValues(0.0, -100.5, -1.0), 100);
        break;
      case 1:
        this.addSphere(vec3.fromValues(0.0, 0.0, -1.0), 0.5);
        break;
    }
  }

  // _____________________________________________________________________ Clear

  clear() {
    this.HITABLES = [];
  }

  // ____________________________________________________________________ Sphere

  addSphere(position, radius) {
    this.HITABLES.push(new HitableSphere(position, radius));
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
