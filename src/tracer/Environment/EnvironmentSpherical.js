export default class EnvironmentSpherical {
  constructor(texture) {
    this.TEXTURE = texture;
  }

  getColour(rayDirectionNormalized) {
    const PI = Math.PI;

    const PHI = Math.atan2(
      rayDirectionNormalized[2],
      rayDirectionNormalized[0]
    );

    const THETA = Math.asin(rayDirectionNormalized[1]);

    const U = 1.0 - (PHI + PI) / (2.0 * PI);
    const V = (THETA + PI / 2.0) / PI;

    return this.TEXTURE.getValue(U, V, null);
  }
}
