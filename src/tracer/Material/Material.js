import { vec3 } from "gl-matrix";

export default class Material {
  constructor() {
    this.EMITTED_BASE = vec3.fromValues(0.0, 0.0, 0.0);
  }

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

    return this.EMITTED_BASE;
  }
}
