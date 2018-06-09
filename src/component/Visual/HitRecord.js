import { vec3 } from "gl-matrix";

export default class HitRecord {
  constructor() {
    this.t = -1;
    this.position = vec3.fromValues(-1, -1, -1);
    this.normal = vec3.fromValues(-1, 1, -1);
  }
}
