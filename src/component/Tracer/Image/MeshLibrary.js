import { GltfLoader } from "gltf-loader-ts";

import bunny from "./../../../asset/mesh/bunny.gltf";

export default class MeshLibrary {
  constructor(renderer) {
    this.RENDERER = renderer;

    this.URLS = [bunny];

    this.MESH_TOTAL = this.URLS.length;
    this.meshCurrent = 0;

    this.ASSETS = [];

    // Start load
    this.loadNextMesh();
  }

  // https://www.npmjs.com/package/gltf-loader-ts

  // ______________________________________________________________________ Load

  loadNextMesh() {
    let loader = new GltfLoader();
    loader
      .load(this.URLS[this.meshCurrent])
      .then(response => this.prefetchMesh(response));
  }

  prefetchMesh(response) {
    this.ASSETS[this.meshCurrent] = response;

    response.preFetchAll().then(response => this.onMeshLoaded(response));
  }

  onMeshLoaded(response) {
    response;

    // Next
    this.meshCurrent++;
    if (this.meshCurrent < this.MESH_TOTAL) {
      this.loadNextMesh();
    } else {
      this.onMeshesLoaded();
    }
  }

  onMeshesLoaded() {
    this.RENDERER.onMeshLibraryLoaded();
  }

  // ____________________________________________________________________ Access

  getAssets() {
    return this.ASSETS;
  }
}
