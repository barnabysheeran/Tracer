import Material from "./Material";

import { getRandominUnitSphere } from "../Util/util";

export default class MaterialIsotropic extends Material {
  constructor(albedo) {
    super();

    this.ALBEDO = albedo;
  }

  // ___________________________________________________________________ Scatter

  scatter(rayIn, hitRecord, attenuation, scattered) {
    rayIn;

    // Scattered
    const R = getRandominUnitSphere();

    scattered.setPositionOrigin(
      hitRecord.position[0],
      hitRecord.position[1],
      hitRecord.position[2]
    );

    scattered.setDirection(R[0], R[1], R[2]);

    // Attenuation
    const C = this.ALBEDO.getValue(
      hitRecord.u,
      hitRecord.v,
      hitRecord.position
    );

    attenuation[0] = C[0];
    attenuation[1] = C[1];
    attenuation[2] = C[2];

    return true;
  }
}
