import { vec3 } from "gl-matrix";

import Material from "./Material";

export default class MaterialMetal extends Material {
  constructor(albedo) {
    super(albedo);
  }

  scatter(rayIn, hitRecord, attenuation, scattered) {
    const ALBEDO = this.ALBEDO;

    let reflected = this.reflect(
      rayIn.getDirectionNormalized(),
      hitRecord.normal
    );

    // Scattered
    scattered.setPositionOrigin(
      hitRecord.position[0],
      hitRecord.position[1],
      hitRecord.position[2]
    );

    scattered.setDirection(reflected[0], reflected[1], reflected[2]);

    // Attenuation
    attenuation[0] = ALBEDO[0];
    attenuation[1] = ALBEDO[1];
    attenuation[2] = ALBEDO[2];

    if (vec3.dot(scattered.getDirection(), hitRecord.normal) > 0) {
      return true;
    } else {
      return false;
    }
  }

  reflect(direction, normal) {
    let dot = vec3.dot(direction, normal);

    return vec3.fromValues(
      direction[0] - 2 * dot * normal[0],
      direction[1] - 2 * dot * normal[1],
      direction[2] - 2 * dot * normal[2]
    );
  }
}
