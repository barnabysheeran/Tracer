import Statistics from "./../Statistics/Statistics";
import ImageLibrary from "../Library/ImageLibrary.js";
import MeshLibrary from "../Library/MeshLibrary.js";
import World from "../World/World.js";
import CameraController from "../Camera/CameraController.js";
import Recorder from "../Recorder/Recorder.js";

import RenderWorker from "./Render.worker.js";

export default class Renderer {
  constructor(canvas, setStatus, setStatusStatistics) {
    this.setStatus = setStatus;
    this.setStatusStatistics = setStatusStatistics;

    // TODO Optimise rendering with empty scene

    // Context
    this.CONTEXT = canvas.getContext("2d");

    // Workers
    this.WORKER_TOTAL = navigator.hardwareConcurrency || 4;

    this.WORKER_POOL = [];

    this.workersActive;

    let renderWorker;

    for (let i = 0; i < this.WORKER_TOTAL; i++) {
      renderWorker = new RenderWorker();

      // Init
      renderWorker.postMessage({ messageType: "init", threadId: i });

      // Receive
      renderWorker.onmessage = this.onRenderWorkerMessage.bind(this);

      // Store
      this.WORKER_POOL[i] = renderWorker;
    }

    // Dimensions
    this.PIXEL_WIDTH = -1;
    this.PIXEL_HEIGHT = -1;

    // Time
    this.timeRenderStart = 0;

    // Frames
    this.frame = 0;
    this.frameMax = 0;

    // Time
    this.timeFrameStart = 0.0;
    this.timeFrameInterval = 1.0;

    // Var
    this.row = 0;
    this.isRendering = false;

    // Recorder
    this.saveOutput = false;
    this.RECORDER = new Recorder(canvas);

    // Asset Libraries - Load on main thread
    this.LIBRARY_IMAGE_LOADED = false; // TODO Not const
    this.LIBRARY_MESH_LOADED = false; // TODO Not const

    this.IMAGE_LIBRARY = new ImageLibrary(this);
    this.MESH_LIBRARY = new MeshLibrary(this);

    // Create local World
    this.WORLD = new World(new CameraController());

    // TODO Refactor
    this.onMeshLibraryLoaded();
  }

  // _____________________________________________________________________ Start

  startAnimation() {
    // Statistics
    this.statisticsReset();

    // Record Time
    let d = new Date();
    this.timeRenderStart = d.getTime();

    // Start
    this.frame = 0;
    this.isRendering = true;
    this.startFrame();
  }

  startFrame() {
    const WORKER_TOTAL = this.WORKER_TOTAL;

    // Workers
    this.workersActive = this.WORKER_TOTAL;

    // Time
    this.timeFrameStart = this.frame * this.timeFrameInterval;

    this.setStatus(
      "Render. Frame " + (this.frame + 1) + " of " + (this.frameMax + 1)
    );

    // Start
    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      this.startWorker(i, i);
    }

    // Row
    this.row = WORKER_TOTAL;
  }

  startWorker(workerId, row) {
    this.WORKER_POOL[workerId].postMessage({
      messageType: "render",
      timeFrameStart: this.timeFrameStart,
      row: row
    });
  }

  onRenderWorkerMessage(e) {
    let data = e.data;

    if (data.message == "complete") {
      if (this.isRendering == true) {
        this.drawPixels(data.row, data.imageDataData);

        // Next
        if (this.row < this.PIXEL_HEIGHT) {
          this.startWorker(data.threadId, this.row++);
        } else {
          this.workersActive--;

          if (this.workersActive == 0) {
            this.onFrameComplete();
          }
        }
      }
    }

    if (data.message == "statisticsPoll") {
      Statistics.addIntersectionTestsSphere(data.intersectionTestsSphere);
      Statistics.addIntersectionTestsSphereSuccess(
        data.intersectionTestsSphereSuccess
      );

      Statistics.addIntersectionTestsTriangle(data.intersectionTestsTriangle);
      Statistics.addIntersectionTestsTriangleSuccess(
        data.intersectionTestsTriangleSuccess
      );

      this.statisticsUpdateDisplay();
    }
  }

  drawPixels(row, imageDataData) {
    const CONTEXT = this.CONTEXT;

    const IMAGEDATA = new ImageData(imageDataData, this.PIXEL_WIDTH, 1);

    CONTEXT.save();
    CONTEXT.putImageData(IMAGEDATA, 0, row);
    CONTEXT.restore();
  }

  onFrameComplete() {
    // Save ?
    if (this.saveOutput == true) {
      this.RECORDER.saveImage("frame_" + this.frame + ".png");
    }

    // Frame
    this.frame++;

    // Time
    this.timeFrameStart = this.frame * this.timeFrameInterval;
    //this.timeFrameEnd = (this.frame + 1) * this.timeFrameInterval;

    if (this.frame >= this.frameMax) {
      this.onRenderComplete();
    } else {
      this.startFrame();
    }
  }

  onRenderComplete() {
    // Statistics
    this.statisticsPoll();

    // Status
    let d = new Date();
    let timeTaken = d.getTime() - this.timeRenderStart;
    this.setStatus("Frame complete. " + (timeTaken / 1000).toFixed(2) + "s");

    // Done
    this.isRendering = false;
  }

  // _____________________________________________________________________ Clear

  clear() {
    const CONTEXT = this.CONTEXT;
    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0, 0, this.PIXEL_WIDTH, this.PIXEL_HEIGHT);

    this.isRendering = false;
  }

  // ______________________________________________________________ Set Threaded

  shape(w, h) {
    this.PIXEL_WIDTH = w;
    this.PIXEL_HEIGHT = h;

    // Scene
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    for (let i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "shape",
        pixelWidth: w,
        pixelHeight: h
      });
    }
  }

  setScene(sceneId) {
    // Animation Frames
    this.frameMax = this.WORLD.getSceneAnimationFrameMax(sceneId);

    // Time
    this.timeFrameInterval = 1.0 / this.frameMax;

    // Workers
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setScene",
        sceneId: sceneId,
        timeFrameInterval: this.timeFrameInterval
      });
    }
  }

  setAASamples(samples) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setSamplesAA",
        samples: samples
      });
    }
  }

  setBounceMax(bounceMax) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setBounceMax",
        bounceMax: bounceMax
      });
    }
  }

  setAperture(aperture) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setAperture",
        aperture: aperture
      });
    }
  }

  setFov(fov) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setFov",
        fov: fov
      });
    }
  }

  setCameraPositionById(positionId) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setCameraPositionById",
        positionId: positionId
      });
    }
  }

  onImageLibraryLoaded() {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    const IMAGE_DIMENSIONS = this.IMAGE_LIBRARY.getImageDimensions();
    const IMAGE_DATA = this.IMAGE_LIBRARY.getImageData();

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setTextureImageData",
        imageDimensions: IMAGE_DIMENSIONS,
        imageData: IMAGE_DATA
      });
    }

    this.LIBRARY_IMAGE_LOADED = true;
    this.showLoadStatus();
  }

  onMeshLibraryLoaded() {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    const POSITIONS = this.MESH_LIBRARY.getPositions();
    const NORMALS = this.MESH_LIBRARY.getNormals();
    const CELLS = this.MESH_LIBRARY.getCells();

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setMeshData",
        positions: POSITIONS,
        normals: NORMALS,
        cells: CELLS
      });
    }

    this.LIBRARY_MESH_LOADED = true;
    this.showLoadStatus();
  }

  // ________________________________________________________________ Statistics

  statisticsReset() {
    // Main
    Statistics.reset();
    this.setStatusStatistics("...");

    // Workers
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "statisticsReset"
      });
    }
  }

  statisticsPoll() {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "statisticsPoll"
      });
    }
  }

  statisticsUpdateDisplay() {
    this.setStatusStatistics(
      "Sphere " +
        Statistics.getIntersectionTestsSphere() +
        " " +
        Statistics.getIntersectionTestsSphereSuccess() +
        " " +
        (
          (1.0 / Statistics.getIntersectionTestsSphere()) *
          Statistics.getIntersectionTestsSphereSuccess()
        ).toFixed(4) +
        "%" +
        " Triangle " +
        Statistics.getIntersectionTestsTriangle() +
        " " +
        Statistics.getIntersectionTestsTriangleSuccess() +
        " " +
        (
          (1.0 / Statistics.getIntersectionTestsTriangle()) *
          Statistics.getIntersectionTestsTriangleSuccess()
        ).toFixed(4) +
        "%"
    );
  }

  // ___________________________________________________________________ Loading

  showLoadStatus() {
    if (this.LIBRARY_IMAGE_LOADED == true && this.LIBRARY_MESH_LOADED) {
      this.setStatus("Ready. " + this.WORKER_TOTAL + " workers");
    }
  }

  // _______________________________________________________________________ Set

  setSaveOutput(save) {
    this.saveOutput = save;
  }
}
