import { vec3, quat } from "gl-matrix";

import Hitable from "./Hitable";

export default class HitableBox extends Hitable {
  constructor(scene, width, height, depth, material) {
    super();

    // Dimensions
    const WIDTH_HALF = width * 0.5;
    const HEIGHT_HALF = height * 0.5;
    const DEPTH_HALF = depth * 0.5;

    // Untranslated Positions Top
    this.V_0 = vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, DEPTH_HALF);
    this.V_1 = vec3.fromValues(WIDTH_HALF, HEIGHT_HALF, DEPTH_HALF);
    this.V_2 = vec3.fromValues(WIDTH_HALF, HEIGHT_HALF, -DEPTH_HALF);
    this.V_3 = vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, -DEPTH_HALF);

    // Untranslated Positions Bottom
    this.V_4 = vec3.fromValues(-WIDTH_HALF, -HEIGHT_HALF, DEPTH_HALF);
    this.V_5 = vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, DEPTH_HALF);
    this.V_6 = vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, -DEPTH_HALF);
    this.V_7 = vec3.fromValues(-WIDTH_HALF, -HEIGHT_HALF, -DEPTH_HALF);

    // Rotation
    this.ROTATION = quat.create();

    // Position
    this.POSITION = vec3.create();

    // Create Triangles
    this.TRIANGLES = [];

    const P_TEMP = vec3.create();

    let i;

    for (i = 0; i < 12; i++) {
      this.TRIANGLES[i] = scene.addTriangle(P_TEMP, P_TEMP, P_TEMP, material);
    }

    // Set triangle positions
    this.update();
  }

  // __________________________________________________________________ Position

  setPosition(position) {
    this.POSITION = position;

    this.update();
  }

  // __________________________________________________________________ Rotation

  setRotation(rotation) {
    this.ROTATION = rotation;
  }

  // ____________________________________________________________________ Update

  update() {
    const TRIANGLES = this.TRIANGLES;
    const POSITION = this.POSITION;
    const ROTATION = this.ROTATION;

    const VP_0 = vec3.clone(this.V_0);
    const VP_1 = vec3.clone(this.V_1);
    const VP_2 = vec3.clone(this.V_2);
    const VP_3 = vec3.clone(this.V_3);

    const VP_4 = vec3.clone(this.V_4);
    const VP_5 = vec3.clone(this.V_5);
    const VP_6 = vec3.clone(this.V_6);
    const VP_7 = vec3.clone(this.V_7);

    // Rotate
    vec3.transformQuat(VP_0, VP_0, ROTATION);
    vec3.transformQuat(VP_1, VP_1, ROTATION);
    vec3.transformQuat(VP_2, VP_2, ROTATION);
    vec3.transformQuat(VP_3, VP_3, ROTATION);

    vec3.transformQuat(VP_4, VP_4, ROTATION);
    vec3.transformQuat(VP_5, VP_5, ROTATION);
    vec3.transformQuat(VP_6, VP_6, ROTATION);
    vec3.transformQuat(VP_7, VP_7, ROTATION);

    // Translate
    vec3.add(VP_0, VP_0, POSITION);
    vec3.add(VP_1, VP_1, POSITION);
    vec3.add(VP_2, VP_2, POSITION);
    vec3.add(VP_3, VP_3, POSITION);

    vec3.add(VP_4, VP_4, POSITION);
    vec3.add(VP_5, VP_5, POSITION);
    vec3.add(VP_6, VP_6, POSITION);
    vec3.add(VP_7, VP_7, POSITION);

    // Top
    TRIANGLES[0].setVertex(VP_0, VP_1, VP_3);
    TRIANGLES[1].setVertex(VP_2, VP_3, VP_1);
    TRIANGLES[1].flipTextureCoordinates(true);

    // Front
    TRIANGLES[2].setVertex(VP_4, VP_5, VP_0);
    TRIANGLES[3].setVertex(VP_1, VP_0, VP_5);
    TRIANGLES[3].flipTextureCoordinates(true);

    // Left
    TRIANGLES[4].setVertex(VP_7, VP_4, VP_3);
    TRIANGLES[5].setVertex(VP_0, VP_3, VP_4);
    TRIANGLES[5].flipTextureCoordinates(true);

    // Right
    TRIANGLES[6].setVertex(VP_5, VP_6, VP_1);
    TRIANGLES[7].setVertex(VP_2, VP_1, VP_6);
    TRIANGLES[7].flipTextureCoordinates(true);

    // Back
    TRIANGLES[8].setVertex(VP_6, VP_7, VP_2);
    TRIANGLES[9].setVertex(VP_3, VP_2, VP_7);
    TRIANGLES[9].flipTextureCoordinates(true);

    // Bottom
    TRIANGLES[10].setVertex(VP_4, VP_7, VP_5);
    TRIANGLES[11].setVertex(VP_6, VP_5, VP_7);
    TRIANGLES[11].flipTextureCoordinates(true);

    // TODO Create BB for Constant Medium
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    ray;
    tMin;
    tMax;
    hitRecord;

    // TODO BB hit for Constant Medium
  }
}
