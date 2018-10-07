import { vec3 } from "gl-matrix";

import AABB from "./AABB";
import Hitable from "./Hitable";

export default class HitableTriangle extends Hitable {
  constructor(v0, v1, v2, material) {
    super();

    // Vertex
    this.VERTEX0 = null;
    this.VERTEX1 = null;
    this.VERTEX2 = null;

    // Edges
    this.EDGE1 = null;
    this.EDGE2 = null;

    // Normal
    this.NORMAL = vec3.create();

    // Set Vertex, build edges, center and normal
    this.setVertex(v0, v1, v2);

    // Material
    this.MATERIAL = material;

    // Texture Coordinates
    this.textureCoordinatesFlipped = false;
  }

  // _______________________________________________________________________ Hit

  // https://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm

  didHit(ray, tMin, tMax, hitRecord) {
    // Bounding box hit
    if (this.boundingBox.didHit(ray, tMin, tMax) == false) {
      return false;
    }

    // Hit
    const RAY_ORIGIN = ray.getPositionOrigin();
    const RAY_DIRECTION = ray.getDirection();

    const EPSILON = 0.0000001;
    const VERTEX0 = this.VERTEX0;

    const EDGE1 = this.EDGE1;
    const EDGE2 = this.EDGE2;

    const H = vec3.create();
    vec3.cross(H, RAY_DIRECTION, EDGE2);

    const A = vec3.dot(EDGE1, H);
    if (A > -EPSILON && A < EPSILON) return false;

    // One sided // TODO Pass as param
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
      // Set
      hitRecord.t = T;
      hitRecord.position = ray.getPointAtParameter(T);
      hitRecord.normal = this.NORMAL;
      hitRecord.material = this.MATERIAL;

      if (this.textureCoordinatesFlipped == true) {
        hitRecord.u = 1.0 - U;
        hitRecord.v = 1.0 - V;
      } else {
        hitRecord.u = U;
        hitRecord.v = V;
      }

      return true;
    } else return false; // Line intersection but not a ray intersection.
  }

  // ____________________________________________________________________ Vertex

  setVertex(v0, v1, v2) {
    // Vertex
    this.VERTEX0 = v0;
    this.VERTEX1 = v1;
    this.VERTEX2 = v2;

    // Edges
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

    // Generate Normal
    vec3.cross(this.NORMAL, this.EDGE1, this.EDGE2);
    vec3.normalize(this.NORMAL, this.NORMAL);

    // BB
    this.createBoundingBox();

    // Center
    this.generatePositionCenter();
  }

  // ______________________________________________________________________ AABB

  createBoundingBox() {
    const VERTEX0 = this.VERTEX0;
    const VERTEX1 = this.VERTEX1;
    const VERTEX2 = this.VERTEX2;

    let min = vec3.fromValues(Infinity, Infinity, Infinity);
    let max = vec3.fromValues(-Infinity, -Infinity, -Infinity);

    const X = [VERTEX0[0], VERTEX1[0], VERTEX2[0]];
    const Y = [VERTEX0[1], VERTEX1[1], VERTEX2[1]];
    const Z = [VERTEX0[2], VERTEX1[2], VERTEX2[2]];

    let i;

    for (i = 0; i < 3; i++) {
      // X
      if (X[i] < min[0]) {
        min[0] = X[i];
      }
      if (X[i] > max[0]) {
        max[0] = X[i];
      }

      // Y
      if (Y[i] < min[1]) {
        min[1] = Y[i];
      }
      if (Y[i] > max[1]) {
        max[1] = Y[i];
      }

      // Z
      if (Z[i] < min[2]) {
        min[2] = Z[i];
      }
      if (Z[i] > max[2]) {
        max[2] = Z[i];
      }
    }

    this.boundingBox = new AABB(min, max);
  }

  // ____________________________________________________________________ Center

  generatePositionCenter() {
    const VERTEX0 = this.VERTEX0;
    const VERTEX1 = this.VERTEX1;
    const VERTEX2 = this.VERTEX2;

    this.positionCenter = vec3.fromValues(
      (VERTEX0[0] + VERTEX1[0] + VERTEX2[0]) / 3.0,
      (VERTEX0[1] + VERTEX1[1] + VERTEX2[1]) / 3.0,
      (VERTEX0[2] + VERTEX1[2] + VERTEX2[2]) / 3.0
    );
  }

  getPositionCenter() {
    return this.positionCenter;
  }

  // _______________________________________________________ Texture Coordinates

  flipTextureCoordinates(flip) {
    this.textureCoordinatesFlipped = flip;
  }
}
