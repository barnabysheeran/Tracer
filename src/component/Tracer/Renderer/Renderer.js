import { vec3 } from "gl-matrix";

import World from "../World/World";
import Camera from "../Camera/Camera";
import Ray from "../Ray/Ray";
import HitRecord from "../Hit/HitRecord";

export default class Renderer {
  constructor(context, setStatus) {
    this.CONTEXT = context;
    this.setStatus = setStatus;

    // Dimensions
    this.PIXEL_WIDTH = -1;
    this.PIXEL_HEIGHT = -1;

    // Time
    this.FRAME_TIME_STANDARD = 1000 / 60;
    this.timeLastFrame = 0;
    this.timeRenderStart = 0;

    // Speed
    this.pixelsPerFrame = 100;

    // Samples
    this.SAMPLES_AA = 10;

    // Reuseable imagedata
    this.IMAGEDATA = this.CONTEXT.createImageData(1, 1);
    this.IMAGEDATA_DATA = this.IMAGEDATA.data;
    this.IMAGEDATA_DATA[3] = 255; // Full alpha

    // Var
    this.row = 0;
    this.column = 0;
    this.isRendering = false;

    // Camera
    this.CAMERA = new Camera();

    // Create World
    this.WORLD = new World();
    this.setScene(0);

    // Start Loop
    requestAnimationFrame(this.render.bind(this));
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId) {
    this.WORLD.setScene(sceneId);
  }

  // _____________________________________________________________________ Start

  start() {
    this.row = 0;
    this.column = 0;

    let d = new Date();
    this.timeRenderStart = d.getTime();

    this.setStatus("Render ...");
    this.isRendering = true;
  }

  onRenderComplete() {
    let d = new Date();
    let timeTaken = d.getTime() - this.timeRenderStart;

    this.setStatus("Complete in " + (timeTaken / 1000).toFixed(2) + "s");
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
    const CAMERA = this.CAMERA;
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

        ray = CAMERA.getRay(u, v);

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
          this.onRenderComplete();
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

    // TODO MAXDEPTH

    let hitRecord = new HitRecord();

    if (WORLD.didHitAnything(ray, 0.001, Infinity, hitRecord) == true) {
      let attenuation = vec3.create();
      let scattered = new Ray();

      if (
        depth < 50 &&
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
      let directionNormalized = ray.getDirectionNormalized();
      let t = 0.5 * (directionNormalized[1] + 1.0);

      let white = vec3.fromValues(1.0, 1.0, 1.0);
      vec3.scale(white, white, 1.0 - t);

      let blue = vec3.fromValues(0.5, 0.7, 1.0);
      vec3.scale(blue, blue, t);

      let colour = vec3.fromValues(0.0, 0.0, 0.0);
      vec3.add(colour, white, blue);

      return colour;
    }
  }

  // getColour(ray) {
  //   const WORLD = this.WORLD;

  //   // Hit anything ?
  //   let hitRecord = new HitRecord();

  //   if (WORLD.didHitAnything(ray, 0.001, Infinity, hitRecord) == true) {
  //     let randomUnitSphere = this.getRandominUnitSphere();

  //     let target = vec3.fromValues(
  //       hitRecord.position[0] + hitRecord.normal[0] + randomUnitSphere[0],
  //       hitRecord.position[1] + hitRecord.normal[1] + randomUnitSphere[1],
  //       hitRecord.position[2] + hitRecord.normal[2] + randomUnitSphere[2]
  //     );

  //     let newRay = new Ray();

  //     newRay.setPositionOrigin(
  //       hitRecord.position[0],
  //       hitRecord.position[1],
  //       hitRecord.position[2]
  //     );

  //     newRay.setDirection(
  //       target[0] - hitRecord.position[0],
  //       target[1] - hitRecord.position[1],
  //       target[2] - hitRecord.position[2]
  //     );

  //     let colour = this.getColour(newRay);

  //     return vec3.fromValues(colour[0] * 0.5, colour[1] * 0.5, colour[2] * 0.5);
  //   }

  //   // Background
  //   let directionNormalized = ray.getDirectionNormalized();
  //   let t = 0.5 * (directionNormalized[1] + 1.0);

  //   let white = vec3.fromValues(1.0, 1.0, 1.0);
  //   vec3.scale(white, white, 1.0 - t);

  //   let blue = vec3.fromValues(0.5, 0.7, 1.0);
  //   vec3.scale(blue, blue, t);

  //   let colour = vec3.fromValues(0.0, 0.0, 0.0);
  //   vec3.add(colour, white, blue);

  //   return colour;
  // }

  // _____________________________________________________________________ Shape

  // getRandominUnitSphere() {
  //   // TODO Optimise
  //   let p = vec3.fromValues(Infinity, Infinity, Infinity);

  //   while (vec3.squaredLength(p) >= 1.0) {
  //     p[0] = Math.random() * 2.0 - 1.0;
  //     p[1] = Math.random() * 2.0 - 1.0;
  //     p[2] = Math.random() * 2.0 - 1.0;
  //   }

  //   return p;
  // }

  // _____________________________________________________________________ Shape

  shape(w, h) {
    this.PIXEL_WIDTH = w;
    this.PIXEL_HEIGHT = h;

    this.CAMERA.shape(w, h);
  }

  // _____________________________________________________________________ Clear

  clear() {
    const CONTEXT = this.CONTEXT;

    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0, 0, this.PIXEL_WIDTH, this.PIXEL_HEIGHT);

    this.setStatus("Cleared");
    this.isRendering = false;
  }

  // ________________________________________________________________________ AA

  setAASamples(samples) {
    this.SAMPLES_AA = samples;
  }
}
