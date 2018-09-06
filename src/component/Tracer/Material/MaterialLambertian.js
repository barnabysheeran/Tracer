import { vec3 } from "gl-matrix";

import Material from "./Material";

import { getRandominUnitSphere } from "../Util/util";

export default class MaterialLambertian extends Material {
  constructor(albedo) {
    super();

    this.ALBEDO = albedo;
  }

  // ___________________________________________________________________ Scatter

  scatter(rayIn, hitRecord, attenuation, scattered) {
    rayIn;

    // Rough
    let roughness = getRandominUnitSphere();

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
    const VALUE = this.ALBEDO.getValue(
      hitRecord.u,
      hitRecord.v,
      hitRecord.position
    );

    attenuation[0] = VALUE[0];
    attenuation[1] = VALUE[1];
    attenuation[2] = VALUE[2];

    return true;
  }
}
