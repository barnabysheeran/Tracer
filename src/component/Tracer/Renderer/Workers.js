import RenderWorker from "./Render.worker.js";

export default class Workers {
  constructor(renderer) {
    this.RENDERER = renderer;

    // Worker total
    this.WORKER_TOTAL = navigator.hardwareConcurrency || 4;

    // Create worker pool
    this.WORKER_POOL = [];

    let renderWorker;

    for (let i = 0; i < this.WORKER_TOTAL; i++) {
      renderWorker = new RenderWorker();

      // Init
      renderWorker.postMessage({ messageType: "init", threadId: i });

      // Receive
      renderWorker.onmessage = this.onWorkerMessage.bind(this);

      // Store
      this.WORKER_POOL[i] = renderWorker;
    }

    // Time
    this.timeFrameStart = 0;
    this.timeFrameInterval = 0;

    // Reuse
    this.rowTotal = 0;
    this.row = 0;
    this.workersActive = 0;

    // Rendering
    this.isRendering = false;
  }

  // ___________________________________________________________________ Message

  onWorkerMessage(e) {
    let data = e.data;

    switch (data.message) {
      case "complete":
        this.onWorkerRowComplete(data.threadId, data.row, data.imageDataData);
        break;
    }
  }

  // ______________________________________________________________________ Init

  init() {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "initScene"
      });
    }
  }

  // ____________________________________________________________________ Render

  startFrame(timeFrameStart) {
    const WORKER_TOTAL = this.WORKER_TOTAL;

    // Time
    this.timeFrameStart = timeFrameStart;

    // Rendering
    this.isRendering = true;

    // Re-seed RNG & Build BVH
    this.seedRNG();
    this.buildBVH();

    // Workers
    this.workersActive = WORKER_TOTAL;
    this.row = WORKER_TOTAL;

    // Render
    let i;
    for (i = 0; i < WORKER_TOTAL; i++) {
      this.startWorkerRow(i, i);
    }
  }

  startWorkerRow(workerId, row) {
    this.WORKER_POOL[workerId].postMessage({
      messageType: "render",
      timeFrameStart: this.timeFrameStart,
      row: row
    });
  }

  onWorkerRowComplete(threadId, row, imageDataData) {
    // Stopped ?
    if (this.isRendering == false) {
      return;
    }

    // Draw pixels
    this.RENDERER.drawPixels(row, imageDataData);

    // Next
    if (this.row < this.rowTotal) {
      this.startWorkerRow(threadId, this.row++);
    } else {
      this.workersActive--;
      if (this.workersActive == 0) {
        this.onFrameComplete();
      }
    }
  }

  onFrameComplete() {
    this.isRendering = false;

    this.RENDERER.onFrameComplete();
  }

  clear() {
    this.isRendering = false;
  }

  // _______________________________________________________________________ RNG

  seedRNG() {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "seedRNG"
      });
    }
  }

  // _______________________________________________________________________ BVH

  buildBVH() {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "buildBVH"
      });
    }
  }

  // _____________________________________________________________________ Scene

  setScene(sceneId, timeFrameInterval) {
    // Time
    this.timeFrameInterval = timeFrameInterval;

    // Re-seed RNG
    this.seedRNG();

    // Workers
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setScene",
        sceneId: sceneId,
        timeFrameInterval: this.timeFrameInterval
      });
    }
  }

  // _____________________________________________________________________ Shape

  shape(w, h) {
    // Rows
    this.rowTotal = h;

    // Workers
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    for (let i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "shape",
        pixelWidth: w,
        pixelHeight: h
      });
    }
  }

  // __________________________________________________________________ Settings

  setAASamples(samples) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setSamplesAA",
        samples: samples
      });
    }
  }

  setBounceMax(bounceMax) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setBounceMax",
        bounceMax: bounceMax
      });
    }
  }

  setAperture(aperture) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setAperture",
        aperture: aperture
      });
    }
  }

  setFov(fov) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setFov",
        fov: fov
      });
    }
  }

  // ____________________________________________________________________ Assets

  onImageLibraryLoaded(imageDimensions, imageData) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    // const IMAGE_DIMENSIONS = this.IMAGE_LIBRARY.getImageDimensions();
    // const IMAGE_DATA = this.IMAGE_LIBRARY.getImageData();

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setTextureImageData",
        imageDimensions: imageDimensions,
        imageData: imageData
      });
    }
  }

  onMeshLibraryLoaded(positions, normals, cells) {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;
    // const POSITIONS = this.MESH_LIBRARY.getPositions();
    // const NORMALS = this.MESH_LIBRARY.getNormals();
    // const CELLS = this.MESH_LIBRARY.getCells();
    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "setMeshData",
        positions: positions,
        normals: normals,
        cells: cells
      });
    }
  }

  // ________________________________________________________________ Statistics

  statisticsReset() {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "statisticsReset"
      });
    }
  }

  statisticsPoll() {
    const WORKER_TOTAL = this.WORKER_TOTAL;
    const WORKER_POOL = this.WORKER_POOL;

    let i;

    for (i = 0; i < WORKER_TOTAL; i++) {
      WORKER_POOL[i].postMessage({
        messageType: "statisticsPoll"
      });
    }
  }

  // ____________________________________________________________________ Access

  getWorkerTotal() {
    return this.WORKER_TOTAL;
  }
}
