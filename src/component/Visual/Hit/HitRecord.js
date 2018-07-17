import { vec3 } from "gl-matrix";

export default class HitRecord {
  constructor() {
    this.t = -1;
    this.position = vec3.fromValues(-1, -1, -1);
    this.normal = vec3.fromValues(-1, -1, -1);
    this.material;
  }

  cloneThisInto(hitRecord) {
    const POSITION = this.position;
    const NORMAL = this.normal;

    hitRecord.t = this.t;
    hitRecord.position = vec3.fromValues(POSITION[0], POSITION[1], POSITION[2]);
    hitRecord.normal = vec3.fromValues(NORMAL[0], NORMAL[1], NORMAL[2]);
    hitRecord.material = this.material;
  }
}
