import { vec3 } from "gl-matrix";

import Material from "./Material";

import { reflect, refract, schlick } from "../Util/util";

export default class MaterialDielectric extends Material {
  constructor(indexRefraction) {
    super();

    this.INDEX_REFRACTION = indexRefraction;
  }

  // ___________________________________________________________________ Scatter

  scatter(rayIn, hitRecord, attenuation, scattered) {
    const INDEX_REFRACTION = this.INDEX_REFRACTION;

    let outwardNormal = vec3.create();
    //let reflected = reflect(rayIn.getDirectionNormalized(), hitRecord.normal);
    let reflected = reflect(rayIn.getDirection(), hitRecord.normal);
    let refracted = vec3.create();

    let niOverNt;
    let reflectPropability;
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

    if (
      refract(rayIn.getDirection(), outwardNormal, niOverNt, refracted) == true
    ) {
      reflectPropability = schlick(cosine, INDEX_REFRACTION);
    } else {
      reflectPropability = 1.0;
    }

    // Scattered
    scattered.setPositionOrigin(
      hitRecord.position[0],
      hitRecord.position[1],
      hitRecord.position[2]
    );

    if (Math.random() < reflectPropability) {
      scattered.setDirection(reflected[0], reflected[1], reflected[2]);
    } else {
      scattered.setDirection(refracted[0], refracted[1], refracted[2]);
    }

    return true;
  }
}
