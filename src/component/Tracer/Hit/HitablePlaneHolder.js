export default class HitablePlaneHolder {
  // Looking at the plane define corners p0: Bottom left then anti-clockwise

  constructor(scene, p0, p1, p2, p3, material) {
    this.TRIANGLE_0 = scene.addTriangle(p0, p1, p3, material);
    this.TRIANGLE_1 = scene.addTriangle(p2, p3, p1, material);

    this.TRIANGLE_1.flipTextureCoordinates(true);
  }
}
