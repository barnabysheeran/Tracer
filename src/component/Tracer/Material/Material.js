import { vec3 } from "gl-matrix";

export default class Material {
  constructor() {}

  scatter(rayIn, hitRecord, attenuation, scattered) {
    rayIn;
    hitRecord;
    attenuation;
    scattered;
  }

  emitted(u, v, position) {
    u;
    v;
    position;

    return vec3.fromValues(0.0, 0.0, 0.0);
  }
}
