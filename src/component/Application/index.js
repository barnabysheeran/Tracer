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
    this.onClickStart = this.onClickStart.bind(this);
    this.onClickAASamples = this.onClickAASamples.bind(this);
    this.onClickSetScene = this.onClickSetScene.bind(this);

    this.setStatus = this.setStatus.bind(this);
  }

  // _______________________________________________________________ Interaction

  onClickClear() {
    this.TRACER.clear();
  }

  onClickStart() {
    this.TRACER.start();
  }

  onClickAASamples(samples) {
    this.TRACER.setAASamples(samples);
  }

  onClickSetScene(sceneId) {
    this.TRACER.setScene(sceneId);
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
          onClickStart={this.onClickStart}
          onClickAASamples={this.onClickAASamples}
          onClickSetScene={this.onClickSetScene}
          status={this.state.status}
        />
        <Tracer ref={ref => (this.TRACER = ref)} setStatus={this.setStatus} />
      </div>
    );
  }
}
