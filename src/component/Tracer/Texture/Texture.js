import ColourRGBA from "../Colour/ColourRGBA";

export default class Texture {
  constructor() {}

  getValue(u, v, p) {
    u;
    v;
    p;

    return new ColourRGBA(0.0, 0.0, 0.0, 0.0);
  }
}
