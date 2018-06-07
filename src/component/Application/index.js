import React from "react";

import Gui from "./../Gui";

import "./../../favicon.ico";

import style from "./../../index.css";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.fullscreen}>
        <Gui />
      </div>
    );
  }
}
