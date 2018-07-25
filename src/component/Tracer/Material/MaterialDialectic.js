import { vec3 } from "gl-matrix";

import { reflect, refract, schlick } from "../Util/util";

export default class MaterialLambertian {
  constructor(indexRefraction) {
    this.INDEX_REFRACTION = indexRefraction;
  }

  scatter(rayIn, hitRecord, attenuation, scattered) {
    const INDEX_REFRACTION = this.INDEX_REFRACTION;

    let outwardNormal = vec3.create();
    let reflected = reflect(rayIn.getDirection(), hitRecord.normal);

    let refracted = vec3.create();

    let niOverNt;
    let reflect_prob;
    let cosine;

    // Attenuation
    attenuation[0] = 1.0;
    attenuation[1] = 1.0;
    attenuation[2] = 1.0;

    if (vec3.dot(rayIn.getDirection(), hitRecord.normal) > 0) {
      outwardNormal[0] = -hitRecord.normal[0];
      outwardNormal[1] = -hitRecord.normal[1];
      outwardNormal[2] = -hitRecord.normal[2];

      niOverNt = INDEX_REFRACTION;

      cosine =
        (INDEX_REFRACTION * vec3.dot(rayIn.getDirection(), hitRecord.normal)) /
        vec3.length(rayIn.getDirection());
    } else {
      outwardNormal[0] = hitRecord.normal[0];
      outwardNormal[1] = hitRecord.normal[1];
      outwardNormal[2] = hitRecord.normal[2];

      niOverNt = 1.0 - INDEX_REFRACTION;

      cosine =
        -vec3.dot(rayIn.getDirection(), hitRecord.normal) /
        vec3.length(rayIn.getDirection());
    }

    // if (
    //   refract(rayIn.getDirection(), outwardNormal, niOverNt, refracted) == true
    // ) {
    //   reflect_prob = schlick(cosine, INDEX_REFRACTION);
    // } else {
    //   // scattered[0] = 0; // TODO
    //   // scattered[1] = 0;
    //   // scattered[2] = 0;

    //   reflect_prob = 1.0;
    // }

    // if (Math.random() < reflect_prob) {
    //   // scattered = ray(hitRecord.)
    // } else {
    // }

    return true;
  }
}
