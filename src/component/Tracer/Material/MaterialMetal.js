import { vec3 } from "gl-matrix";

import Material from "./Material";

export default class MaterialMetal extends Material {
  constructor(albedo) {
    super(albedo);
  }

  scatter(rayIn, hitRecord, attenuation, scattered) {
    let reflected = this.reflect(
      rayIn.getDirectionNormalized(),
      hitRecord.normal
    );
  }

  reflect(direction, normal) {
    //return v - 2*dot(v,n) * n;
    //return direction - 2 * dot(v, n) * n;

    let dot = vec3.dot(direction, normal);
    vec3.scale(dot, 2);
  }
}
