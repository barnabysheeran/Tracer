import RenderWorker from "./Render.worker.js";

import World from "../World/World";
import CameraController from "../Camera/CameraController";

import Recorder from "../Recorder/Recorder";

// TextureTest 800*400 before AABB && Workers 122 seconds

export default class Renderer {
  constructor(canvas, setStatus) {
    this.CONTEXT = canvas.getContext("2d");
    this.setStatus = setStatus;

    // Workers
    this.WORKER_TOTAL = navigator.hardwareConcurrency || 4;

    this.WORKER_POOL = [];

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
    //this.FRAME_TIME_STANDARD = 1000 / 60;
    //this.timeLastFrame = 0;
    this.timeRenderStart = 0;

    // Frames
    this.frame = 0;
    this.frameMax = 0;

    // Time
    this.timeFrameStart = 0.0;
    this.timeFrameEnd = 1.0;
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

    // Time
    this.timeFrameStart = this.frame * this.timeFrameInterval;
    this.timeFrameEnd = (this.frame + 1) * this.timeFrameInterval;

    this.setStatus("Render frame " + this.frame);

    // Start
    let i;

    for (i = 0; i < WORKER_TOTAL - 1; i++) {
      this.startWorker(i, this.column, this.row);
      this.nextPixel();
    }

    this.startWorker(WORKER_TOTAL - 1, this.column, this.row);
  }

  nextPixel() {
    // Next column
    this.column++;

    if (this.column >= this.PIXEL_WIDTH) {
      // Next row
      this.column = 0;
      this.row++;

      if (this.row >= this.PIXEL_HEIGHT) {
        this.isRendering = false;
      }
    }
  }

  startWorker(workerId, column, row) {
    this.WORKER_POOL[workerId].postMessage({
      messageType: "render",
      timeFrameStart: this.timeFrameStart,
      column: column,
      row: row
    });
  }

  onRenderWorkerMessage(e) {
    let data = e.data;

    //console.log("OnRenderWorkerMessage. " + data.message);

    if (data.message == "complete") {
      if (this.isRendering == true) {
        this.drawPixel(data.column, data.row, data.colour);
        this.nextPixel();
        this.startWorker(data.threadId, this.column, this.row);
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
    // TODO. All workers are complete ?

    // Save ?
    if (this.saveOutput == true) {
      this.RECORDER.saveImage("frame_" + this.frame + ".png");
    }

    // Frame
    this.frame++;

    // Time
    this.timeFrameStart = 0.0;
    this.timeFrameEnd = 0.0;

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
    let timeFrameInterval = 1.0 / this.frameMax;

    // Workers
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setScene",
        sceneId: sceneId,
        timeFrameInterval: timeFrameInterval
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

  // _______________________________________________________________________ Set

  setSaveOutput(save) {
    this.saveOutput = save;
  }
}
