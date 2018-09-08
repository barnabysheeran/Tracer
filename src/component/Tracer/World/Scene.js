import { vec3 } from "gl-matrix";

import HitableSphere from "../Hit/HitableSphere";
import HitableTriangle from "../Hit/HitableTriangle";
import HitablePlaneHolder from "../Hit/HitablePlaneHolder";

import HitableNode from "../Hit/HitableNode";
import HitableBox from "../Hit/HitableBox";

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

  addPlane(p0, p1, p2, p3, material) {
    return new HitablePlaneHolder(this, p0, p1, p2, p3, material);
  }

  // _______________________________________________________________________ Box

  addBox(width, height, depth, material) {
    return new HitableBox(this, width, height, depth, material);
  }

  // _______________________________________________________________________ BVH

  buildBVH() {
    this.bvhRoot = new HitableNode(this.HITABLES, 0);

    this.bvhRoot.createBoundingBox();
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
