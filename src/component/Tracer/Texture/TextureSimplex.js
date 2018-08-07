import { vec3 } from "gl-matrix";
import SimplexNoise from "simplex-noise";

import Texture from "./Texture";

export default class TextureSimplex extends Texture {
  constructor(scalar) {
    super();

    this.SCALAR = scalar;

    this.SIMPLEX_R = new SimplexNoise("red");
    this.SIMPLEX_G = new SimplexNoise("green");
    this.SIMPLEX_B = new SimplexNoise("blue");
  }

  getValue(u, v, position) {
    u;
    v;

    const SCALAR = this.SCALAR;

    const r = this.SIMPLEX_R.noise3D(
      position[0] * SCALAR,
      position[1] * SCALAR,
      position[2] * SCALAR
    );

    const g = this.SIMPLEX_R.noise3D(
      position[0] * SCALAR + 0.1,
      position[1] * SCALAR + 0.1,
      position[2] * SCALAR + 0.1
    );

    const b = this.SIMPLEX_R.noise3D(
      position[0] * SCALAR + 0.2,
      position[1] * SCALAR + 0.2,
      position[2] * SCALAR + 0.2
    );

    return vec3.fromValues(r, g, b);
  }
}
