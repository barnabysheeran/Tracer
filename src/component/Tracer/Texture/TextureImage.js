import Texture from "./Texture";

export default class TextureImage extends Texture {
  constructor(textureId) {
    super();

    textureId;
  }

  getValue(u, v, position) {
    u;
    v;
    position;

    return this.COLOUR;
  }
}
