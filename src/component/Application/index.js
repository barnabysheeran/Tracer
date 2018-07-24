import React from "react";

import Gui from "./../Gui";
import Tracer from "./../Tracer";

import style from "./../../index.css";

import "./../../favicon.ico";

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      status: "Initialised"
    };

    // Scope
    this.onClickClear = this.onClickClear.bind(this);
    this.onClickSetDimensions = this.onClickSetDimensions.bind(this);
    this.onClickSetScene = this.onClickSetScene.bind(this);
    this.onClickSetAASamples = this.onClickSetAASamples.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  // _______________________________________________________________ Interaction

  onClickClear() {
    this.TRACER.clear();
  }

  onClickSetDimensions(dimensions) {
    this.TRACER.setDimensions(dimensions);
  }

  onClickSetScene(sceneId) {
    this.TRACER.setScene(sceneId);
  }

  onClickSetAASamples(samples) {
    this.TRACER.setAASamples(samples);
  }

  onClickStart() {
    this.TRACER.start();
  }

  // ____________________________________________________________________ Status

  setStatus(status) {
    this.setState({ status: status });
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.fullscreen}>
        <Gui
          onClickClear={this.onClickClear}
          onClickSetDimensions={this.onClickSetDimensions}
          onClickSetScene={this.onClickSetScene}
          onClickSetAASamples={this.onClickSetAASamples}
          onClickStart={this.onClickStart}
          status={this.state.status}
        />
        <Tracer ref={ref => (this.TRACER = ref)} setStatus={this.setStatus} />
      </div>
    );
  }
}
