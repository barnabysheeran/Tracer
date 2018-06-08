import { vec3 } from "gl-matrix";

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

    // Reuseable vec3
    this.COLOUR = vec3.fromValues(0, 0, 0);

    // Row
    this.row = 0;

    // Rendering
    this.isRendering = false;

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

    const CONTEXT = this.CONTEXT;

    const PIXEL_WIDTH = this.PIXEL_WIDTH;
    const PIXEL_HEIGHT = this.PIXEL_HEIGHT;

    const IMAGEDATA_DATA = this.IMAGEDATA_DATA;
    const COLOUR = this.COLOUR;

    let row = this.row;

    // Render row
    let i;

    for (i = 0; i < this.PIXEL_WIDTH; i++) {
      COLOUR[0] = i / PIXEL_WIDTH;
      COLOUR[1] = (PIXEL_HEIGHT - row) / PIXEL_HEIGHT;
      COLOUR[2] = 0.2;

      IMAGEDATA_DATA[0] = COLOUR[0] * 255;
      IMAGEDATA_DATA[1] = COLOUR[1] * 255;
      IMAGEDATA_DATA[2] = COLOUR[2] * 255;

      CONTEXT.putImageData(this.IMAGEDATA, i, row);
    }

    // Next row
    this.row++;
    if (this.row >= this.PIXEL_HEIGHT) {
      this.isRendering = false;
    }
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
