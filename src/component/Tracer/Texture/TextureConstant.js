import Texture from "./Texture";

export default class TextureConstant extends Texture {
  constructor(colourRGBA) {
    super();

    console.log("TextureConstant. ");
    console.log(colourRGBA);

    this.COLOUR_RGBA = colourRGBA;
  }

  getValue(u, v, position) {
    u;
    v;
    position;

    return this.COLOUR_RGBA;
  }
}
