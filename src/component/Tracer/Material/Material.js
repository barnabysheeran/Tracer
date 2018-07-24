import { vec3 } from "gl-matrix";

export default class Material {
  constructor(albedo) {
    this.ALBEDO = albedo;
  }

  scatter(rayIn, hitRecord, attenuation, scattered) {
    rayIn;
    hitRecord;
    attenuation;
    scattered;
  }

  getRandominUnitSphere() {
    // TODO Optimise
    let p = vec3.fromValues(Infinity, Infinity, Infinity);

    while (vec3.squaredLength(p) >= 1.0) {
      p[0] = Math.random() * 2.0 - 1.0;
      p[1] = Math.random() * 2.0 - 1.0;
      p[2] = Math.random() * 2.0 - 1.0;
    }

    return p;
  }
}
