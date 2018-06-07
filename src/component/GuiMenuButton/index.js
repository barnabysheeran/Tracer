import React from "react";

import style from "./../../index.css";

export default class GuiButton extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.guimenu + " " + style.guimenubutton}>GuiButton</div>
    );
  }
}
