import { vec3 } from "gl-matrix";

export function getRandominUnitSphere() {
  // TODO Optimise
  let p = vec3.fromValues(Infinity, Infinity, Infinity);

  while (vec3.squaredLength(p) >= 1.0) {
    p[0] = Math.random() * 2.0 - 1.0;
    p[1] = Math.random() * 2.0 - 1.0;
    p[2] = Math.random() * 2.0 - 1.0;
  }

  return p;
}

export function reflect(direction, normal) {
  let dot = vec3.dot(direction, normal);

  return vec3.fromValues(
    direction[0] - 2 * dot * normal[0],
    direction[1] - 2 * dot * normal[1],
    direction[2] - 2 * dot * normal[2]
  );
}

export function refract() {}
