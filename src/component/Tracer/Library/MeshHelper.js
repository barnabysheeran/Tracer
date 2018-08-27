export default class MeshHelper {
  constructor(asset) {
    console.log("MeshHelper");
    console.log(asset);

    if (asset == undefined) {
      return;
    }

    // Parse
    // https://github.com/bwasty/gltf-loader-ts/blob/master/examples/example.js

    const GLTF = asset.gltf;

    const SCENE_INDEX = GLTF.scene | 0;
    const SCENE = GLTF.scenes[SCENE_INDEX];
    const ROOT_NODES = SCENE.nodes;

    for (let nodeIndex of ROOT_NODES) {
      // get to the first primitive
      let node = GLTF.nodes[nodeIndex];

      console.log(node);

      let child = GLTF.nodes[node.children[0]];

      console.log(child);

      //let mesh = GLTF.meshes[child.mesh];
      //let primitive = mesh.primitives[0];

      // get the vertex data for the primitive
      //let positionAccessorIndex = primitive.attributes.POSITION;
    }

    // for (let nodeIndex of rootNodes) {
    //     // get to the first primitive
    //     let node = gltf.nodes[nodeIndex];
    //     let child = gltf.nodes[node.children[0]];
    //     let mesh = gltf.meshes[child.mesh];
    //     let primitive = mesh.primitives[0];

    //     // get the vertex data for the primitive
    //     let positionAccessorIndex = primitive.attributes.POSITION;

    //     //
    //     // Get the binary data, which might be in a .bin file that still has to be loaded,
    //     // in another part of the source GLB file, or embedded as a data URI.
    //     //
    //     let data = await asset.accessorData(positionAccessorIndex);
    //     console.log("Accessor containing positions: ", data);
    //     // For rendering, `data` can be bound via `gl.BindBuffer`,
    //     // and the accessor properties can be used with `gl.VertexAttribPointer`

    //     // parse the material to get to the first texture
    //     let material = gltf.materials[primitive.material];
    //     let baseColorTexture = gltf.textures[material.pbrMetallicRoughness.baseColorTexture.index];
    //     let imageIndex = baseColorTexture.source;

    //     //
    //     // Get image data which might also be in a separate file, in a GLB file,
    //     // or embedded as a data URI.
    //     //
    //     let image = await asset.imageData.get(imageIndex);
    //     document.body.appendChild(image);
    //     // For rendering, use `gl.texImage2D` with the image
    // }

    // const MESH = meshAsset.meshes[child.mesh];
    // const PRIMATIVE = MESH.primitives[0];

    // console.log("PRIMATIVE " + PRIMATIVE);

    // this.VERTEX = [];
    // this.NORMAL = [];
  }
}
