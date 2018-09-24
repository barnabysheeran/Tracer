import { vec3 } from "gl-matrix";

import HitableNode from "../Hit/HitableNode";
import HitableSphere from "../Hit/HitableSphere";
import HitableTriangle from "../Hit/HitableTriangle";
import HitablePlaneHolder from "../Hit/HitablePlaneHolder";
import HitableBox from "../Hit/HitableBox";
import HitableConstantMedium from "../Hit/HitableConstantMedium";
import HitableText from "../Hit/HitableText";

import SceneHelper from "./Helper/SceneHelper";
import ColourRGBA from "../Colour/ColourRGBA";

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

    this.countTriangles = 0;
    this.countSpheres = 0;
    this.countVolumeSpheres = 0;
  }

  // ______________________________________________________________________ Init

  init() {}

  // _____________________________________________________________________ Reset

  reset() {
    this.HITABLES = [];
    this.BVH_ROOT = null;

    this.countTriangles = 0;
    this.countSpheres = 0;
    this.countVolumeSpheres = 0;
  }

  // ____________________________________________________________________ Sphere

  addSphere(position, radius, material) {
    // TODO Move position to seperate method to match other primitives
    const SPHERE = new HitableSphere(position, radius, material);

    this.HITABLES.push(SPHERE);

    this.countSpheres++;

    return SPHERE;
  }

  // __________________________________________________________________ Triangle

  addTriangle(p0, p1, p2, material) {
    const TRIANGLE = new HitableTriangle(p0, p1, p2, material);

    this.HITABLES.push(TRIANGLE);

    this.countTriangles++;

    return TRIANGLE;
  }

  // _____________________________________________________________________ Plane

  addPlane(width, height, material) {
    this.countTriangles += 2;

    return new HitablePlaneHolder(this, width, height, material);
  }

  // _______________________________________________________________________ Box

  addBox(width, height, depth, material) {
    this.countTriangles += 12;

    return new HitableBox(this, width, height, depth, material);
  }

  // ____________________________________________________________________ Volume

  addVolumeSphere(position, radius, texture, density) {
    const MEDIUM = new HitableConstantMedium(
      new HitableSphere(position, radius),
      density,
      texture
    );

    this.HITABLES.push(MEDIUM);

    this.countVolumeSpheres++;

    return MEDIUM;
  }

  // ______________________________________________________________________ Text

  addText(width, height, material) {
    this.countTriangles += 2; // TODO Increase to4 with backfacing

    return new HitablePlaneHolder(this, width, height, material);
  }

  // ______________________________________________________________ Scene helper

  addSceneHelper(sizeAxis = 10, sizeSphere = 1) {
    this.countSpheres += 6;

    return new SceneHelper(this, sizeAxis, sizeSphere);
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

    return ColourRGBA(0.5, 0.5, 0.5, 1.0);
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
