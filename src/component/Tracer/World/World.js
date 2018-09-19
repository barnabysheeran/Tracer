import SceneExampleA from "./Scenes/ExampleA";
import SceneExampleB from "./Scenes/ExampleB";
import SceneLightTest from "./Scenes/LightTest";
import SceneLightTest2 from "./Scenes/LightTest2";

export default class World {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;

    this.SCENES = [
      new SceneExampleA(cameraController),
      new SceneExampleB(cameraController),
      new SceneLightTest(cameraController),
      new SceneLightTest2(cameraController)
    ];

    // Default
    this.scene;
    this.setScene(0);
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    this.scene = this.SCENES[sceneId];
    this.scene.init();
  }

  initScene() {
    this.scene.init();
  }

  // _______________________________________________________________________ BVH

  buildBVH() {
    this.scene.buildBVH();
  }

  // ________________________________________________________________ Background

  getBackground(rayDirectionNormalized) {
    return this.scene.getBackground(rayDirectionNormalized);
  }

  // _______________________________________________________________________ Hit

  didHitAnything(ray, tMin, tMax, hitRecord) {
    return this.scene.bvhRoot.didHit(ray, tMin, tMax, hitRecord);
  }

  // _________________________________________________________________ Animation

  setAnimationTime(time) {
    this.scene.setAnimationTime(time);
  }

  getAnimationFrameMax() {
    return this.scene.getAnimationFrameMax();
  }

  // __________________________________________________________ TextureImageData

  setTextureImageDimensions(dimensions) {
    const SCENES = this.SCENES;

    let i;

    for (i = 0; i < SCENES.length; i++) {
      SCENES[i].setTextureImageDimensions(dimensions);
    }
  }

  setTextureImageData(data) {
    const SCENES = this.SCENES;

    let i;

    for (i = 0; i < SCENES.length; i++) {
      SCENES[i].setTextureImageData(data);
    }
  }

  // ____________________________________________________________________ Meshes

  setMeshes(positions, normals, cells) {
    const SCENES = this.SCENES;

    let i;

    for (i = 0; i < SCENES.length; i++) {
      SCENES[i].setMeshes(positions, normals, cells);
    }
  }

  // ____________________________________________________________________ Access

  getSceneAnimationFrameMax(sceneId) {
    const SCENES = this.SCENES;

    return SCENES[sceneId].getAnimationFrameMax();
  }
}
