import grid from "./../../../asset/texture/grid.png";
import devSquare from "./../../../asset/texture/devSquare.png";

// import skymap from "./../../../asset/texture/skymap.jpg";
// import testSquare from "./../../../asset/texture/testSquare.png";
// import baseSquare from "./../../../asset/texture/baseSquare.png";
// import storageRoom from "./../../../asset/texture/storageroom.jpg";
// import tech from "./../../../asset/texture/tech.png";

export default class ImageLibrary {
  constructor(renderer) {
    this.RENDERER = renderer;

    this.URLS = [grid, devSquare];

    this.IMAGE_TOTAL = this.URLS.length;
    this.imageCurrent = 0;

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

      this.IMAGES[i] = image;
    }

    // Data
    this.IMAGE_DIMENSIONS = [];
    this.IMAGE_DATA = [];

    // Start load
    this.IMAGES[0].src = this.URLS[0];
  }

  // ______________________________________________________________________ Load

  onImageLoaded() {
    this.imageCurrent++;

    if (this.imageCurrent < this.IMAGE_TOTAL) {
      this.IMAGES[this.imageCurrent].src = this.URLS[this.imageCurrent];
    } else {
      this.onImagesLoaded();
    }
  }

  onImagesLoaded() {
    let i;

    for (i = 0; i < this.IMAGE_TOTAL; i++) {
      this.generateImageData(i, this.IMAGES[i]);
    }

    // Done
    this.RENDERER.onImageLibraryLoaded();
  }

  // ______________________________________________________________________ Data

  generateImageData(imageId, image) {
    const CANVAS = this.CANVAS;
    const CONTEXT = this.CONTEXT;

    const W = image.width;
    const H = image.height;

    CANVAS.width = W;
    CANVAS.height = H;

    CONTEXT.drawImage(image, 0, 0);

    // Dimensions
    this.IMAGE_DIMENSIONS[imageId] = [W, H];

    // Data
    this.IMAGE_DATA[imageId] = CONTEXT.getImageData(0, 0, W, H).data;

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
