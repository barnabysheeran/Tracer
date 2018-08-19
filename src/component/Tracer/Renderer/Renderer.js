import RenderWorker from "./Render.worker.js";

import ImageLibrary from "../Image/ImageLibrary.js";
import World from "../World/World.js";
import CameraController from "../Camera/CameraController.js";
import Recorder from "../Recorder/Recorder.js";

export default class Renderer {
  constructor(canvas, setStatus) {
    this.CONTEXT = canvas.getContext("2d");
    this.setStatus = setStatus;

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

    // Reuseable imagedata
    this.IMAGEDATA = this.CONTEXT.createImageData(1, 1);
    this.IMAGEDATA_DATA = this.IMAGEDATA.data;
    this.IMAGEDATA_DATA[3] = 255; // Full alpha

    // Var
    this.row = 0;
    this.column = 0;
    this.isRendering = false;

    // Recorder
    this.saveOutput = false;
    this.RECORDER = new Recorder(canvas);

    // Camera Controller
    this.CAMERA_CONTROLLER = new CameraController();

    // Texture Library - Load images on main thread
    this.IMAGE_LIBRARY = new ImageLibrary(this);

    // Create World
    this.WORLD = new World(this.CAMERA_CONTROLLER);

    // Start
    this.setStatus("Created " + this.WORKER_TOTAL + " threads");
  }

  // _____________________________________________________________________ Start

  startAnimation() {
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

    // XY
    this.row = 0;
    this.column = 0;

    // Workers
    this.workersActive = this.WORKER_TOTAL;

    // Time
    this.timeFrameStart = this.frame * this.timeFrameInterval;
    //this.timeFrameEnd = (this.frame + 1) * this.timeFrameInterval;

    this.setStatus("Render frame " + this.frame);

    // Start
    let i;

    for (i = 0; i < WORKER_TOTAL - 1; i++) {
      this.startWorker(i, this.column, this.row);
      this.nextPixel();
    }

    this.startWorker(WORKER_TOTAL - 1, this.column, this.row);
  }

  startWorker(workerId, column, row) {
    this.WORKER_POOL[workerId].postMessage({
      messageType: "render",
      timeFrameStart: this.timeFrameStart,
      column: column,
      row: row
    });
  }

  nextPixel() {
    // Next column
    this.column++;

    if (this.column >= this.PIXEL_WIDTH) {
      // Next row
      this.column = 0;
      this.row++;
    }
  }

  onRenderWorkerMessage(e) {
    let data = e.data;

    if (data.message == "complete") {
      if (this.isRendering == true) {
        this.drawPixel(data.column, data.row, data.colour);

        // Next
        if (this.row < this.PIXEL_HEIGHT) {
          this.nextPixel();

          this.startWorker(data.threadId, this.column, this.row);
        } else {
          this.workersActive--;

          if (this.workersActive == 0) {
            this.onFrameComplete();
          }
        }
      }
    }
  }

  drawPixel(column, row, colour) {
    const IMAGEDATA = this.IMAGEDATA;
    const IMAGEDATA_DATA = this.IMAGEDATA_DATA;
    const CONTEXT = this.CONTEXT;

    IMAGEDATA_DATA[0] = colour[0] * 255.99;
    IMAGEDATA_DATA[1] = colour[1] * 255.99;
    IMAGEDATA_DATA[2] = colour[2] * 255.99;

    CONTEXT.putImageData(IMAGEDATA, column, row);
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
    // Status
    let d = new Date();
    let timeTaken = d.getTime() - this.timeRenderStart;
    this.setStatus("Complete in " + (timeTaken / 1000).toFixed(2) + "s");

    // Done
    this.isRendering = false;
  }

  // _____________________________________________________________________ Clear

  clear() {
    const CONTEXT = this.CONTEXT;

    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0, 0, this.PIXEL_WIDTH, this.PIXEL_HEIGHT);

    this.setStatus("Cleared");
    this.isRendering = false;
  }

  // ______________________________________________________________ Set Threaded

  shape(w, h) {
    this.PIXEL_WIDTH = w;
    this.PIXEL_HEIGHT = h;

    this.CAMERA_CONTROLLER.shape(w, h);

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
    const WORLD = this.WORLD;

    WORLD.setScene(sceneId);

    // Frame
    this.frameMax = WORLD.getAnimationFrameMax();

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

    const IMAGE_LIBRARY = this.IMAGE_LIBRARY;
    const IMAGE_DIMENSIONS = IMAGE_LIBRARY.getImageDimensions();
    const IMAGE_DATA = IMAGE_LIBRARY.getImageData();

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setTextureImageData",
        imageDimensions: IMAGE_DIMENSIONS,
        imageData: IMAGE_DATA
      });
    }

    this.setStatus("Ready. Using " + this.WORKER_TOTAL + " threads");
  }

  // _______________________________________________________________________ Set

  setSaveOutput(save) {
    this.saveOutput = save;
  }
}
