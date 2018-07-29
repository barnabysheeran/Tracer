import { vec3 } from "gl-matrix";

export function getRandominUnitSphere() {
  let p = vec3.fromValues(Infinity, Infinity, Infinity);

  while (vec3.squaredLength(p) >= 1.0) {
    p[0] = Math.random() * 2.0 - 1.0;
    p[1] = Math.random() * 2.0 - 1.0;
    p[2] = Math.random() * 2.0 - 1.0;
  }

  return p;
}

export function getRandomInUnitDisc() {
  let p = vec3.fromValues(Infinity, Infinity, Infinity);
  //let p = vec3.create();

  while (vec3.dot(p, p) >= 1.0) {
    p[0] = 2.0 * (Math.random() - 1.0);
    p[1] = 2.0 * (Math.random() - 1.0);
    p[2] = 0.0;
  }

  return p;
}

export function reflect(direction, normal) {
  const DOT = vec3.dot(direction, normal);

  return vec3.fromValues(
    direction[0] - 2 * DOT * normal[0],
    direction[1] - 2 * DOT * normal[1],
    direction[2] - 2 * DOT * normal[2]
  );
}

export function refract(direction, normal, niOverNt, refracted) {
  const UV = vec3.create();
  vec3.normalize(UV, direction);

  const DOT = vec3.dot(UV, normal);

  const DISCRIMINANT = 1.0 - niOverNt * niOverNt * (1.0 - DOT * DOT);

  if (DISCRIMINANT > 0) {
    const DISCRIMINANT_ROOT = Math.sqrt(DISCRIMINANT);

    refracted[0] =
      niOverNt * (UV[0] - normal[0] * DOT) - normal[0] * DISCRIMINANT_ROOT;
    refracted[1] =
      niOverNt * (UV[1] - normal[1] * DOT) - normal[1] * DISCRIMINANT_ROOT;
    refracted[2] =
      niOverNt * (UV[2] - normal[2] * DOT) - normal[2] * DISCRIMINANT_ROOT;

    return true;
  } else {
    return false;
  }
}

export function schlick(cosine, indexRefraction) {
  let r0 = (1.0 - indexRefraction) / (1.0 + indexRefraction);
  r0 = r0 * r0;
  return r0 + (1.0 - r0) * Math.pow(1.0 - cosine, 5);
}

export function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: r,
    g: g,
    b: b
  };
}
