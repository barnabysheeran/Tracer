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

// export function rainbow(t) {
//   // TODO Test
//   let r = t * 2.1 - 1.8;
//   let g = t * 2.1 - 1.14;
//   let b = t * 2.1 - 0.3;

//   return [1.0 - r * r, 1.0 - g * g, 1.0 - b * b];
// }

// vec3 Geoffrey(float t)
// {
//     vec3 r = t * 2.1 - vec3(1.8, 1.14, 0.3);
//     return 1.0 - r * r;
// }
