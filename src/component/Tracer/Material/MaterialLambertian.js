import Material from "./Material";

export default class MaterialLambertian extends Material {
  constructor(rayIn, hitRecord, attenuation, scattered) {
    super(rayIn, hitRecord, attenuation, scattered);
  }
}
