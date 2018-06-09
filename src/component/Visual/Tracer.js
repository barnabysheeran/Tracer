import { vec3 } from "gl-matrix";
import Ray from "./Ray";
import World from "./World";
import HitRecord from "./HitRecord";

export default class Tracer {
  constructor(context) {
    this.CONTEXT = context;

    // Dimensions
    this.PIXEL_WIDTH = 100;
    this.PIXEL_HEIGHT = 100;

    // Reuseable imagedata
    this.IMAGEDATA = this.CONTEXT.createImageData(1, 1);
    this.IMAGEDATA_DATA = this.IMAGEDATA.data;
    this.IMAGEDATA_DATA[3] = 255; // Full alpha

    // Const
    this.LOWER_LEFT_CORNER = vec3.fromValues(-2.0, -1.0, -1.0);
    this.HORIZONTAL = vec3.fromValues(4.0, 0.0, 0.0); // TODO Set with shape
    this.VERTICAL = vec3.fromValues(0.0, 2.0, 0.0); // TODO Set with shape
    this.POSITION_ORIGIN = vec3.fromValues(0.0, 0.0, 0.0);

    // Var
    this.row = 0;
    this.isRendering = false;

    // Reuseable ray
    this.RAY = new Ray();

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

    const LOWER_LEFT_CORNER = this.LOWER_LEFT_CORNER;
    const HORIZONTAL = this.HORIZONTAL;
    const VERTICAL = this.VERTICAL;
    const POSITION_ORIGIN = this.POSITION_ORIGIN;

    const RAY = this.RAY;

    RAY.setPositionOrigin(
      POSITION_ORIGIN[0],
      POSITION_ORIGIN[1],
      POSITION_ORIGIN[2]
    ); // TODO Out of loop

    // Var
    let colour;
    let row = this.row;

    // Render row
    let u;
    let v;
    let i;

    for (i = 0; i < this.PIXEL_WIDTH; i++) {
      u = i / PIXEL_WIDTH;
      v = (PIXEL_HEIGHT - row) / PIXEL_HEIGHT;

      RAY.setDirection(
        LOWER_LEFT_CORNER[0] + u * HORIZONTAL[0] + v * VERTICAL[0],
        LOWER_LEFT_CORNER[1] + u * HORIZONTAL[1] + v * VERTICAL[1],
        LOWER_LEFT_CORNER[2] + u * HORIZONTAL[2] + v * VERTICAL[2]
      );

      colour = this.getColour(RAY);

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
