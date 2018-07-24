import { vec3 } from "gl-matrix";

import HitRecord from "../Hit/HitRecord";
import HitableSphere from "../Hit/HitableSphere";

import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialMetal from "../Material/MaterialMetal";

export default class World {
  constructor() {
    this.HITABLES = [];

    this.MATERIAL_METAL = new MaterialMetal(vec3.fromValues(0.8, 0.3, 0.3));

    this.MATERIAL_LAMBERTIAN = new MaterialLambertian(
      vec3.fromValues(0.8, 0.8, 0.0)
    );
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

  // _____________________________________________________________ Test Material

  setSceneTestMaterial() {
    const MATERIAL_METAL = this.MATERIAL_METAL;
    const MATERIAL_LAMBERTIAN = this.MATERIAL_LAMBERTIAN;

    this.addSphere(vec3.fromValues(-1.05, 0.0, -1.0), 0.5, MATERIAL_METAL);

    this.addSphere(vec3.fromValues(0.0, 0.0, -1.0), 0.5, MATERIAL_LAMBERTIAN);

    this.addSphere(vec3.fromValues(1.05, 0.0, -1.0), 0.5, MATERIAL_METAL);

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      MATERIAL_LAMBERTIAN
    );
  }

  // _________________________________________________________________ Test Many

  setSceneTestMany() {
    const MATERIAL_METAL = this.MATERIAL_METAL;
    const MATERIAL_LAMBERTIAN = this.MATERIAL_LAMBERTIAN;

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
        0.06,
        MATERIAL_METAL
      );
    }

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      MATERIAL_LAMBERTIAN
    );
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
