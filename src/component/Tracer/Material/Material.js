import ColourRGBA from "../Colour/ColourRGBA";

export default class Material {
  constructor() {
    this.EMITTED_BASE = new ColourRGBA(0.0, 0.0, 0.0, 1.0);
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
