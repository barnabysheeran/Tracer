import React from "react";

import Tracer from "./Tracer";

import style from "./../../index.css";

export default class Visual extends React.Component {
  constructor(props) {
    super(props);

    // Canvas Reference
    this.storeCanvasReference = this.storeCanvasReference.bind(this);
  }

  // _________________________________________________________________ Reference

  storeCanvasReference(canvasElement) {
    this.CANVAS = canvasElement;
  }

  // _____________________________________________________________________ Mount

  componentDidMount() {
    // Context
    this.CONTEXT = this.CANVAS.getContext("2d");

    // Tracer
    this.TRACER = new Tracer(this.CONTEXT);
    this.shape(400, 200);
    this.TRACER.clear();
    this.TRACER.start();
  }

  // _____________________________________________________________________ Shape

  shape(w, h) {
    const CANVAS = this.CANVAS;

    // Canvas
    CANVAS.width = w;
    CANVAS.height = h;

    CANVAS.style.width = w + "px";
    CANVAS.style.height = h + "px";

    CANVAS.style.marginLeft = w * -0.5 + "px";
    CANVAS.style.marginTop = h * -0.5 + "px";

    // Tracer
    this.TRACER.shape(w, h);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.fullscreen}>
        <div className={style.canvasHolder}>
          <canvas className={style.canvas} ref={this.storeCanvasReference} />
        </div>
      </div>
    );
  }
}
