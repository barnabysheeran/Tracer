import { vec3 } from "gl-matrix";

import World from "../World/World";
import CameraController from "../Camera/CameraController";
import Ray from "../Ray/Ray";
import HitRecord from "../Hit/HitRecord";

const CAMERA_CONTROLLER = new CameraController();
const WORLD = new World(CAMERA_CONTROLLER);

let threadId = -1;

let samplesAA = 10;
let bounceMax = 1000;

let pixelWidth = -1;
let pixelHeight = -1;

let timeFrameInterval;

let colour = vec3.create();
let colourSample = vec3.create();

let time;
let ray;

let u;
let v;
let s;

// _____________________________________________________________________ Message

self.addEventListener("message", e => {
  let data = e.data;

  switch (data.messageType) {
    case "init":
      threadId = data.threadId;
      break;
    case "shape":
      pixelWidth = data.pixelWidth;
      pixelHeight = data.pixelHeight;

      CAMERA_CONTROLLER.shape(pixelWidth, pixelHeight);
      break;
    case "setScene":
      WORLD.setScene(data.sceneId);
      timeFrameInterval = data.timeFrameInterval;
      break;
    case "setSamplesAA":
      samplesAA = data.samples;
      break;
    case "setBounceMax":
      bounceMax = data.bounceMax;
      break;
    case "setAperture":
      CAMERA_CONTROLLER.setAperture(data.aperture);
      break;
    case "setFov":
      CAMERA_CONTROLLER.setFov(data.fov);
      break;
    case "setCameraPositionById":
      CAMERA_CONTROLLER.setPositionsById(data.positionId);
      break;
    case "setTextureImageData":
      WORLD.setTextureImageDimensions(data.imageDimensions);
      WORLD.setTextureImageData(data.imageData);
      break;
    case "render":
      render(data.timeFrameStart, data.column, data.row);
      break;
  }
});

// ______________________________________________________________________ Render

let render = function(timeFrameStart, column, row) {
  // Reset
  colour[0] = 0.0;
  colour[1] = 0.0;
  colour[2] = 0.0;

  // Samples
  for (s = 0; s < samplesAA; s++) {
    u = (column + Math.random()) / pixelWidth;
    v = (pixelHeight - row + Math.random()) / pixelHeight;

    time = timeFrameStart + Math.random() * timeFrameInterval;

    WORLD.setAnimationTime(time);

    ray = CAMERA_CONTROLLER.getRay(u, v);

    colourSample = getColour(ray, 0);

    colour[0] += colourSample[0];
    colour[1] += colourSample[1];
    colour[2] += colourSample[2];
  }

  colour[0] /= samplesAA;
  colour[1] /= samplesAA;
  colour[2] /= samplesAA;

  colour[0] = Math.sqrt(colour[0]);
  colour[1] = Math.sqrt(colour[1]);
  colour[2] = Math.sqrt(colour[2]);

  // Done
  postMessage({
    message: "complete",
    threadId: threadId,
    column: column,
    row: row,
    colour: colour
  });
};

// ______________________________________________________________________ Colour

// let getColour = function(ray, depth) {
//   let hitRecord = new HitRecord();

//   if (WORLD.didHitAnything(ray, 0.001, Infinity, hitRecord) == true) {
//     let attenuation = vec3.create();
//     let scattered = new Ray();

//     if (
//       depth < bounceMax &&
//       hitRecord.material.scatter(ray, hitRecord, attenuation, scattered) == true
//     ) {
//       let colour = getColour(scattered, depth + 1);

//       return new vec3.fromValues(
//         attenuation[0] * colour[0],
//         attenuation[1] * colour[1],
//         attenuation[2] * colour[2]
//       );
//     } else {
//       return vec3.create();
//     }
//   } else {
//     // Background
//     return WORLD.getBackground(ray.getDirectionNormalized());
//   }
// };

let getColour = function(ray, depth) {
  let hitRecord = new HitRecord();

  if (WORLD.didHitAnything(ray, 0.001, Infinity, hitRecord) == true) {
    let scattered = new Ray();

    let attenuation = vec3.create();

    let emitted = hitRecord.material.emitted(
      hitRecord.u,
      hitRecord.v,
      hitRecord.position
    );

    if (
      depth < bounceMax &&
      hitRecord.material.scatter(ray, hitRecord, attenuation, scattered) == true
    ) {
      let colour = getColour(scattered, depth + 1);

      return new vec3.fromValues(
        emitted[0] + attenuation[0] * colour[0],
        emitted[1] + attenuation[1] * colour[1],
        emitted[2] + attenuation[2] * colour[2]
      );
    } else {
      return emitted;
    }
  } else {
    // Background
    return WORLD.getBackground(ray.getDirectionNormalized());
  }
};
