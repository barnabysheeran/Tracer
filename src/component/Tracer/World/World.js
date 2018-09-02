import SceneTest from "./SceneTest";
import SceneAnimationTest from "./SceneAnimationTest";
import SceneMarbleTest from "./SceneMarbleTest";
import SceneImageTest from "./SceneImageTest";
import SceneBunny from "./SceneBunny";
import SceneBVHTest from "./SceneBVHTest";
import SceneCornell from "./SceneCornell";

export default class World {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;

    this.SCENES = [
      new SceneTest(cameraController),
      new SceneAnimationTest(cameraController),
      new SceneMarbleTest(cameraController),
      new SceneImageTest(cameraController),
      new SceneBunny(cameraController),
      new SceneBVHTest(cameraController),
      new SceneCornell(cameraController)
    ];

    // Default
    this.scene;
    this.setScene(0);
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    this.scene = this.SCENES[sceneId];
    this.scene.init();
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
    this.scene.buildBVH();
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
