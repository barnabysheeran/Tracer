import React from "react";

import Renderer from "./../../tracer/Renderer/Renderer";

import style from "./../../index.css";

export default class Tracer extends React.Component {
  constructor(props) {
    super(props);

    // Canvas Reference
    this.storeCanvasReference = this.storeCanvasReference.bind(this);

    // Scope
    this.setStatus = this.setStatus.bind(this);
    this.setStatistics = this.setStatistics.bind(this);
  }

  // _________________________________________________________________ Reference

  storeCanvasReference(canvasElement) {
    this.CANVAS = canvasElement;
  }

  // _____________________________________________________________________ Mount

  componentDidMount() {
    // Renderer
    this.RENDERER = new Renderer(
      this.CANVAS,
      this.setStatus,
      this.setStatistics
    );
    this.setDimensions([800, 400]);
    this.RENDERER.clear();
  }

  // _______________________________________________________________ Interaction

  setDimensions(dimensions) {
    this.shape(dimensions[0], dimensions[1]);
    this.clear();
  }

  setScene(sceneId) {
    this.RENDERER.setScene(sceneId);
  }

  setAASamples(samples) {
    this.RENDERER.setAASamples(samples);
  }

  setBounceMax(bounce) {
    this.RENDERER.setBounceMax(bounce);
  }

  setSaveOutput(save) {
    this.RENDERER.setSaveOutput(save);
  }

  clear() {
    this.RENDERER.clear();
  }

  start() {
    this.RENDERER.startAnimation();
  }

  // ____________________________________________________________________ Status

  setStatus(status) {
    this.props.setStatus(status);
  }

  setStatistics(status) {
    this.props.setStatistics(status);
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
