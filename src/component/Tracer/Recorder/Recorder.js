// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
// https://stackoverflow.com/questions/42437971/exporting-a-video-in-p5-js

import { saveAs } from "file-saver";

export default class Recorder {
  constructor(canvas) {
    this.CANVAS = canvas;
  }

  saveImage(imageName) {
    this.CANVAS.toBlob(function(blob) {
      saveAs(blob, imageName);
    });
  }
}
