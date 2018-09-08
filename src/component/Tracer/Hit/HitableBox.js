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
    this.V_4 = vec3.fromValues(0.0, -HEIGHT_HALF, 0.0);
    this.V_5 = vec3.fromValues(0.0, -HEIGHT_HALF, 0.0);
    this.V_6 = vec3.fromValues(0.0, -HEIGHT_HALF, 0.0);
    this.V_7 = vec3.fromValues(0.0, -HEIGHT_HALF, 0.0);

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

    // Set triangle positions and create BB
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

    const VP_0 = vec3.clone(this.V_0);
    const VP_1 = vec3.clone(this.V_1);
    const VP_2 = vec3.clone(this.V_2);
    const VP_3 = vec3.clone(this.V_3);

    const VP_4 = vec3.clone(this.V_4);
    const VP_5 = vec3.clone(this.V_5);
    const VP_6 = vec3.clone(this.V_6);
    const VP_7 = vec3.clone(this.V_7);

    // TODO Rotate

    // TODO Translate

    // Set Triangles Top
    this.TRIANGLES[0].setVertex(VP_0, VP_1, VP_3);
    this.TRIANGLES[1].setVertex(VP_2, VP_3, VP_1);
    this.TRIANGLES[1].flipTextureCoordinates();

    // TODO Create BB ?

    // Go through triangles and change their position
    // // Planes
    // const PLANE_TOP = new HitablePlaneHolder();
    // const PLANE_BOTTOM = new HitablePlaneHolder();
    // const PLANE_LEFT = new HitablePlaneHolder();
    // const PLANE_RIGHT = new HitablePlaneHolder();
    // const PLANE_FRONT = new HitablePlaneHolder();
    // const PLANE_BACK = new HitablePlaneHolder();
    // this.TRIANGLES = [];
    // // Bottom
    // this.TRIANGLES.push(
    //   new HitableTriangle(this.p0, this.p1, this.p2, material)
    // );
    // this.TRIANGLES.push(
    //   new HitableTriangle(this.p0, this.p1, this.p2, material)
    // );
    // // Left
    // this.TRIANGLES.push(
    //   new HitableTriangle(this.p0, this.p1, this.p2, material)
    // );
    // this.TRIANGLES.push(
    //   new HitableTriangle(this.p0, this.p1, this.p2, material)
    // );
    // // Right
    // let i;
    // for (i = 0; i < this.TRIANGLES.length; i++) {
    //   scene.addTriangle(this.TRIANGLES[i]);
    // }
    // // Rotation
    // // Position
    // // BB
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    ray;
    tMin;
    tMax;
    hitRecord;
  }
}
