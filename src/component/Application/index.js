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
      status: "Initialised",
      statistics: "..."
    };

    // Scope
    this.onClickSetDimensions = this.onClickSetDimensions.bind(this);
    this.onClickSetScene = this.onClickSetScene.bind(this);
    this.onClickSetAASamples = this.onClickSetAASamples.bind(this);
    this.onClickSetBounceMax = this.onClickSetBounceMax.bind(this);
    this.onClickSetSaveOutput = this.onClickSetSaveOutput.bind(this);

    this.onClickClear = this.onClickClear.bind(this);
    this.onClickStart = this.onClickStart.bind(this);

    this.setStatus = this.setStatus.bind(this);
    this.setStatistics = this.setStatistics.bind(this);
  }

  // _______________________________________________________________ Interaction

  onClickSetDimensions(dimensions) {
    this.TRACER.setDimensions(dimensions);
  }

  onClickSetScene(sceneId) {
    this.TRACER.setScene(sceneId);
  }

  onClickSetAASamples(samples) {
    this.TRACER.setAASamples(samples);
  }

  onClickSetBounceMax(bounceMax) {
    this.TRACER.setBounceMax(bounceMax);
  }

  onClickSetSaveOutput(save) {
    this.TRACER.setSaveOutput(save);
  }

  onClickClear() {
    this.TRACER.clear();
  }

  onClickStart() {
    this.TRACER.start();
  }

  setStatus(status) {
    this.setState({ status: status });
  }

  setStatistics(statistics) {
    this.setState({ statistics: statistics });
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.fullscreen}>
        <Gui
          onClickSetDimensions={this.onClickSetDimensions}
          onClickSetScene={this.onClickSetScene}
          onClickSetAASamples={this.onClickSetAASamples}
          onClickSetBounceMax={this.onClickSetBounceMax}
          onClickSetSaveOutput={this.onClickSetSaveOutput}
          onClickClear={this.onClickClear}
          onClickStart={this.onClickStart}
          status={this.state.status}
          statistics={this.state.statistics}
        />
        <Tracer
          ref={ref => (this.TRACER = ref)}
          setStatus={this.setStatus}
          setStatistics={this.setStatistics}
        />
      </div>
    );
  }
}
