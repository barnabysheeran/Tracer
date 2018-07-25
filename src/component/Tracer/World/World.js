import { vec3 } from "gl-matrix";

import HitRecord from "../Hit/HitRecord";
import HitableSphere from "../Hit/HitableSphere";

import MaterialDialectic from "../Material/MaterialDialectic";
import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialMetal from "../Material/MaterialMetal";

export default class World {
  constructor() {
    this.HITABLES = [];

    // Lambertian
    this.MATERIAL_LAMBERTIAN_R = new MaterialLambertian(
      vec3.fromValues(1.0, 0.5, 0.5)
    );
    this.MATERIAL_LAMBERTIAN_G = new MaterialLambertian(
      vec3.fromValues(0.5, 1.0, 0.5)
    );
    this.MATERIAL_LAMBERTIAN_B = new MaterialLambertian(
      vec3.fromValues(0.5, 0.5, 1.0)
    );
    this.MATERIAL_LAMBERTIAN_WHITE = new MaterialLambertian(
      vec3.fromValues(0.8, 0.8, 0.8)
    );

    // Metal
    this.MATERIAL_METAL_A = new MaterialMetal(
      vec3.fromValues(0.8, 0.8, 0.8),
      0.1
    );
    this.MATERIAL_METAL_B = new MaterialMetal(
      vec3.fromValues(0.8, 0.8, 0.8),
      0.5
    );

    // Dialectic
    this.MATERIAL_DIALECTIC_A = new MaterialDialectic(
      vec3.fromValues(0.8, 0.8, 0.8),
      0.1
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
      case 3: // Test Dialectic
        this.setSceneDialecticTest();
        break;
    }
  }

  // _____________________________________________________________ Test Material

  setSceneTest() {
    this.addSphere(
      vec3.fromValues(-1.05, 0.0, -1.0),
      0.5,
      this.MATERIAL_METAL_A
    );

    this.addSphere(
      vec3.fromValues(0.0, 0.0, -1.0),
      0.5,
      this.MATERIAL_LAMBERTIAN_R
    );

    this.addSphere(
      vec3.fromValues(1.05, 0.0, -1.0),
      0.5,
      this.MATERIAL_METAL_B
    );

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      this.MATERIAL_LAMBERTIAN_WHITE
    );
  }

  setSceneLambertianTest() {
    this.addSphere(
      vec3.fromValues(-0.505, 0.0, -1.0),
      0.5,
      this.MATERIAL_LAMBERTIAN_WHITE
    );
    this.addSphere(
      vec3.fromValues(0.505, 0.0, -1.0),
      0.5,
      this.MATERIAL_LAMBERTIAN_R
    );

    this.addSphere(
      vec3.fromValues(-0.15, -0.4, -0.7),
      0.1,
      this.MATERIAL_METAL_A
    );

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      this.MATERIAL_LAMBERTIAN_WHITE
    );
  }

  setSceneMetalTest() {
    this.addSphere(
      vec3.fromValues(-0.505, 0.0, -1.0),
      0.5,
      this.MATERIAL_METAL_A
    );
    this.addSphere(
      vec3.fromValues(0.505, 0.0, -1.0),
      0.5,
      this.MATERIAL_METAL_B
    );

    this.addSphere(
      vec3.fromValues(-0.15, -0.4, -0.7),
      0.1,
      this.MATERIAL_LAMBERTIAN_R
    );

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      this.MATERIAL_LAMBERTIAN_WHITE
    );
  }

  setSceneDialecticTest() {
    // Dialectic
    this.addSphere(
      vec3.fromValues(0.0, 0.0, -1.0),
      0.5,
      this.MATERIAL_DIALECTIC_A
    );

    // Metal
    this.addSphere(
      vec3.fromValues(-0.8, -0.26, -1.0),
      0.25,
      this.MATERIAL_METAL_A
    );

    this.addSphere(
      vec3.fromValues(0.8, -0.26, -1.0),
      0.25,
      this.MATERIAL_METAL_B
    );

    // RGB
    this.addSphere(
      vec3.fromValues(-0.4, -0.3, -0.45),
      0.08,
      this.MATERIAL_LAMBERTIAN_R
    );

    this.addSphere(
      vec3.fromValues(-0.2, -0.3, -0.45),
      0.08,
      this.MATERIAL_LAMBERTIAN_G
    );

    this.addSphere(
      vec3.fromValues(-0.0, -0.3, -0.45),
      0.08,
      this.MATERIAL_LAMBERTIAN_B
    );

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      this.MATERIAL_LAMBERTIAN_WHITE
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
