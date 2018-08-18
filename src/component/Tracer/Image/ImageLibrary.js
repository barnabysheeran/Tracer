import textureTest from "./../../../texture/TextureTest.png";

export default class ImageLibrary {
  constructor(renderer) {
    this.RENDERER = renderer;

    const URLS = [textureTest];

    this.IMAGE_TOTAL = URLS.length;
    this.imagesToLoad = this.IMAGE_TOTAL;

    let i;
    let image;

    // Canvas
    this.CANVAS = document.createElement("canvas");
    this.CONTEXT = this.CANVAS.getContext("2d");

    // Images
    this.IMAGES = [];

    for (i = 0; i < this.IMAGE_TOTAL; i++) {
      image = document.createElement("IMG");
      image.onload = this.onImageLoaded.bind(this);
      image.src = URLS[i];

      this.IMAGES[i] = image;
    }

    // Data
    this.IMAGE_DIMENSIONS = [];
    this.IMAGE_DATA = [];
  }

  // ______________________________________________________________________ Load

  onImageLoaded() {
    this.imagesToLoad--;

    if (this.imagesToLoad == 0) {
      this.onImagesLoaded();
    }
  }

  onImagesLoaded() {
    let i;

    // TODO Sequential loading to maintain order

    for (i = 0; i < this.IMAGE_TOTAL; i++) {
      this.generateImageData(this.IMAGES[i]);
    }

    // Done
    this.RENDERER.onImageLibraryLoaded();
  }

  // ______________________________________________________________________ Data

  generateImageData(image) {
    const CANVAS = this.CANVAS;
    const CONTEXT = this.CONTEXT;

    const W = image.width;
    const H = image.height;

    CANVAS.width = W;
    CANVAS.height = H;

    CONTEXT.drawImage(image, 0, 0);

    // Dimensions
    this.IMAGE_DIMENSIONS.push([W, H]);

    // Data
    let data = [];

    let x;
    let y;
    let imageDataData;

    for (x = 0; x < W; x++) {
      for (y = 0; y < H; y++) {
        imageDataData = CONTEXT.getImageData(x, y, 1, 1).data;

        // RGB
        data.push(imageDataData[0]);
        data.push(imageDataData[1]);
        data.push(imageDataData[2]);
      }
    }

    this.IMAGE_DATA.push(data);

    // Tidy
    CANVAS.width = 0;
    CANVAS.height = 0;
  }

  // ____________________________________________________________________ Access

  getImageDimensions() {
    return this.IMAGE_DIMENSIONS;
  }

  getImageData() {
    return this.IMAGE_DATA;
  }
}
