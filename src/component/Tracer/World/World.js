import SceneTest from "./SceneTest";
import SceneAnimationTest from "./SceneAnimationTest";
import SceneMarbleTest from "./SceneMarbleTest";
import SceneImageSphere from "./SceneImageSphere";
import SceneBunny from "./SceneBunny";
import SceneBunnyStanford from "./SceneBunnyStanford";
import SceneLightTest from "./SceneLightTest";
import SceneCornell from "./SceneCornell";
import SceneImagePlane from "./SceneImagePlane";

export default class World {
  constructor(cameraController) {
    this.CAMERA_CONTROLLER = cameraController;

    this.SCENES = [
      new SceneTest(cameraController),
      new SceneAnimationTest(cameraController),
      new SceneMarbleTest(cameraController),
      new SceneImageSphere(cameraController),
      new SceneImagePlane(cameraController),
      new SceneBunny(cameraController),
      new SceneBunnyStanford(cameraController),
      new SceneLightTest(cameraController),
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
    //this.scene.buildBVH();
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
