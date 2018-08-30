export default class Statistics {
  static reset() {
    this.intersectionTestsSphere = 0;
    this.intersectionTestsTriangle = 0;
  }

  // ____________________________________________________________________ Sphere

  static onIntersectionTestSphere() {
    this.intersectionTestsSphere++;
  }

  static addIntersectionTestsSphere(tests) {
    this.intersectionTestsSphere += tests;
  }

  static getIntersectionTestsSphere() {
    return this.intersectionTestsSphere;
  }

  // __________________________________________________________________ Triangle

  static onIntersectionTestTriangle() {
    this.intersectionTestsTriangle++;
  }

  static addIntersectionTestsTriangle(tests) {
    this.intersectionTestsTriangle += tests;
  }

  static getIntersectionTestsTriangle() {
    return this.intersectionTestsTriangle;
  }
}
