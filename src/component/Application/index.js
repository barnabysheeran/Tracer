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

    this.setStatus = this.setStatus.bind(this);
  }

  // _______________________________________________________________ Interaction

  onClickClear() {
    this.VISUAL.clear();
  }

  onClickStart() {
    this.VISUAL.start();
  }

  onClickAASamples(samples) {
    this.VISUAL.setAASamples(samples);
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
          status={this.state.status}
        />
        <Tracer ref={ref => (this.VISUAL = ref)} setStatus={this.setStatus} />
      </div>
    );
  }
}
