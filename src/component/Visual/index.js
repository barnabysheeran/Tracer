import React from "react";

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

    // DEV
    this.CANVAS.width = 200;
    this.CANVAS.height = 200;

    this.CANVAS.style.width = 200 + "px";
    this.CANVAS.style.height = 200 + "px";

    this.CANVAS.style.marginLeft = -100 + "px";
    this.CANVAS.style.marginTop = -100 + "px";
  }

  // _____________________________________________________________________ Mount

  componentDidMount() {
    console.log("componentDidMount " + this.CANVAS);

    // Context
    this.CONTEXT = this.CANVAS.getContext("2d");

    // DEV
    this.CONTEXT.fillRect(0, 0, 200, 200);
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
