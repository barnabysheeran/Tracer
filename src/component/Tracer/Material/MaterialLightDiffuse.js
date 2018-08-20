import Material from "./Material";

export default class MaterialLightDiffuse extends Material {
  constructor(albedo) {
    super();

    this.ALBEDO = albedo;
  }

  scatter(rayIn, hitRecord, attenuation, scattered) {
    rayIn;
    hitRecord;
    attenuation;
    scattered;

    return false;
  }

  emitted(u, v, position) {
    return this.ALBEDO.getValue(u, v, position);
  }
}
