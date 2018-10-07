import Texture from "./Texture";

export default class TextureChecker extends Texture {
  constructor(textureA, textureB, scalar) {
    super();

    this.TEXTURE_A = textureA;
    this.TEXTURE_B = textureB;

    this.SCALAR = scalar;
  }

  getValue(u, v, position) {
    u;
    v;

    const SCALAR = this.SCALAR;

    const SINES =
      Math.sin(SCALAR * position[0]) *
      Math.sin(SCALAR * position[1]) *
      Math.sin(SCALAR * position[2]);

    if (SINES < 0) {
      return this.TEXTURE_A.getValue(u, v, position);
    } else {
      return this.TEXTURE_B.getValue(u, v, position);
    }
  }
}
