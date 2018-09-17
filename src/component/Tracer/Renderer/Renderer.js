import ImageLibrary from "../Library/ImageLibrary.js";
import MeshLibrary from "../Library/MeshLibrary.js";
import World from "../World/World.js";
import CameraController from "../Camera/CameraController.js";
import Recorder from "../Recorder/Recorder.js";

import Workers from "./Workers";

export default class Renderer {
  constructor(canvas, setStatus, setStatistics) {
    this.setStatus = setStatus;
    this.setStatistics = setStatistics;

    // Context
    this.CONTEXT = canvas.getContext("2d");

    // Workers
    this.WORKERS = new Workers(this);

    // Dimensions
    this.PIXEL_WIDTH = -1;
    this.PIXEL_HEIGHT = -1;

    // Time
    this.timeRenderStart = 0;

    // Rows
    this.rowsComplete = 0;

    // Frames
    this.frame = 0;
    this.frameMax = 0;

    // Time
    this.timeFrameInterval = 1.0;

    // Recorder
    this.saveOutput = false;
    this.RECORDER = new Recorder(canvas);

    // Asset Libraries - Load on main thread
    this.libraryImageLoaded = false;
    this.libraryMeshLoaded = false;

    this.IMAGE_LIBRARY = new ImageLibrary(this);
    this.MESH_LIBRARY = new MeshLibrary(this);

    // Create local World
    this.WORLD = new World(new CameraController());

    // TODO Refactor away, meshes are included in source
    this.onMeshLibraryLoaded();

    // Status
    this.setStatusReady();
  }

  // ____________________________________________________________________ Render

  startAnimation() {
    // Render Time
    let d = new Date();
    this.timeRenderStart = d.getTime();

    // Frame
    this.frame = 0;

    // Start
    this.startFrame();
  }

  startFrame() {
    // Status
    this.setStatusRendering();

    // Rows
    this.rowsComplete = 0;

    // Workers
    this.WORKERS.startFrame(this.frame * this.timeFrameInterval);
  }

  drawPixels(row, imageDataData) {
    // Count
    this.rowsComplete++;
    this.setStatusRendering();

    // Draw
    this.CONTEXT.putImageData(
      new ImageData(imageDataData, this.PIXEL_WIDTH, 1),
      0,
      row
    );
  }

  onFrameComplete() {
    // Save ?
    if (this.saveOutput == true) {
      this.RECORDER.saveImage("frame_" + this.frame + ".png");
    }

    // Frame
    this.frame++;

    if (this.frame >= this.frameMax) {
      this.onRenderComplete();
    } else {
      this.startFrame();
    }
  }

  onRenderComplete() {
    this.setStatusComplete();
  }

  // _____________________________________________________________________ Clear

  clear() {
    const CONTEXT = this.CONTEXT;
    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0, 0, this.PIXEL_WIDTH, this.PIXEL_HEIGHT);

    // Workers
    this.WORKERS.clear();

    // Status
    this.setStatusReady();
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    // World TODO Remove duplicate WORLD from renderer, communicate first worker
    this.WORLD.setScene(sceneId);

    // Animation Frames
    this.frameMax = this.WORLD.getSceneAnimationFrameMax(sceneId);

    // Time
    this.timeFrameInterval = 1.0 / this.frameMax;

    // Workers
    this.WORKERS.setScene(sceneId, this.timeFrameInterval);

    // Status
    this.setStatusStatistics();
  }

  // _____________________________________________________________________ Shape

  shape(w, h) {
    this.PIXEL_WIDTH = w;
    this.PIXEL_HEIGHT = h;

    this.WORKERS.shape(w, h);
  }

  // __________________________________________________________________ Settings

  setAASamples(samples) {
    this.WORKERS.setAASamples(samples);
  }

  setBounceMax(bounceMax) {
    this.WORKERS.setBounceMax(bounceMax);
  }

  setAperture(aperture) {
    this.WORKERS.setAperture(aperture);
  }

  setFov(fov) {
    this.WORKERS.setFov(fov);
  }

  setSaveOutput(save) {
    this.saveOutput = save;
  }

  // ____________________________________________________________________ Assets

  onImageLibraryLoaded() {
    const IMAGE_LIBRARY = this.IMAGE_LIBRARY;

    // TODO Remove with World removal
    this.WORLD.setTextureImageDimensions(IMAGE_LIBRARY.getImageDimensions());
    this.WORLD.setTextureImageData(IMAGE_LIBRARY.getImageData());

    // Workers
    this.WORKERS.onImageLibraryLoaded(
      IMAGE_LIBRARY.getImageDimensions(),
      IMAGE_LIBRARY.getImageData()
    );

    this.libraryImageLoaded = true;
    this.setStatusReady();
  }

  // TODO Remove, meshes are included in source
  onMeshLibraryLoaded() {
    const MESH_LIBRARY = this.MESH_LIBRARY;

    // TODO Remove with World removal
    this.WORLD.setMeshes(
      MESH_LIBRARY.getPositions(),
      MESH_LIBRARY.getNormals(),
      MESH_LIBRARY.getCells()
    );

    // Workers
    this.WORKERS.onMeshLibraryLoaded(
      MESH_LIBRARY.getPositions(),
      MESH_LIBRARY.getNormals(),
      MESH_LIBRARY.getCells()
    );

    this.libraryMeshLoaded = true;
    this.setStatusReady();
  }

  // ____________________________________________________________________ Status

  setStatusReady() {
    if (this.libraryImageLoaded == true && this.libraryMeshLoaded == true) {
      this.setStatus("Ready. " + this.WORKERS.getWorkerTotal() + " workers");
    } else {
      this.setStatus("Loading ...");
    }
  }

  setStatusRendering() {
    let complete =
      ((this.rowsComplete / this.PIXEL_HEIGHT) * 100.0).toFixed(2) + "%";

    if (this.frameMax > 0) {
      this.setStatus(
        "Render. Frame " +
          (this.frame + 1) +
          " of " +
          this.frameMax +
          ". " +
          complete
      );
    } else {
      this.setStatus("Render. " + complete);
    }
  }

  setStatusComplete() {
    let d = new Date();
    let timeTaken = d.getTime() - this.timeRenderStart;

    this.setStatus("Render. Complete " + (timeTaken / 1000).toFixed(2) + "s");
  }

  // ________________________________________________________________ Statistics

  setStatusStatistics() {
    // World TODO Remove duplicate WORLD from renderer, communicate first worker
    this.setStatistics(
      "Triangles: " +
        this.WORLD.scene.countTriangles +
        " Spheres: " +
        this.WORLD.scene.countSpheres
    );
  }
}
