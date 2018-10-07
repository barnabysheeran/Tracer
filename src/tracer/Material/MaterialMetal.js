import { vec3 } from "gl-matrix";

import Material from "./Material";

import { getRandominUnitSphere, reflect } from "../Util/util";

export default class MaterialMetal extends Material {
  constructor(albedo, rough) {
    super();

    this.ALBEDO = albedo;
    this.ROUGH = rough;
  }

  // ___________________________________________________________________ Scatter

  scatter(rayIn, hitRecord, attenuation, scattered) {
    const ALBEDO = this.ALBEDO;
    const ROUGH = this.ROUGH;

    // Reflected
    let reflected = reflect(rayIn.getDirectionNormalized(), hitRecord.normal);

    // Rough
    let roughness = getRandominUnitSphere();

    roughness[0] *= ROUGH;
    roughness[1] *= ROUGH;
    roughness[2] *= ROUGH;

    // Scattered
    scattered.setPositionOrigin(
      hitRecord.position[0],
      hitRecord.position[1],
      hitRecord.position[2]
    );

    scattered.setDirection(
      reflected[0] + roughness[0],
      reflected[1] + roughness[1],
      reflected[2] + roughness[2]
    );

    // Attenuation
    const VALUE = ALBEDO.getValue(hitRecord.u, hitRecord.v, hitRecord.position);

    attenuation[0] = VALUE[0];
    attenuation[1] = VALUE[1];
    attenuation[2] = VALUE[2];

    if (vec3.dot(scattered.getDirection(), hitRecord.normal) > 0) {
      return true;
    } else {
      return false;
    }
  }
}
