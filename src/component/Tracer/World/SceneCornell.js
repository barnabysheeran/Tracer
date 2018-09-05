import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import TextureSimplex from "../Texture/TextureSimplex";
import TextureImage from "../Texture/TextureImage";

import MaterialLambertian from "../Material/MaterialLambertian";
import MaterialDielectric from "../Material/MaterialDielectric";
import MaterialLightDiffuse from "../Material/MaterialLightDiffuse";
import MaterialMetal from "../Material/MaterialMetal";

export default class SceneCornell extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // Dimension
    this.CORNELL_WIDTH = 200.0;
    this.CORNELL_WIDTH_HALF = this.CORNELL_WIDTH * 0.5;

    this.CORNELL_DEPTH = 200.0;
    this.CORNELL_DEPTH_HALF = this.CORNELL_DEPTH * 0.5;

    this.CORNELL_HEIGHT = 200.0;
    this.CORNELL_HEIGHT_HALF = this.CORNELL_HEIGHT * 0.5;

    // Corners Left
    this.CORNER_LEFT_TOP_FRONT = vec3.fromValues(
      -this.CORNELL_WIDTH_HALF,
      this.CORNELL_HEIGHT_HALF,
      this.CORNELL_DEPTH_HALF
    );

    this.CORNER_LEFT_TOP_BACK = vec3.fromValues(
      -this.CORNELL_WIDTH_HALF,
      this.CORNELL_HEIGHT_HALF,
      -this.CORNELL_DEPTH_HALF
    );

    this.CORNER_LEFT_BOTTOM_FRONT = vec3.fromValues(
      -this.CORNELL_WIDTH_HALF,
      -this.CORNELL_HEIGHT_HALF,
      this.CORNELL_DEPTH_HALF
    );

    this.CORNER_LEFT_BOTTOM_BACK = vec3.fromValues(
      -this.CORNELL_WIDTH_HALF,
      -this.CORNELL_HEIGHT_HALF,
      -this.CORNELL_DEPTH_HALF
    );

    // Corners Right
    this.CORNER_RIGHT_TOP_FRONT = vec3.fromValues(
      this.CORNELL_WIDTH_HALF,
      this.CORNELL_HEIGHT_HALF,
      this.CORNELL_DEPTH_HALF
    );

    this.CORNER_RIGHT_TOP_BACK = vec3.fromValues(
      this.CORNELL_WIDTH_HALF,
      this.CORNELL_HEIGHT_HALF,
      -this.CORNELL_DEPTH_HALF
    );

    this.CORNER_RIGHT_BOTTOM_FRONT = vec3.fromValues(
      this.CORNELL_WIDTH_HALF,
      -this.CORNELL_HEIGHT_HALF,
      this.CORNELL_DEPTH_HALF
    );

    this.CORNER_RIGHT_BOTTOM_BACK = vec3.fromValues(
      this.CORNELL_WIDTH_HALF,
      -this.CORNELL_HEIGHT_HALF,
      -this.CORNELL_DEPTH_HALF
    );

    // Spheres
    this.SPHERE_RADIUS = 30.0;
    this.SPHERE_RADIUS_INNER = 25.0;
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Materials Walls
    const TEXTURE_WHITE = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));
    const MATERIAL_WHITE = new MaterialMetal(TEXTURE_WHITE, 0.0);

    const TEXTURE_RED = new TextureConstant(vec3.fromValues(0.8, 0.1, 0.1));
    const MATERIAL_RED = new MaterialMetal(TEXTURE_RED, 0.0);

    const TEXTURE_GREEN = new TextureConstant(vec3.fromValues(0.1, 0.8, 0.1));
    const MATERIAL_GREEN = new MaterialMetal(TEXTURE_GREEN, 0.0);

    // Texture Image
    // const TEXTURE_TEST_A = new TextureImage(
    //   this.getTextureImageDimensions(2),
    //   this.getTextureImageData(2)
    // );

    // const MATERIAL_IMAGE_A = new MaterialLambertian(TEXTURE_TEST_A, 0.0);

    // Floor
    this.addPlane(
      this.CORNER_LEFT_BOTTOM_FRONT,
      this.CORNER_RIGHT_BOTTOM_FRONT,
      this.CORNER_RIGHT_BOTTOM_BACK,
      this.CORNER_LEFT_BOTTOM_BACK,
      MATERIAL_WHITE
    );

    // Roof
    this.addPlane(
      this.CORNER_LEFT_TOP_BACK,
      this.CORNER_RIGHT_TOP_BACK,
      this.CORNER_RIGHT_TOP_FRONT,
      this.CORNER_LEFT_TOP_FRONT,
      MATERIAL_WHITE
    );

    // Left
    this.addPlane(
      this.CORNER_LEFT_BOTTOM_FRONT,
      this.CORNER_LEFT_BOTTOM_BACK,
      this.CORNER_LEFT_TOP_BACK,
      this.CORNER_LEFT_TOP_FRONT,
      MATERIAL_RED
    );

    // Right
    this.addPlane(
      this.CORNER_RIGHT_BOTTOM_BACK,
      this.CORNER_RIGHT_BOTTOM_FRONT,
      this.CORNER_RIGHT_TOP_FRONT,
      this.CORNER_RIGHT_TOP_BACK,
      MATERIAL_GREEN
    );

    // Wall back
    this.addPlane(
      this.CORNER_LEFT_BOTTOM_BACK,
      this.CORNER_RIGHT_BOTTOM_BACK,
      this.CORNER_RIGHT_TOP_BACK,
      this.CORNER_LEFT_TOP_BACK,
      MATERIAL_WHITE
    );

    // Material Light
    const LIGHT_BRIGHTNESS = 3.0;

    const TEXTURE_LIGHT = new TextureConstant(
      vec3.fromValues(LIGHT_BRIGHTNESS, LIGHT_BRIGHTNESS, LIGHT_BRIGHTNESS)
    );

    const MATERIAL_LIGHT = new MaterialLightDiffuse(TEXTURE_LIGHT);

    // Test Light
    //this.addSphere(vec3.fromValues(0.0, 10.0, 0.0), 5.0, MATERIAL_LIGHT_RED);

    // Roof
    const LIGHT_SIZE_SCALAR = 0.5;

    this.addPlane(
      vec3.fromValues(
        this.CORNER_LEFT_TOP_BACK[0] * LIGHT_SIZE_SCALAR,
        this.CORNER_LEFT_TOP_BACK[1] - 0.01,
        this.CORNER_LEFT_TOP_BACK[0] * LIGHT_SIZE_SCALAR
      ),
      vec3.fromValues(
        this.CORNER_RIGHT_TOP_BACK[0] * LIGHT_SIZE_SCALAR,
        this.CORNER_RIGHT_TOP_BACK[1] - 0.01,
        this.CORNER_RIGHT_TOP_BACK[2] * LIGHT_SIZE_SCALAR
      ),
      vec3.fromValues(
        this.CORNER_RIGHT_TOP_FRONT[0] * LIGHT_SIZE_SCALAR,
        this.CORNER_RIGHT_TOP_FRONT[1] - 0.01,
        this.CORNER_RIGHT_TOP_FRONT[2] * LIGHT_SIZE_SCALAR
      ),
      vec3.fromValues(
        this.CORNER_LEFT_TOP_FRONT[0] * LIGHT_SIZE_SCALAR,
        this.CORNER_LEFT_TOP_FRONT[1] - 0.01,
        this.CORNER_LEFT_TOP_FRONT[2] * LIGHT_SIZE_SCALAR
      ),
      MATERIAL_LIGHT
    );

    // Spheres
    const TAU = Math.PI * 2.0;
    const ROTATION_OFFSET = Math.PI * -1.5;
    const SPHERE_POSITION_RADIUS = 60;

    // Sphere Dielectric
    const MATERIAL_DIELECTRIC = new MaterialDielectric(1.5);
    this.addSphere(
      vec3.fromValues(
        Math.cos(ROTATION_OFFSET) * SPHERE_POSITION_RADIUS,
        -this.CORNELL_DEPTH_HALF + this.SPHERE_RADIUS + 0.01,
        Math.sin(ROTATION_OFFSET) * SPHERE_POSITION_RADIUS
      ),
      this.SPHERE_RADIUS,
      MATERIAL_DIELECTRIC
    );
    // this.addSphere(
    //   vec3.fromValues(
    //     Math.cos(ROTATION_OFFSET) * SPHERE_POSITION_RADIUS,
    //     -this.CORNELL_DEPTH_HALF + this.SPHERE_RADIUS + 0.01,
    //     Math.sin(ROTATION_OFFSET) * SPHERE_POSITION_RADIUS
    //   ),
    //   -this.SPHERE_RADIUS_INNER,
    //   MATERIAL_DIELECTRIC
    // );

    // Sphere Metal
    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(0.9, 0.9, 0.9));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.1);
    this.addSphere(
      vec3.fromValues(
        Math.cos(ROTATION_OFFSET + TAU * 0.333) * SPHERE_POSITION_RADIUS,
        -this.CORNELL_DEPTH_HALF + this.SPHERE_RADIUS + 0.01,
        Math.sin(ROTATION_OFFSET + TAU * 0.333) * SPHERE_POSITION_RADIUS
      ),
      this.SPHERE_RADIUS,
      MATERIAL_METAL
    );

    // Sphere Marble
    const TEXTURE_SIMPLEX = new TextureSimplex(1);
    const MATERIAL_SIMPLEX = new MaterialLambertian(TEXTURE_SIMPLEX);

    this.addSphere(
      vec3.fromValues(
        Math.cos(ROTATION_OFFSET + TAU * 0.666) * SPHERE_POSITION_RADIUS,
        -this.CORNELL_DEPTH_HALF + this.SPHERE_RADIUS + 0.01,
        Math.sin(ROTATION_OFFSET + TAU * 0.666) * SPHERE_POSITION_RADIUS
      ),
      this.SPHERE_RADIUS,
      MATERIAL_SIMPLEX
    );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(17.0);
    CAMERA_CONTROLLER.setAperture(0.1);

    CAMERA_CONTROLLER.setPosition(1.0, 0.0, 800.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 0.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    // let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    // let white = 1.0 - t;

    // return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);

    return vec3.fromValues(0.0, 0.0, 0.0);
  }
}
