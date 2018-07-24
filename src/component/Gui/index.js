import React from "react";

import MenuTitle from "./MenuTitle";
import MenuButton from "./MenuButton";
import StatusBar from "./StatusBar";

import style from "./../../index.css";

export default class Gui extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.gui}>
        <div className={style.guimenu}>
          <MenuTitle text=" " />

          <MenuButton text="Clear" onClick={this.props.onClickClear} />

          <MenuTitle text="Size" />
          <MenuButton
            text="800*400"
            value={[800, 400]}
            onClick={this.props.onClickSetDimensions}
          />
          <MenuButton
            text="800*800"
            value={[800, 800]}
            onClick={this.props.onClickSetDimensions}
          />
          <MenuButton
            text="1200*600"
            value={[1200, 600]}
            onClick={this.props.onClickSetDimensions}
          />
          <MenuButton
            text="1800*600"
            value={[1800, 600]}
            onClick={this.props.onClickSetDimensions}
          />

          <MenuTitle text="Scene" />
          <MenuButton
            text="Test"
            value={0}
            onClick={this.props.onClickSetScene}
          />
          <MenuButton
            text="Lambert Smooth"
            value={1}
            onClick={this.props.onClickSetScene}
          />
          <MenuButton
            text="Metal Smooth"
            value={2}
            onClick={this.props.onClickSetScene}
          />

          <MenuTitle text="AA Sample" />
          <MenuButton
            text="1"
            value={1}
            onClick={this.props.onClickSetAASamples}
          />
          <MenuButton
            text="10"
            value={10}
            onClick={this.props.onClickSetAASamples}
          />
          <MenuButton
            text="100"
            value={100}
            onClick={this.props.onClickSetAASamples}
          />
          <MenuButton
            text="500"
            value={500}
            onClick={this.props.onClickSetAASamples}
          />
          <MenuTitle text=" " />
          <MenuButton text="Start" onClick={this.props.onClickStart} />
        </div>
        <div>
          <StatusBar status={this.props.status} />
        </div>
      </div>
    );
  }
}
