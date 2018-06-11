import HitableSphere from "./HitableSphere";
import HitRecord from "./HitRecord";

export default class World {
  constructor() {
    this.HITABLES = [];
  }

  addSphere(position, radius) {
    this.HITABLES.push(new HitableSphere(position, radius));
  }

  didHitAnything(ray, tMin, tMax, hitRecord) {
    const HITABLES = this.HITABLES;

    let hitRecordTemp = new HitRecord();

    let hit = false;
    let closest = tMax;
    let i;

    for (i = 0; i < HITABLES.length; i++) {
      if (HITABLES[i].didHit(ray, tMin, closest, hitRecordTemp) == true) {
        hit = true;
        closest = hitRecordTemp.t;
        hitRecordTemp.cloneThisInto(hitRecord);
      }
    }

    return hit;
  }
}
