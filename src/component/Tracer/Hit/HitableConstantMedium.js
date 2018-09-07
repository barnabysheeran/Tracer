import { vec3 } from "gl-matrix";

import Hitable from "./Hitable";
import HitRecord from "./HitRecord";

import MaterialIsotropic from "./../Material/MaterialIsotropic";

export default class HitableConstantMedium extends Hitable {
  constructor(boundary, density, texture) {
    super();

    this.HITABLE_BOUNDARY = boundary;
    this.DENSITY = density;
    this.TEXTURE = texture;

    this.NORMAL = vec3.fromValues(1, 0, 0); // Arbitrary normal

    this.MATERIAL = new MaterialIsotropic(texture);

    // BB
    this.boundingBox = this.HITABLE_BOUNDARY.boundingBox;
  }

  // _______________________________________________________________________ Hit

  didHit(ray, tMin, tMax, hitRecord) {
    const HITABLE_BOUNDARY = this.HITABLE_BOUNDARY;

    let hitRecord1 = new HitRecord();
    let hitRecord2 = new HitRecord();

    if (HITABLE_BOUNDARY.didHit(ray, -Infinity, Infinity, hitRecord1)) {
      if (
        HITABLE_BOUNDARY.didHit(ray, hitRecord1.t + 0.001, Infinity, hitRecord2)
      ) {
        if (hitRecord1.t < tMin) {
          hitRecord1.t = tMin;
        }

        if (hitRecord2.t > tMax) {
          hitRecord2.t = tMax;
        }

        if (hitRecord1.t >= hitRecord2.t) {
          return false;
        }

        if (hitRecord1.t < 0) {
          hitRecord1.t = 0;
        }

        const RAY_DIRECTION_LENGTH = vec3.length(ray.getDirection());

        const DISTANCE_INSIDE_BOUNDARY =
          (hitRecord2.t - hitRecord1.t) * RAY_DIRECTION_LENGTH;

        const HIT_DISTANCE = -(1.0 / this.DENSITY) * Math.log(Math.random());

        if (HIT_DISTANCE < DISTANCE_INSIDE_BOUNDARY) {
          hitRecord.t = hitRecord1.t + HIT_DISTANCE / RAY_DIRECTION_LENGTH;
          hitRecord.position = ray.getPointAtParameter(hitRecord.t);
          hitRecord.normal = this.NORMAL;
          hitRecord.material = this.MATERIAL;

          return true;
        }
      }
    }

    return false;
  }
}
