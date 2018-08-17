import { vec3 } from "gl-matrix";

import SimplexNoise from "simplex-noise";

import Texture from "./Texture";

export default class TextureSimplex extends Texture {
  constructor(scalar) {
    super();

    this.SCALAR = scalar;

    this.SIMPLEX = new SimplexNoise("random");
  }

  getValue(u, v, position) {
    u;
    v;

    const turb = this.turbulence(position, 7);

    const marble =
      0.5 * (1 + Math.sin(this.SCALAR + position[2] + 10.0 * turb));

    return vec3.fromValues(marble, marble, marble);
  }

  // ________________________________________________________________ Turbulence

  turbulence(position, depth) {
    const SIMPLEX = this.SIMPLEX;

    let accum = 0.0;
    let weight = 1.0;
    let tempPosition = vec3.clone(position);

    let i;
    for (i = 0; i < depth; i++) {
      accum +=
        weight *
        SIMPLEX.noise3D(tempPosition[0], tempPosition[1], tempPosition[2]);

      weight *= 0.5;

      tempPosition[0] *= 2.0;
      tempPosition[1] *= 2.0;
      tempPosition[2] *= 2.0;
    }

    return Math.abs(accum);
  }
}
