import { vec3 } from "gl-matrix";

import Scene from "./Scene";

import TextureConstant from "../Texture/TextureConstant";
import MaterialMetal from "../Material/MaterialMetal";

import { HSVtoRGB } from "../Util/colour";

export default class SceneBunny extends Scene {
  constructor(cameraController) {
    super(cameraController);

    // 'Floor'
    const TEXTURE_FLOOR = new TextureConstant(vec3.fromValues(0.8, 0.8, 0.8));

    this.addSphere(
      vec3.fromValues(0.0, -100.5, -1.0),
      100,
      new MaterialMetal(TEXTURE_FLOOR, 0.5)
    );
  }

  // ______________________________________________________________________ Init

  init() {
    this.reset();

    // Materials
    const TEXTURE_METAL_WHITE = new TextureConstant(
      vec3.fromValues(1.0, 1.0, 1.0)
    );
    const MATERIAL_METAL_WHITE = new MaterialMetal(TEXTURE_METAL_WHITE, 0.05);

    const TEXTURE_METAL = new TextureConstant(vec3.fromValues(0.5, 0.5, 0.5));
    const MATERIAL_METAL = new MaterialMetal(TEXTURE_METAL, 0.1);

    // Mesh
    const CELLS = this.getMeshCells(0);
    const POSITIONS = this.getMeshPositions(0);
    //const NORMALS = this.getMeshNormals(0);

    // TODO Remove main thread renderer instance
    if (POSITIONS == undefined) {
      return;
    }

    let i;
    let p0;
    let p1;
    let p2;

    for (i = 0; i < CELLS.length; i++) {
      p0 = POSITIONS[CELLS[i][0]];
      p1 = POSITIONS[CELLS[i][1]];
      p2 = POSITIONS[CELLS[i][2]];

      this.addTriangle(
        vec3.fromValues(p0[0], p0[1], p0[2]),
        vec3.fromValues(p1[0], p1[1], p1[2]),
        vec3.fromValues(p2[0], p2[1], p2[2]),
        MATERIAL_METAL_WHITE
      );
    }

    // Colours
    let total = 27;
    let progressIntervalTau = (Math.PI * 2) / total;
    let progressInterval = 1.0 / total;

    let radius = 60.0;
    let colour;
    let texture;
    let material;

    for (let i = 0; i < total; i++) {
      colour = HSVtoRGB(progressInterval * i, 0.8, 0.8);

      texture = new TextureConstant(
        vec3.fromValues(colour.r, colour.g, colour.b)
      );

      // Material
      material = new MaterialMetal(texture, 0.1);

      // Sphere
      this.addSphere(
        vec3.fromValues(
          Math.sin(progressIntervalTau * i) * radius,
          4.01,
          Math.cos(progressIntervalTau * i) * radius
        ),
        4,
        material
      );
    }

    // Floor
    const FLOOR_PLANE_DIMENSION_HALF = 140;

    this.addPlane(
      vec3.fromValues(
        -FLOOR_PLANE_DIMENSION_HALF,
        0.0,
        -FLOOR_PLANE_DIMENSION_HALF
      ),
      vec3.fromValues(
        -FLOOR_PLANE_DIMENSION_HALF,
        0.0,
        FLOOR_PLANE_DIMENSION_HALF
      ),
      vec3.fromValues(
        FLOOR_PLANE_DIMENSION_HALF,
        0.0,
        FLOOR_PLANE_DIMENSION_HALF
      ),
      vec3.fromValues(
        FLOOR_PLANE_DIMENSION_HALF,
        0.0,
        -FLOOR_PLANE_DIMENSION_HALF
      ),
      MATERIAL_METAL
    );
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;

    // Camera
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;

    CAMERA_CONTROLLER.setFov(16.0);
    CAMERA_CONTROLLER.setAperture(0.5);

    CAMERA_CONTROLLER.setPosition(-300.0, 150.0, 300.0);
    CAMERA_CONTROLLER.setPositionTarget(0.0, 30.0, 0.0);
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    let t = 0.5 * (rayDirectionNormalized[1] + 1.0);
    let white = 1.0 - t;

    return vec3.fromValues(white + 0.5 * t, white + 0.7 * t, white + 1.0 * t);
  }
}
