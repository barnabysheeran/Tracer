import React from "react";

import Renderer from "./Renderer/Renderer";

import style from "./../../index.css";

export default class Visual extends React.Component {
  constructor(props) {
    super(props);

    // Canvas Reference
    this.storeCanvasReference = this.storeCanvasReference.bind(this);

    // Scope
    this.setStatus = this.setStatus.bind(this);
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
    this.RENDERER = new Renderer(this.CONTEXT, this.setStatus);
    this.shape(800, 400);
    this.RENDERER.clear();
    this.RENDERER.start();
  }

  // _______________________________________________________________ Interaction

  clear() {
    this.RENDERER.clear();
  }

  start() {
    this.RENDERER.start();
  }

  setAASamples(samples) {
    this.RENDERER.setAASamples(samples);
  }

  setScene(sceneId) {
    this.RENDERER.setScene(sceneId);
  }

  setStatus(status) {
    this.props.setStatus(status);
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
    this.RENDERER.shape(w, h);
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
