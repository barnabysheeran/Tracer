export default class ImageLibrary {
  constructor(renderer) {
    this.RENDERER = renderer;

    const URLS = [
      "https://www.nasa.gov/centers/goddard/images/content/312043main_skyview_pop_car.jpg"
    ];

    this.imageTotal = URLS.length;
    this.imagesToLoad = this.imageTotal;

    let i;
    let image;

    // Images
    this.IMAGES = [];

    for (i = 0; i < this.imageTotal; i++) {
      image = document.createElement("IMG");
      image.onload = this.onImageLoaded.bind(this);
      image.src = URLS[i];

      this.IMAGES[i] = image;
    }
  }

  // ______________________________________________________________________ Load

  onImageLoaded() {
    this.imagesToLoad--;

    this.RENDERER.setStatus(
      "ImageLibrary. Image loaded " +
        this.imagesToLoad +
        " of " +
        this.imageTotal
    );

    if (this.imagesToLoad == 0) {
      this.onImagesLoaded();
    }
  }

  onImagesLoaded() {
    // TODO Parse

    // Done
    this.RENDERER.onImageLibraryLoaded();
  }

  // ____________________________________________________________________ Access
}
