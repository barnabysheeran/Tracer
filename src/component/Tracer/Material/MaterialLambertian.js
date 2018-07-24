import { vec3 } from "gl-matrix";

import Material from "./Material";

export default class MaterialLambertian extends Material {
  constructor(albedo) {
    super(albedo);
  }

  scatter(rayIn, hitRecord, attenuation, scattered) {
    rayIn;

    const ALBEDO = this.ALBEDO;

    let randomUnitSphere = this.getRandominUnitSphere();

    // Target
    let target = vec3.fromValues(
      hitRecord.position[0] + hitRecord.normal[0] + randomUnitSphere[0],
      hitRecord.position[1] + hitRecord.normal[1] + randomUnitSphere[1],
      hitRecord.position[2] + hitRecord.normal[2] + randomUnitSphere[2]
    );

    // Scattered
    scattered.setPositionOrigin(
      hitRecord.position[0],
      hitRecord.position[1],
      hitRecord.position[2]
    );

    scattered.setDirection(target[0], target[1], target[2]);

    // Attenuation
    attenuation[0] = ALBEDO[0];
    attenuation[1] = ALBEDO[1];
    attenuation[2] = ALBEDO[2];

    return true;
  }
}
