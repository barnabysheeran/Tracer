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

    // // Attenuation
    // const VALUE = this.ALBEDO.getValue(
    //   hitRecord.u,
    //   hitRecord.v,
    //   hitRecord.position
    // );

    // // Alpha test
    // if (VALUE.A < 0.1) {
    //   console.log(VALUE.A);
    //   return false;
    // }

    // attenuation.R = VALUE.R;
    // attenuation.G = VALUE.G;
    // attenuation.B = VALUE.B;

    // // Alpha
    // // if (Math.random() < VALUE.A) { // TODO Check
    // //   return false;
    // // }

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

    attenuation.R = VALUE.R;
    attenuation.G = VALUE.G;
    attenuation.B = VALUE.B;

    if (VALUE.A < 0.01) {
      return false;
    } else {
      return true;
    }
  }
}
