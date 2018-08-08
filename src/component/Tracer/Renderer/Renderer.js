import { vec3 } from "gl-matrix";

import RenderWorker from "./Render.worker.js";

import World from "../World/World";
import CameraController from "../Camera/CameraController";
import Ray from "../Ray/Ray";
import HitRecord from "../Hit/HitRecord";
import Recorder from "../Recorder/Recorder";

// TextureTest 800*800 before AABB && Workers 122 seconds

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
      renderWorker.onmessage = this.onRenderWorkerMessage;

      // Store
      this.WORKER_POOL[i] = renderWorker;
    }

    // Dimensions
    this.PIXEL_WIDTH = -1;
    this.PIXEL_HEIGHT = -1;

    // Time
    this.FRAME_TIME_STANDARD = 1000 / 60;
    this.timeLastFrame = 0;
    this.timeRenderStart = 0;

    // Frames
    this.frame = 0;
    this.frameMax = 0;

    // Time
    this.timeFrameStart = 0.0;
    this.timeFrameEnd = 1.0;
    this.timeFrameInterval = 1.0;

    // Speed
    this.pixelsPerFrame = 100;

    // Samples
    this.SAMPLES_AA = 1;

    // Bounce
    this.bounceMax = 5000;

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
    this.setScene(0);

    // Start Loop
    requestAnimationFrame(this.render.bind(this));
  }

  // ___________________________________________________________________ Workers

  onRenderWorkerMessage(e) {
    let data = e.data;

    console.log(
      "OnRenderWorkerMessage. Thread " + data.threadId + " " + data.message
    );
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
    // XY
    this.row = 0;
    this.column = 0;

    // Time
    this.timeFrameStart = this.frame * this.timeFrameInterval;
    this.timeFrameEnd = (this.frame + 1) * this.timeFrameInterval;

    this.setStatus("Render frame " + this.frame);
  }

  onFrameComplete() {
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

  // ____________________________________________________________________ Render

  render(runTime) {
    // Loop
    requestAnimationFrame(this.render.bind(this));

    // Rendering ?
    if (this.isRendering == false) {
      return;
    }

    // Frame duration
    let frameDuration = runTime - this.timeLastFrame;
    this.timeLastFrame = runTime;

    if (frameDuration > this.FRAME_TIME_STANDARD * 1.1) {
      this.pixelsPerFrame -= Math.floor(this.pixelsPerFrame * 0.5);
      if (this.pixelsPerFrame < 1) {
        this.pixelsPerFrame = 1;
      }
    } else {
      this.pixelsPerFrame = Math.floor(this.pixelsPerFrame * 2);
    }

    // Scope
    const CONTEXT = this.CONTEXT;
    const WORLD = this.WORLD;
    const PIXEL_WIDTH = this.PIXEL_WIDTH;
    const PIXEL_HEIGHT = this.PIXEL_HEIGHT;
    const PIXELS_PER_FRAME = this.pixelsPerFrame;
    const IMAGEDATA_DATA = this.IMAGEDATA_DATA;
    const CAMERA_CONTROLLER = this.CAMERA_CONTROLLER;
    const SAMPLES_AA = this.SAMPLES_AA;

    // Var
    let colour = vec3.fromValues(0.0, 0.0, 0.0);
    let colourSample;

    // Out
    let row = this.row;
    let column = this.column;

    // Render row
    let ray;
    let time;
    let u;
    let v;
    let i;
    let s;

    for (i = 0; i < PIXELS_PER_FRAME; i++) {
      // Reset colour
      colour[0] = 0.0;
      colour[1] = 0.0;
      colour[2] = 0.0;

      // Samples
      for (s = 0; s < SAMPLES_AA; s++) {
        u = (column + Math.random()) / PIXEL_WIDTH;
        v = (PIXEL_HEIGHT - row + Math.random()) / PIXEL_HEIGHT;

        time = this.timeFrameStart + Math.random() * this.timeFrameInterval;

        WORLD.setAnimationTime(time);

        ray = CAMERA_CONTROLLER.getRay(u, v);

        colourSample = this.getColour(ray, 0);

        colour[0] += colourSample[0];
        colour[1] += colourSample[1];
        colour[2] += colourSample[2];
      }

      colour[0] /= SAMPLES_AA;
      colour[1] /= SAMPLES_AA;
      colour[2] /= SAMPLES_AA;

      colour[0] = Math.sqrt(colour[0]);
      colour[1] = Math.sqrt(colour[1]);
      colour[2] = Math.sqrt(colour[2]);

      IMAGEDATA_DATA[0] = colour[0] * 255.99;
      IMAGEDATA_DATA[1] = colour[1] * 255.99;
      IMAGEDATA_DATA[2] = colour[2] * 255.99;

      CONTEXT.putImageData(this.IMAGEDATA, column, row);

      // Next column
      column++;

      if (column >= PIXEL_WIDTH) {
        // Next row
        column = 0;
        row++;

        if (row >= PIXEL_HEIGHT) {
          this.onFrameComplete();
          return;
        }
      }
    }

    // Copy back
    this.row = row;
    this.column = column;
  }

  // ____________________________________________________________________ Colour

  getColour(ray, depth) {
    const WORLD = this.WORLD;
    const BOUNCE_MAX = this.bounceMax;

    let hitRecord = new HitRecord();

    if (WORLD.didHitAnything(ray, 0.001, Infinity, hitRecord) == true) {
      let attenuation = vec3.create();
      let scattered = new Ray();

      if (
        depth < BOUNCE_MAX &&
        hitRecord.material.scatter(ray, hitRecord, attenuation, scattered) ==
          true
      ) {
        let colour = this.getColour(scattered, depth + 1);

        return new vec3.fromValues(
          attenuation[0] * colour[0],
          attenuation[1] * colour[1],
          attenuation[2] * colour[2]
        );
      } else {
        return vec3.create();
      }
    } else {
      // Background
      return WORLD.getBackground(ray.getDirectionNormalized());
    }
  }

  // _____________________________________________________________________ Clear

  clear() {
    const CONTEXT = this.CONTEXT;

    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0, 0, this.PIXEL_WIDTH, this.PIXEL_HEIGHT);

    this.setStatus("Cleared");
    this.isRendering = false;
  }

  // _______________________________________________________________________ Set

  shape(w, h) {
    this.PIXEL_WIDTH = w;
    this.PIXEL_HEIGHT = h;

    this.CAMERA_CONTROLLER.shape(w, h);
  }

  setScene(sceneId) {
    // Scene
    this.WORLD.setScene(sceneId);

    // Frame
    this.frameMax = this.WORLD.getAnimationFrameMax();

    // Time
    this.timeFrameInterval = 1.0 / this.frameMax;
  }

  setAASamples(samples) {
    this.SAMPLES_AA = samples;
  }

  setBounceMax(bounceMax) {
    this.bounceMax = bounceMax;
  }

  setSaveOutput(save) {
    this.saveOutput = save;
  }

  setAperture(aperture) {
    this.CAMERA_CONTROLLER.setAperture(aperture);
  }

  setFov(fov) {
    this.CAMERA_CONTROLLER.setFov(fov);
  }

  setCameraPositionById(positionId) {
    this.CAMERA_CONTROLLER.setPositionsById(positionId);
  }
}
