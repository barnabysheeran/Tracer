import { vec3 } from "gl-matrix";

import Hitable from "./Hitable";

export default class HitableTriangle extends Hitable {
  constructor(v0, v1, v2, material) {
    super();

    // Vertex
    this.VERTEX0 = v0;
    this.VERTEX1 = v1;
    this.VERTEX2 = v2;

    // Edge
    this.EDGE1 = vec3.fromValues(
      this.VERTEX1[0] - this.VERTEX0[0],
      this.VERTEX1[1] - this.VERTEX0[1],
      this.VERTEX1[2] - this.VERTEX0[2]
    );

    this.EDGE2 = vec3.fromValues(
      this.VERTEX2[0] - this.VERTEX0[0],
      this.VERTEX2[1] - this.VERTEX0[1],
      this.VERTEX2[2] - this.VERTEX0[2]
    );

    // Normal
    this.NORMAL = vec3.fromValues();

    vec3.cross(this.NORMAL, this.EDGE1, this.EDGE2);
    this.NORMAL = vec3.normalize(this.NORMAL, this.NORMAL);

    // Material
    this.MATERIAL = material;
  }

  // _______________________________________________________________________ Hit

  // https://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm

  didHit(ray, tMin, tMax, hitRecord) {
    const RAY_ORIGIN = ray.getPositionOrigin();
    //const RAY_DIRECTION = ray.getDirectionNormalized();
    const RAY_DIRECTION = ray.getDirection();

    const EPSILON = 0.0000001;
    const VERTEX0 = this.VERTEX0;

    const EDGE1 = this.EDGE1;
    const EDGE2 = this.EDGE2;

    // const NORMAL = this.NORMAL;

    const H = vec3.create();
    vec3.cross(H, RAY_DIRECTION, EDGE2);

    const A = vec3.dot(EDGE1, H);
    if (A > -EPSILON && A < EPSILON) return false;

    // One sided
    // if (A < 0) {
    //   return false;
    // }

    const F = 1.0 / A;

    const S = vec3.fromValues(
      RAY_ORIGIN[0] - VERTEX0[0],
      RAY_ORIGIN[1] - VERTEX0[1],
      RAY_ORIGIN[2] - VERTEX0[2]
    );

    const U = F * vec3.dot(S, H);
    if (U < 0.0 || U > 1.0) return false;

    const Q = vec3.create();
    vec3.cross(Q, S, EDGE1);

    const V = F * vec3.dot(RAY_DIRECTION, Q);
    if (V < 0.0 || U + V > 1.0) return false;

    const T = F * vec3.dot(EDGE2, Q);

    if (T > tMin && T < tMax) {
      hitRecord.t = T;
      hitRecord.position = ray.getPointAtParameter(T);
      hitRecord.normal = this.NORMAL;
      hitRecord.material = this.MATERIAL;
      hitRecord.u = U;
      hitRecord.v = V;

      return true;
    } else return false; // Line intersection but not a ray intersection.
  }

  // ______________________________________________________________________ AABB

  createAABB() {}

  // ____________________________________________________________________ Normal

  setNormal(x, y, z) {
    this.NORMAL[0] = x;
    this.NORMAL[1] = y;
    this.NORMAL[2] = z;
  }

  flipNormal() {
    this.NORMAL[0] = -this.NORMAL[0];
    this.NORMAL[1] = -this.NORMAL[1];
    this.NORMAL[2] = -this.NORMAL[2];
  }
}
