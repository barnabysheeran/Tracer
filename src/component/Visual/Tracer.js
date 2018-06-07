export default class Tracer {
  constructor(context) {
    this.CONTEXT = context;

    // Dimensions
    this.PIXEL_WIDTH = 100;
    this.PIXEL_HEIGHT = 100;

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

    console.log("Tracer. Rendering Row " + this.row);

    // Render row

    // Next
    this.row++;
    if (this.row >= this.PIXEL_HEIGHT) {
      this.isRendering = false;
    }

    // Loop
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
