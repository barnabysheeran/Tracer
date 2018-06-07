export default class Tracer {
  constructor(context) {
    this.CONTEXT = context;

    // Dimensions
    this.PIXEL_WIDTH = 100;
    this.PIXEL_HEIGHT = 100;
  }

  shape(w, h) {
    this.PIXEL_WIDTH = w;
    this.PIXEL_HEIGHT = h;

    const CONTEXT = this.CONTEXT;

    CONTEXT.fillRect(0, 0, w, h);
  }
}
