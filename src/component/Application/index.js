import React from "react";

import Gui from "./../Gui";
import Visual from "./../Visual";

import style from "./../../index.css";

import "./../../favicon.ico";

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.onClickClear = this.onClickClear.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.onClickAASamples = this.onClickAASamples.bind(this);
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

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.fullscreen}>
        <Gui
          onClickClear={this.onClickClear}
          onClickStart={this.onClickStart}
          onClickAASamples={this.onClickAASamples}
        />
        <Visual ref={ref => (this.VISUAL = ref)} />
      </div>
    );
  }
}
