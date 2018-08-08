import { vec3 } from "gl-matrix";

let colour = vec3.create();

let threadId = -1;

// _____________________________________________________________________ Message

self.addEventListener("message", e => {
  let data = e.data;

  if (data.messageType == "init") {
    threadId = data.threadId;
  }

  if (data.messageType == "render") {
    // TODO set vars
    render();
  }

  postMessage({ threadId: threadId, message: "hello" });
});

// ______________________________________________________________________ Render

let render = function() {
  // Reset colour
  colour[0] = 0.0;
  colour[1] = 0.0;
  colour[2] = 0.0;
};
