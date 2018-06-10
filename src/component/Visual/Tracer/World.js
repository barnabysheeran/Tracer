import Sphere from "./Sphere";
//import HitRecord from "./HitRecord";

export default class World {
  constructor() {
    this.HITABLES = [];
    this.hitRecord; // = new HitRecord();
  }

  addSphere(position, radius) {
    this.HITABLES.push(new Sphere(position, radius));
  }

  didHitAnything(ray, tMin, tMax) {
    const HITABLES = this.HITABLES;

    let hit = false;
    let closest = tMax;
    let i;

    for (i = 0; i < HITABLES.length; i++) {
      if (HITABLES[i].didHit(ray, tMin, closest) == true) {
        hit = true;
        closest = HITABLES[i].hitRecord.r;
        this.hitRecord = HITABLES[i].hitRecord;
      }
    }

    return hit;
  }
}
