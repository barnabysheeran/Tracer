import { vec3 } from "gl-matrix";

import World from "./World";
import Camera from "./Camera";

export default class Tracer {
  constructor(context) {
    this.CONTEXT = context;

    // Dimensions
    this.PIXEL_WIDTH = 100;
    this.PIXEL_HEIGHT = 100;

    // Samples
    this.SAMPLES_AA = 100; // 100

    // Reuseable imagedata
    this.IMAGEDATA = this.CONTEXT.createImageData(1, 1);
    this.IMAGEDATA_DATA = this.IMAGEDATA.data;
    this.IMAGEDATA_DATA[3] = 255; // Full alpha

    // Var
    this.row = 0;
    this.isRendering = false;

    // Camera
    this.CAMERA = new Camera();

    // World
    this.WORLD = new World();
    this.WORLD.addSphere(vec3.fromValues(0.0, 0.0, -1.0), 0.5);
    this.WORLD.addSphere(vec3.fromValues(0.0, -100.5, -1.0), 100);

    // Loop
    requestAnimationFrame(this.render.bind(this));
  }

  // _____________________________________________________________________ Start

  start() {
    this.clear();

    this.row = 0;
    this.isRendering = true;
  }

  // ____________________________________________________________________ Render

  render() {
    // Loop
    requestAnimationFrame(this.render.bind(this));

    // Rendering ?
    if (this.isRendering == false) {
      return;
    }

    //  Scope
    const CONTEXT = this.CONTEXT;
    const PIXEL_WIDTH = this.PIXEL_WIDTH;
    const PIXEL_HEIGHT = this.PIXEL_HEIGHT;
    const IMAGEDATA_DATA = this.IMAGEDATA_DATA;
    const CAMERA = this.CAMERA;
    const SAMPLES_AA = this.SAMPLES_AA;

    // Var
    let colour = vec3.fromValues(0.0, 0.0, 0.0);
    let colourSample;
    let row = this.row;

    // Render row
    let ray;
    let u;
    let v;
    let i;
    let s;

    for (i = 0; i < this.PIXEL_WIDTH; i++) {
      colour[0] = 0.0;
      colour[1] = 0.0;
      colour[2] = 0.0;

      for (s = 0; s < SAMPLES_AA; s++) {
        u = (i + Math.random()) / PIXEL_WIDTH;
        v = (PIXEL_HEIGHT - row + Math.random()) / PIXEL_HEIGHT;

        ray = CAMERA.getRay(u, v);

        colourSample = this.getColour(ray);

        colour[0] += colourSample[0];
        colour[1] += colourSample[1];
        colour[2] += colourSample[2];
      }

      colour[0] /= SAMPLES_AA;
      colour[1] /= SAMPLES_AA;
      colour[2] /= SAMPLES_AA;

      IMAGEDATA_DATA[0] = colour[0] * 255.99;
      IMAGEDATA_DATA[1] = colour[1] * 255.99;
      IMAGEDATA_DATA[2] = colour[2] * 255.99;

      CONTEXT.putImageData(this.IMAGEDATA, i, row);
    }

    // Next row
    this.row++;

    if (this.row >= this.PIXEL_HEIGHT) {
      this.isRendering = false;
    }
  }

  // ____________________________________________________________________ Colour

  getColour(ray) {
    const WORLD = this.WORLD;

    // Hit anything ?
    if (WORLD.didHitAnything(ray, 0.0, Infinity) == true) {
      let hitRecord = WORLD.hitRecord;

      return vec3.fromValues(
        (hitRecord.normal[0] + 1.0) * 0.5,
        (hitRecord.normal[1] + 1.0) * 0.5,
        (hitRecord.normal[2] + 1.0) * 0.5
      );
    }

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

  // _____________________________________________________________________ Shape

  shape(w, h) {
    this.PIXEL_WIDTH = w;
    this.PIXEL_HEIGHT = h;
  }

  clear() {
    const CONTEXT = this.CONTEXT;

    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0, 0, this.PIXEL_WIDTH, this.PIXEL_HEIGHT);
  }
}
