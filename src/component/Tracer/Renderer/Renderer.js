import { vec3 } from "gl-matrix";

import World from "../World/World";
import CameraController from "../Camera/CameraController";
import Ray from "../Ray/Ray";
import HitRecord from "../Hit/HitRecord";
import Recorder from "../Recorder/Recorder";

export default class Renderer {
  constructor(canvas, setStatus) {
    this.CONTEXT = canvas.getContext("2d");
    this.setStatus = setStatus;

    // Dimensions
    this.PIXEL_WIDTH = -1;
    this.PIXEL_HEIGHT = -1;

    // Time
    this.FRAME_TIME_STANDARD = 1000 / 60;
    this.timeLastFrame = 0;
    this.timeRenderStart = 0;

    // Frames
    this.frame = 0;
    this.frameTotal = 0;

    // Speed
    this.pixelsPerFrame = 100;

    // Samples
    this.SAMPLES_AA = 1;

    // Bounce
    this.bounceMax = 50;

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

  // _____________________________________________________________________ Start

  startAnimation() {
    let d = new Date();
    this.timeRenderStart = d.getTime();

    //
    this.frame = 1;
    this.isRendering = true;
    this.startFrame();
  }

  startFrame() {
    this.row = 0;
    this.column = 0;

    this.WORLD.setAnimationFrame(this.frame);

    this.setStatus("Render frame " + this.frame + " of " + this.frameTotal);
  }

  onFrameComplete() {
    // Save ?
    if (this.saveOutput == true) {
      let d = new Date();

      this.RECORDER.saveImage(
        "render_" +
          d.getFullYear() +
          "_" +
          d.getMonth() +
          "_" +
          d.getDate() +
          "_" +
          d.getTime() +
          "_" +
          this.frame +
          ".png"
      );
    }

    // Frame
    this.frame++;

    if (this.frame > this.frameTotal) {
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

  render(time) {
    // Loop
    requestAnimationFrame(this.render.bind(this));

    // Rendering ?
    if (this.isRendering == false) {
      return;
    }

    // Frame duration
    let frameDuration = time - this.timeLastFrame;
    this.timeLastFrame = time;

    if (frameDuration > this.FRAME_TIME_STANDARD * 1.1) {
      this.pixelsPerFrame -= Math.floor(this.pixelsPerFrame * 0.5);
      if (this.pixelsPerFrame < 1) {
        this.pixelsPerFrame = 1;
      }
    } else {
      this.pixelsPerFrame = Math.floor(this.pixelsPerFrame * 2);
    }

    //  Scope
    const CONTEXT = this.CONTEXT;
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
    this.WORLD.setScene(sceneId);
    this.frameTotal = this.WORLD.getAnimationFrameTotal();
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
