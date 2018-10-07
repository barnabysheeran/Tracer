import bunny from "./../../asset/mesh/bunny.json";

// Meshes simplified using https://www.npmjs.com/package/obj2sc
// obj2sc < bunny.obj > bunny.json

export default class MeshLibrary {
  constructor() {
    this.URLS = [bunny];

    this.MESH_TOTAL = this.URLS.length;
    this.meshCurrent = 0;

    this.CELLS = [];
    this.POSITIONS = [];
    this.NORMALS = [];

    // Bunny
    this.CELLS[0] = bunny.cells;
    this.POSITIONS[0] = bunny.positions;
    this.NORMALS[0] = bunny.normals;
  }

  // ____________________________________________________________________ Access

  getPositions(id) {
    return this.POSITIONS[id];
  }

  getNormals(id) {
    return this.NORMALS[id];
  }

  getCells(id) {
    return this.CELLS[id];
  }
}
