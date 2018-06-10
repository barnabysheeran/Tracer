import React from "react";

import style from "./../../../index.css";

export default class GuiPageTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return <div className={style.guipagetitle}>Tracer</div>;
  }
}
