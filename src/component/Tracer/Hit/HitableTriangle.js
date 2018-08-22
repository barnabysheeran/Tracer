import { vec3 } from "gl-matrix";

import Hitable from "./Hitable";

export default class HitableTriangle extends Hitable {
  constructor(v0, v1, v2, material) {
    super();

    this.VERTEX0 = v0;
    this.VERTEX1 = v1;
    this.VERTEX2 = v2;

    this.MATERIAL = material;

    // // Edges
    // this.EDGE0 = vec3.fromValues(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]);

    // this.EDGE1 = vec3.fromValues(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]);

    // this.EDGE2 = vec3.fromValues(p0[0] - p2[0], p0[1] - p2[1], p0[2] - p2[2]);

    // // Calc normal
    // const P0P1 = vec3.fromValues(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]);

    // const P0P2 = vec3.fromValues(p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]);

    // this.NORMAL = vec3.create();
    // vec3.cross(this.NORMAL, P0P1, P0P2);
    // //vec3.normalize(this.NORMAL, this.NORMAL);

    // console.log("Tri: Normal " + this.NORMAL);
  }

  // https://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm
  didHit(ray, tMin, tMax, hitRecord) {
    const RAY_ORIGIN = ray.getPositionOrigin();
    const RAY_DIRECTION = ray.getDirection();

    const EPSILON = 0.0000001;
    const VERTEX0 = this.VERTEX0;
    const VERTEX1 = this.VERTEX1;
    const VERTEX2 = this.VERTEX2;

    // edge1 = vertex1 - vertex0;
    const EDGE1 = vec3.fromValues(
      VERTEX1[0] - VERTEX0[0],
      VERTEX1[1] - VERTEX0[1],
      VERTEX1[2] - VERTEX0[2]
    );

    // edge2 = vertex2 - vertex0;
    const EDGE2 = vec3.fromValues(
      VERTEX2[0] - VERTEX0[0],
      VERTEX2[1] - VERTEX0[1],
      VERTEX2[2] - VERTEX0[2]
    );

    // h = rayVector.crossProduct(edge2);
    const H = vec3.create();
    vec3.cross(H, RAY_DIRECTION, EDGE2);

    // a = edge1.dotProduct(h);
    const A = vec3.dot(EDGE1, H);
    if (A > -EPSILON && A < EPSILON) return false;

    // f = 1/a;
    const F = 1.0 / A;

    // s = rayOrigin - vertex0;
    const S = vec3.fromValues(
      RAY_ORIGIN[0] - VERTEX0[0],
      RAY_ORIGIN[1] - VERTEX0[1],
      RAY_ORIGIN[2] - VERTEX0[2]
    );

    // u = f * (s.dotProduct(h));
    const U = F * vec3.dot(S, H);
    if (U < 0.0 || U > 1.0) return false;

    // q = s.crossProduct(edge1);
    const Q = vec3.create();
    vec3.cross(Q, S, EDGE1);

    // v = f * rayVector.dotProduct(q);
    const V = F * vec3.dot(RAY_DIRECTION, Q);
    if (V < 0.0 || U + V > 1.0) return false;

    // At this stage we can compute t to find out where the intersection point is on the line.
    // float t = f * edge2.dotProduct(q);
    const T = F * vec3.dot(EDGE2, Q);

    if (T > EPSILON) {
      //outIntersectionPoint = rayOrigin + rayVector * t;

      hitRecord.t = T;
      hitRecord.position = ray.getPointAtParameter(T);
      hitRecord.normal = vec3.fromValues(0, 1, 0); //TODO
      hitRecord.material = this.MATERIAL;
      hitRecord.u = U;
      hitRecord.v = V;

      return true;
    } else return false; // This means that there is a line intersection but not a ray intersection.
  }
}

//   didHit(ray, tMin, tMax, hitRecord) {
//     const NORMAL = this.NORMAL;
//     const RAY_ORIGIN = ray.getPositionOrigin();
//     const RAY_DIRECTION = ray.getDirection();

//     const P0 = this.P0;
//     const P1 = this.P1;
//     const P2 = this.P2;

//     const EDGE0 = this.EDGE0;
//     const EDGE1 = this.EDGE1;
//     const EDGE2 = this.EDGE2;

//     // Parallel ?
//     const DOT_NORMAL_DIRECTION = vec3.dot(NORMAL, RAY_DIRECTION);

//     if (Math.abs(DOT_NORMAL_DIRECTION) < 0.0000001) {
//       //console.log("no parallel");

//       return false;
//     }

//     const D = vec3.dot(NORMAL, P0);

//     //console.log(D);

//     let temp = (vec3.dot(NORMAL, RAY_ORIGIN) + D) / DOT_NORMAL_DIRECTION;

//     // if (temp < 0) {
//     //   return false;
//     // }

//     if (temp < tMin || temp > tMax) {
//       return false;
//     }

//     // Intersection Point
//     const P = vec3.fromValues(
//       RAY_ORIGIN[0] + temp * RAY_DIRECTION[0],
//       RAY_ORIGIN[1] + temp * RAY_DIRECTION[1],
//       RAY_ORIGIN[2] + temp * RAY_DIRECTION[2]
//     );

//     // Inside / Outside
//     let c = vec3.create();

//     // Edge 0
//     const VP0 = vec3.fromValues(P[0] - P0[0], P[1] - P0[1], P[2] - P0[2]);

//     vec3.cross(c, EDGE0, VP0);

//     if (vec3.dot(NORMAL, c) < 0) {
//       return false;
//     }

//     // Edge 1
//     const VP1 = vec3.fromValues(P[0] - P1[0], P[1] - P1[1], P[2] - P1[2]);

//     vec3.cross(c, EDGE1, VP1);

//     if (vec3.dot(NORMAL, c) < 0) {
//       return false;
//     }

//     // Edge 2
//     const VP2 = vec3.fromValues(P[0] - P2[0], P[1] - P2[1], P[2] - P2[2]);

//     vec3.cross(c, EDGE2, VP2);

//     if (vec3.dot(NORMAL, c) < 0) {
//       return false;
//     }

//     // Good
//     hitRecord.t = temp;
//     hitRecord.position = ray.getPointAtParameter(temp);
//     hitRecord.normal = vec3.fromValues(NORMAL[0], NORMAL[1], NORMAL[2]);
//     hitRecord.material = this.MATERIAL;

//     hitRecord.u = 0; // TODO from P
//     hitRecord.v = 0;

//     return true;
//   }
// }
