import React from "react";

import Title from "./Title";
import Group from "./Group";
import Button from "./Button";
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
        <div className={style.menu}>
          <Group
            title="Output"
            narrow={false}
            initialIndex={1}
            options={[
              { label: "400*400", value: [400, 400] },
              { label: "800*400", value: [800, 400] },
              { label: "800*800", value: [800, 800] },
              { label: "1600*800", value: [1600, 800] }
            ]}
            onClick={this.props.onClickSetDimensions}
          />
          <Group
            title="Scene"
            narrow={false}
            initialIndex={0}
            options={[
              { label: "Test", value: 0 },
              { label: "Pyramid", value: 1 }
            ]}
            onClick={this.props.onClickSetScene}
          />
          <Group
            title="AA Samples"
            narrow={true}
            initialIndex={0}
            options={[
              { label: "1", value: 1 },
              { label: "10", value: 10 },
              { label: "25", value: 25 },
              { label: "50", value: 50 },
              { label: "100", value: 100 },
              { label: "200", value: 200 },
              { label: "300", value: 300 },
              { label: "500", value: 500 }
            ]}
            onClick={this.props.onClickSetAASamples}
          />
          <Group
            title="Max Bounce"
            narrow={true}
            initialIndex={7}
            options={[
              { label: "1", value: 1 },
              { label: "10", value: 10 },
              { label: "50", value: 50 },
              { label: "100", value: 100 },
              { label: "500", value: 500 },
              { label: "1k", value: 1000 },
              { label: "5k", value: 5000 },
              { label: "10k", value: 10000 }
            ]}
            onClick={this.props.onClickSetBounceMax}
          />
          <div className={style.row} />
          <div className={style.row}>
            <Title text="" />
            <Button
              text="Clear"
              className={
                style.button + " " + style.buttonWide + " " + style.buttonOff
              }
              onClick={this.props.onClickClear}
            />
            <Button
              text="Start"
              className={
                style.button + " " + style.buttonWide + " " + style.buttonOff
              }
              onClick={this.props.onClickStart}
            />
          </div>
          <div className={style.row} />
          <div className={style.row}>
            <StatusBar status={this.props.status} />
          </div>
        </div>
      </div>
    );
  }
}
