export default class Statistics {
  static reset() {
    this.intersectionTestsSphere = 0;
    this.intersectionTestsSphereSuccess = 0;

    this.intersectionTestsTriangle = 0;
    this.intersectionTestsTriangleSuccess = 0;
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

  static onIntersectionTestSphereSuccess() {
    this.intersectionTestsSphereSuccess++;
  }

  static addIntersectionTestsSphereSuccess(tests) {
    this.intersectionTestsSphereSuccess += tests;
  }

  static getIntersectionTestsSphereSuccess() {
    return this.intersectionTestsSphereSuccess;
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

  static onIntersectionTestTriangleSuccess() {
    this.intersectionTestsTriangleSuccess++;
  }

  static addIntersectionTestsTriangleSuccess(tests) {
    this.intersectionTestsTriangleSuccess += tests;
  }

  static getIntersectionTestsTriangleSuccess() {
    return this.intersectionTestsTriangleSuccess;
  }
}
