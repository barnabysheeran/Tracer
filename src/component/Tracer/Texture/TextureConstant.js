import Texture from "./Texture";

export default class TextureConstant extends Texture {
  constructor(colour) {
    super();

    this.COLOUR = colour;
  }

  getValue(u, v, p) {
    u;
    v;
    p;

    return this.COLOUR;
  }
}
