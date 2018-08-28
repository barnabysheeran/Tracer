import bunny from "./../../../asset/mesh/bunny.json";

// Meshes simplified using https://www.npmjs.com/package/obj2sc

export default class MeshLibrary {
  constructor(renderer) {
    this.RENDERER = renderer;

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

  getPositions() {
    return this.POSITIONS;
  }

  getNormals() {
    return this.NORMALS;
  }

  getCells() {
    return this.CELLS;
  }
}
