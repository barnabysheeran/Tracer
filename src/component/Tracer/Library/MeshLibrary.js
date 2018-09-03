import bunny from "./../../../asset/mesh/bunny.json";
import bunnyStanford from "./../../../asset/mesh/stanfordbunny.json";

// Meshes simplified using https://www.npmjs.com/package/obj2sc
// obj2sc < bunny.obj > bunny.json

export default class MeshLibrary {
  constructor(renderer) {
    this.RENDERER = renderer;

    this.URLS = [bunny, bunnyStanford];

    this.MESH_TOTAL = this.URLS.length;
    this.meshCurrent = 0;

    this.CELLS = [];
    this.POSITIONS = [];
    this.NORMALS = [];

    // Bunny
    this.CELLS[0] = bunny.cells;
    this.POSITIONS[0] = bunny.positions;
    this.NORMALS[0] = bunny.normals;

    // Bunny Stanford
    this.CELLS[1] = bunnyStanford.cells;
    this.POSITIONS[1] = bunnyStanford.positions;
    this.NORMALS[1] = bunnyStanford.normals;
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
