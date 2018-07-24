import { vec3 } from "gl-matrix";

import Material from "./Material";

export default class MaterialLambertian extends Material {
  constructor(albedo, smoothness) {
    super(albedo, smoothness);
  }

  scatter(rayIn, hitRecord, attenuation, scattered) {
    rayIn;

    const ALBEDO = this.ALBEDO;
    const ROUGH = this.ROUGH;

    // Rough
    let roughness = this.getRandominUnitSphere();

    roughness[0] *= ROUGH;
    roughness[1] *= ROUGH;
    roughness[2] *= ROUGH;

    // Target
    let target = vec3.fromValues(
      hitRecord.position[0] + hitRecord.normal[0] + roughness[0],
      hitRecord.position[1] + hitRecord.normal[1] + roughness[1],
      hitRecord.position[2] + hitRecord.normal[2] + roughness[2]
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
