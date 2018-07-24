import { vec3 } from "gl-matrix";

import HitRecord from "../Hit/HitRecord";
import HitableSphere from "../Hit/HitableSphere";

import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialMetal from "../Material/MaterialMetal";

export default class World {
  constructor() {
    this.HITABLES = [];

    // Materials
    this.MATERIAL_METAL_A = new MaterialMetal(
      vec3.fromValues(0.8, 0.8, 0.8),
      0.1
    );
    this.MATERIAL_METAL_B = new MaterialMetal(
      vec3.fromValues(0.8, 0.8, 0.8),
      0.5
    );

    this.MATERIAL_LAMBERTIAN_A = new MaterialLambertian(
      vec3.fromValues(0.8, 0.8, 0.8),
      1.0
    );
    this.MATERIAL_LAMBERTIAN_B = new MaterialLambertian(
      vec3.fromValues(1.0, 0.4, 0.4),
      1.0
    );
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    // Old
    this.clear();

    // New
    switch (sceneId) {
      case 0: // Test Material
        this.setSceneTest();
        break;
      case 1: // Test Many
        this.setSceneLambertianTest();
        break;
      case 2: // Test Materials 2
        this.setSceneMetalTest();
        break;
    }
  }

  // _____________________________________________________________ Test Material

  setSceneTest() {
    const MATERIAL_METAL_A = this.MATERIAL_METAL_A;
    const MATERIAL_METAL_B = this.MATERIAL_METAL_B;

    const MATERIAL_LAMBERTIAN_A = this.MATERIAL_LAMBERTIAN_A;
    const MATERIAL_LAMBERTIAN_B = this.MATERIAL_LAMBERTIAN_B;

    //
    this.addSphere(vec3.fromValues(-1.05, 0.0, -1.0), 0.5, MATERIAL_METAL_A);

    this.addSphere(vec3.fromValues(0.0, 0.0, -1.0), 0.5, MATERIAL_LAMBERTIAN_B);

    this.addSphere(vec3.fromValues(1.05, 0.0, -1.0), 0.5, MATERIAL_METAL_B);

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      MATERIAL_LAMBERTIAN_A
    );
  }

  setSceneLambertianTest() {
    const MATERIAL_METAL_A = this.MATERIAL_METAL_A;
    const MATERIAL_LAMBERTIAN_A = this.MATERIAL_LAMBERTIAN_A;
    const MATERIAL_LAMBERTIAN_B = this.MATERIAL_LAMBERTIAN_B;

    //
    this.addSphere(
      vec3.fromValues(-0.505, 0.0, -1.0),
      0.5,
      MATERIAL_LAMBERTIAN_A
    );
    this.addSphere(
      vec3.fromValues(0.505, 0.0, -1.0),
      0.5,
      MATERIAL_LAMBERTIAN_B
    );

    this.addSphere(vec3.fromValues(-0.15, -0.4, -0.7), 0.1, MATERIAL_METAL_A);

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      MATERIAL_LAMBERTIAN_A
    );
  }

  setSceneMetalTest() {
    const MATERIAL_METAL_A = this.MATERIAL_METAL_A;
    const MATERIAL_METAL_B = this.MATERIAL_METAL_B;
    const MATERIAL_LAMBERTIAN_A = this.MATERIAL_LAMBERTIAN_A;
    const MATERIAL_LAMBERTIAN_B = this.MATERIAL_LAMBERTIAN_B;

    //
    this.addSphere(vec3.fromValues(-0.505, 0.0, -1.0), 0.5, MATERIAL_METAL_A);
    this.addSphere(vec3.fromValues(0.505, 0.0, -1.0), 0.5, MATERIAL_METAL_B);

    this.addSphere(
      vec3.fromValues(-0.15, -0.4, -0.7),
      0.1,
      MATERIAL_LAMBERTIAN_B
    );

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      MATERIAL_LAMBERTIAN_A
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
