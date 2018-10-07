import Texture from "./Texture";

export default class TextureConstant extends Texture {
  constructor(colour) {
    super();

    this.COLOUR = colour;
  }

  getValue(u, v, position) {
    u;
    v;
    position;

    return this.COLOUR;
  }
}
