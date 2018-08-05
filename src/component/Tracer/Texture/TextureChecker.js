import Texture from "./Texture";
import { vec3 } from "gl-matrix";

export default class TextureChecker extends Texture {
  constructor() {
    super(); // TODO Materials
  }

  getValue(u, v, position) {
    const SINES =
      Math.sin(10.0 * position[0]) *
      Math.sin(10.0 * position[1]) *
      Math.sin(10.0 * position[2]); // TODO Scale as class scope var

    if (SINES < 0) {
      return vec3.fromValues(0.0, 0.0, 0.0); // TODO Material
    } else {
      return vec3.fromValues(1.0, 1.0, 1.0); // TODO Material
    }
  }
}
