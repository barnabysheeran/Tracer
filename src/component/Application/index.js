import React from "react";

import Gui from "./../Gui";
import Visual from "./../Visual";

import style from "./../../index.css";

import "./../../favicon.ico";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.fullscreen}>
        <Gui />
        <Visual />
      </div>
    );
  }
}
