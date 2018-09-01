import { vec3 } from "gl-matrix";

import HitableSphere from "../Hit/HitableSphere";
import HitableTriangle from "../Hit/HitableTriangle";
import HitablePlane from "../Hit/HitablePlane"; // OLD

import HitableNode from "../Hit/HitableNode";

export default class Scene {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;

    this.animationFrameMax = 0;

    this.HITABLES = [];
    this.bvhRoot = null;

    this.textureImageDimensions = [];
    this.textureImageData = [];

    this.meshPositions = [];
    this.meshNormals = [];
    this.meshCells = [];
  }

  // ______________________________________________________________________ Init

  init() {}

  // _____________________________________________________________________ Reset

  reset() {
    this.HITABLES = [];
    this.BVH_ROOT = null;
  }

  // ____________________________________________________________________ Sphere

  addSphere(position, radius, material) {
    const SPHERE = new HitableSphere(position, radius, material);

    this.HITABLES.push(SPHERE);

    return SPHERE;
  }

  // __________________________________________________________________ Triangle

  addTriangle(p0, p1, p2, material) {
    const TRIANGLE = new HitableTriangle(p0, p1, p2, material);

    this.HITABLES.push(TRIANGLE);

    return TRIANGLE;
  }

  // _____________________________________________________________________ Plane

  addOldPlane(width, height, material) {
    const PLANE = new HitablePlane(width, height, material);

    this.HITABLES.push(PLANE);

    return PLANE;
  }

  addPlane(p0, p1, p2, p3, material) {
    const TRIANGLE_0 = this.addTriangle(p0, p1, p3, material);
    const TRIANGLE_1 = this.addTriangle(p1, p2, p3, material);

    return [TRIANGLE_0, TRIANGLE_1];
  }

  // _______________________________________________________________________ Box

  addBox(p0, p1, p2, p3, p4, p5, p6, p7, material) {
    const PLANE_0 = this.addPlane(p0, p1, p2, p3, material); // TODO
    const PLANE_1 = this.addPlane(p0, p1, p2, p3, material); // TODO
    const PLANE_2 = this.addPlane(p0, p1, p2, p3, material); // TODO
    const PLANE_3 = this.addPlane(p0, p1, p2, p3, material); // TODO
    const PLANE_4 = this.addPlane(p0, p1, p2, p3, material); // TODO
    const PLANE_5 = this.addPlane(p0, p1, p2, p3, material); // TODO

    return [
      PLANE_0[0],
      PLANE_0[1],
      PLANE_1[0],
      PLANE_1[1],
      PLANE_2[0],
      PLANE_2[1],
      PLANE_3[0],
      PLANE_3[1],
      PLANE_4[0],
      PLANE_4[1],
      PLANE_5[0],
      PLANE_5[1]
    ];
  }

  // _______________________________________________________________________ BVH

  buildBVH() {
    this.bvhRoot = new HitableNode(this.HITABLES, 0);

    this.bvhRoot.createBoundingBox();

    // //console.log("Build BVH");
    // const BVH_ROOT = this.BVH_ROOT;

    // BVH_ROOT.populate(this.HITABLES, 0);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    time;
  }

  getAnimationFrameMax() {
    return this.animationFrameMax;
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    rayDirectionNormalized;

    return vec3.fromValues(0.5, 0.5, 0.5);
  }

  // __________________________________________________________ TextureImageData

  setTextureImageDimensions(dimensions) {
    this.textureImageDimensions = dimensions;
  }

  setTextureImageData(data) {
    this.textureImageData = data;
  }

  getTextureImageDimensions(textureId) {
    return this.textureImageDimensions[textureId];
  }

  getTextureImageData(textureId) {
    return this.textureImageData[textureId];
  }

  // _________________________________________________________________ Mesh Data

  setMeshes(positions, normals, cells) {
    this.meshPositions = positions;
    this.meshNormals = normals;
    this.meshCells = cells;
  }

  getMeshPositions(assetId) {
    return this.meshPositions[assetId];
  }

  getMeshNormals(assetId) {
    return this.meshNormals[assetId];
  }

  getMeshCells(assetId) {
    return this.meshCells[assetId];
  }
}
