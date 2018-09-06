import { vec3 } from "gl-matrix";

import TextureConstant from "../Texture/TextureConstant";
import MaterialLambertian from "../Material/MaterialLambertian";

export default class SceneHelper {
  constructor(scene, sizeAxis, sizeSphere) {
    // Textures
    const TEXTURE_BLACK = new TextureConstant(vec3.fromValues(0.0, 0.0, 0.0));
    const TEXTURE_RED = new TextureConstant(vec3.fromValues(1.0, 0.0, 0.0));
    const TEXTURE_GREEN = new TextureConstant(vec3.fromValues(0.0, 1.0, 0.0));
    const TEXTURE_BLUE = new TextureConstant(vec3.fromValues(0.0, 0.0, 1.0));

    // Materials
    const MATERIAL_BLACK = new MaterialLambertian(TEXTURE_BLACK);
    const MATERIAL_RED = new MaterialLambertian(TEXTURE_RED);
    const MATERIAL_GREEN = new MaterialLambertian(TEXTURE_GREEN);
    const MATERIAL_BLUE = new MaterialLambertian(TEXTURE_BLUE);

    // Origin
    scene.addSphere(vec3.fromValues(0.0, 0.0, 0.0), sizeSphere, MATERIAL_BLACK);

    // X
    scene.addSphere(
      vec3.fromValues(sizeAxis, 0.0, 0.0),
      sizeSphere,
      MATERIAL_RED
    );

    // Y
    scene.addSphere(
      vec3.fromValues(0.0, sizeAxis, 0.0),
      sizeSphere,
      MATERIAL_GREEN
    );

    // Z
    scene.addSphere(
      vec3.fromValues(0.0, 0.0, sizeAxis),
      sizeSphere,
      MATERIAL_BLUE
    );
  }
}
