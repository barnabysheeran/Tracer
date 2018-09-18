import { vec3, quat } from "gl-matrix";

export default class HitablePlaneHolder {
  // Looking at the plane define corners p0: Bottom left then anti-clockwise

  constructor(scene, width, height, material) {
    this.WIDTH_HALF = width * 0.5;
    this.HEIGHT_HALF = height * 0.5;

    this.position = vec3.create();
    this.rotation = quat.create();

    this.TRIANGLE_0 = scene.addTriangle(
      vec3.create(),
      vec3.create(),
      vec3.create(),
      material
    );

    this.TRIANGLE_1 = scene.addTriangle(
      vec3.create(),
      vec3.create(),
      vec3.create(),
      material
    );
    this.TRIANGLE_1.flipTextureCoordinates(true);

    // Update
    this.update();
  }

  // __________________________________________________________________ Position

  setPosition(x, y, z) {
    const POSITION = this.position;

    POSITION[0] = x;
    POSITION[1] = y;
    POSITION[2] = z;

    this.update();
  }

  // __________________________________________________________________ Rotation

  setRotationEuler(x, y, z) {
    quat.fromEuler(this.rotation, x, y, z);

    this.update();
  }

  // ____________________________________________________________________ Update

  update() {
    const WIDTH_HALF = this.WIDTH_HALF;
    const HEIGHT_HALF = this.HEIGHT_HALF;

    const POSITION = this.position;
    const ROTATION = this.rotation;

    const P0 = vec3.fromValues(-WIDTH_HALF, -HEIGHT_HALF, 0.0);
    const P1 = vec3.fromValues(WIDTH_HALF, -HEIGHT_HALF, 0.0);
    const P2 = vec3.fromValues(WIDTH_HALF, HEIGHT_HALF, 0.0);
    const P3 = vec3.fromValues(-WIDTH_HALF, HEIGHT_HALF, 0.0);

    // Rotation
    vec3.transformQuat(P0, P0, ROTATION);
    vec3.transformQuat(P1, P1, ROTATION);
    vec3.transformQuat(P2, P2, ROTATION);
    vec3.transformQuat(P3, P3, ROTATION);

    // Position
    vec3.add(P0, P0, POSITION);
    vec3.add(P1, P1, POSITION);
    vec3.add(P2, P2, POSITION);
    vec3.add(P3, P3, POSITION);

    // Set
    this.TRIANGLE_0.setVertex(P0, P1, P3);
    this.TRIANGLE_1.setVertex(P2, P3, P1);
  }
}
