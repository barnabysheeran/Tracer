import React from "react";

import "./../../favicon.ico";

import style from "./../../index.css";

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return <div className={style.fullscreen}>Application</div>;
  }
}

export default Application;
