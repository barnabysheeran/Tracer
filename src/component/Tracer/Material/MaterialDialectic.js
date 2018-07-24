import { vec3 } from "gl-matrix";

export default class MaterialLambertian {
  constructor(albedo) {
    this.ALBEDO = albedo;
  }

  scatter(rayIn, hitRecord, attenuation, scattered) {
    rayIn;

    const ALBEDO = this.ALBEDO;

    // Rough
    let roughness = this.getRandominUnitSphere();

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
