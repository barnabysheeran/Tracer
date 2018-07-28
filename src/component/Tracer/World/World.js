import { vec3 } from "gl-matrix";

import HitRecord from "../Hit/HitRecord";
import HitableSphere from "../Hit/HitableSphere";

import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialMetal from "../Material/MaterialMetal";

export default class World {
  constructor() {
    this.HITABLES = [];

    // Lambertian
    this.MATERIAL_LAMBERTIAN_R = new MaterialLambertian(
      vec3.fromValues(1.0, 0.25, 0.25)
    );
    this.MATERIAL_LAMBERTIAN_G = new MaterialLambertian(
      vec3.fromValues(0.25, 1.0, 0.25)
    );
    this.MATERIAL_LAMBERTIAN_B = new MaterialLambertian(
      vec3.fromValues(0.25, 0.25, 1.0)
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

    this.MATERIAL_METAL_R = new MaterialMetal(
      vec3.fromValues(1.0, 0.5, 0.5),
      0.1
    );

    this.MATERIAL_METAL_G = new MaterialMetal(
      vec3.fromValues(0.5, 1.0, 0.5),
      0.1
    );

    this.MATERIAL_METAL_B = new MaterialMetal(
      vec3.fromValues(0.5, 0.5, 1.0),
      0.1
    );

    // Dielectric
    this.MATERIAL_DIELECTRIC_A = new MaterialDielectric(1.5);
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
      case 1: // Test Pyramid
        this.setScenePyramid();
        break;
    }
  }

  // _____________________________________________________________ Test Material

  setSceneTest() {
    // Dialectic
    this.addSphere(
      vec3.fromValues(0.0, 0.0, 0.0),
      0.5,
      this.MATERIAL_DIELECTRIC_A
    );

    this.addSphere(
      vec3.fromValues(0.0, 0.0, 0.0),
      -0.48,
      this.MATERIAL_DIELECTRIC_A
    );

    //
    let i;
    let r;
    let total = 12;
    let progressInterval = (Math.PI * 2) / total;
    let radius = 0.5;
    let material;

    for (i = 0; i < total; i++) {
      // Material
      r = Math.random();

      if (r < 0.33) {
        material = this.MATERIAL_METAL_R;
      } else if (r < 0.66) {
        material = this.MATERIAL_METAL_G;
      } else {
        material = this.MATERIAL_METAL_B;
      }

      // Sphere
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressInterval * i) * radius,
          -0.39,
          Math.cos(progressInterval * i) * radius
        ),
        0.1,
        material
      );
    }

    total = 32;
    progressInterval = (Math.PI * 2) / total;
    radius = 0.65;

    for (i = 0; i < total; i++) {
      // Material
      r = Math.random();

      if (r < 0.33) {
        material = this.MATERIAL_METAL_R;
      } else if (r < 0.66) {
        material = this.MATERIAL_METAL_G;
      } else {
        material = this.MATERIAL_METAL_B;
      }

      // Sphere
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressInterval * i) * radius,
          -0.449,
          Math.cos(progressInterval * i) * radius
        ),
        0.05,
        material
      );
    }

    // 'Floor'
    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      this.MATERIAL_LAMBERTIAN_WHITE
    );
  }

  setScenePyramid() {
    // Center
    this.addSphere(
      vec3.fromValues(0.0, 0.0, 0.0),
      0.5,
      this.MATERIAL_DIELECTRIC_A
    );

    this.addSphere(
      vec3.fromValues(0.0, 0.0, 0.0),
      -0.45,
      this.MATERIAL_DIELECTRIC_A
    );

    let i;
    let progressInterval = (Math.PI * 2) / 6;
    let radius = 1.0;

    for (i = 0; i < 6; i++) {
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressInterval * i) * radius,
          0.0,
          Math.cos(progressInterval * i) * radius
        ),
        0.5,
        this.MATERIAL_DIELECTRIC_A
      );

      this.addSphere(
        vec3.fromValues(
          Math.sin(progressInterval * i) * radius,
          0.0,
          Math.cos(progressInterval * i) * radius
        ),
        -0.45,
        this.MATERIAL_DIELECTRIC_A
      );
    }

    // Red
    radius = 0.55;

    this.addSphere(
      vec3.fromValues(Math.sin(-0.2) * radius, 0.4, Math.cos(-0.2) * radius),
      0.1,
      this.MATERIAL_METAL_R
    );

    this.addSphere(
      vec3.fromValues(Math.sin(-0.8) * radius, 0.4, Math.cos(-0.8) * radius),
      0.1,
      this.MATERIAL_METAL_G
    );

    this.addSphere(
      vec3.fromValues(Math.sin(-1.4) * radius, 0.4, Math.cos(-1.4) * radius),
      0.1,
      this.MATERIAL_METAL_B
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
