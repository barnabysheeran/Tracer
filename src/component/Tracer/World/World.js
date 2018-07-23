import { vec3 } from "gl-matrix";

import HitableSphere from "../Hit/HitableSphere";
import HitRecord from "../Hit/HitRecord";

export default class World {
  constructor() {
    this.HITABLES = [];
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    // Old
    this.clear();

    // New
    switch (sceneId) {
      case 0: // Test Material
        this.setSceneTestMaterial();
        break;
      case 1: // Test Many
        this.setSceneTestMany();
        break;
    }
  }

  setSceneTestMaterial() {
    this.addSphere(vec3.fromValues(-1.05, 0.0, -1.0), 0.5);
    this.addSphere(vec3.fromValues(0.0, 0.0, -1.0), 0.5);
    this.addSphere(vec3.fromValues(1.05, 0.0, -1.0), 0.5);
    this.addSphere(vec3.fromValues(0.0, -100.5, -1.0), 100); // 'Floor'
  }

  setSceneTestMany() {
    const RADIUS = 1;
    const TOTAL = 50;
    const PROGRESS_INTERVAL = (Math.PI * 2.0) / TOTAL;

    let i;

    for (i = 0; i < TOTAL; i++) {
      this.addSphere(
        vec3.fromValues(
          Math.cos(PROGRESS_INTERVAL * i) * RADIUS,
          0.0,
          Math.sin(PROGRESS_INTERVAL * i) * RADIUS
        ),
        0.06
      );
    }

    this.addSphere(vec3.fromValues(0.0, -100.5, -1.0), 100); // 'Floor'
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
