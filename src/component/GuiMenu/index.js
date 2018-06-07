import React from "react";

import GuiMenuButton from "./../GuiMenuButton";
import GuiMenuTitle from "./../GuiMenuTitle";

import style from "./../../index.css";

export default class GuiMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.guimenu}>
        <GuiMenuTitle />
        <GuiMenuButton />
      </div>
    );
  }
}
