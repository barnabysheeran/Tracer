import React from "react";

import GuiPageTitle from "../GuiPageTitle";
import GuiMenu from "./../GuiMenu";

import style from "./../../index.css";

export default class Gui extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.gui}>
        <GuiPageTitle />
        <GuiMenu />
      </div>
    );
  }
}
