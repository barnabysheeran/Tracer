import React from "react";

import GuiPageTitle from "./GuiPageTitle";
import GuiMenuButton from "./GuiMenuButton";
import GuiMenuTitle from "./GuiMenuTitle";

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
        <div className={style.guimenu}>
          <GuiMenuTitle text="AA Sample" />
          <GuiMenuButton
            text="1"
            value={1}
            onClick={this.props.onClickAASamples}
          />
          <GuiMenuButton
            text="10"
            value={10}
            onClick={this.props.onClickAASamples}
          />
          <GuiMenuButton
            text="100"
            value={100}
            onClick={this.props.onClickAASamples}
          />
          <GuiMenuButton
            text="500"
            value={500}
            onClick={this.props.onClickAASamples}
          />
          <GuiMenuTitle text=" " />
          <GuiMenuButton text="Clear" onClick={this.props.onClickClear} />
          <GuiMenuButton text="Start" onClick={this.props.onClickStart} />
        </div>
      </div>
    );
  }
}
