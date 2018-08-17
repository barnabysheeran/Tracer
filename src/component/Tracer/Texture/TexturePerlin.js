import { vec3 } from "gl-matrix";

import Texture from "./Texture";

import Perlin from "../Util/Perlin";

export default class TexturePerlin extends Texture {
  constructor() {
    super();

    this.NOISE = new Perlin();
  }

  getValue(u, v, position) {
    u;
    v;

    const noiseValue = this.NOISE.noise(position);

    return vec3.fromValues(1 * noiseValue, 1 * noiseValue, 1 * noiseValue);
  }
}
