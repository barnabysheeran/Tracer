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
            initialIndex={2}
            options={[
              { label: "50*50", value: [50, 50] },
              { label: "512*512", value: [512, 512] },
              { label: "200*100", value: [200, 100] },
              { label: "400*200", value: [400, 200] },
              { label: "800*400", value: [800, 400] },
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
              { label: "AnimTest", value: 1 },
              { label: "MarbleTest", value: 2 },
              { label: "ImageTest", value: 3 },
              { label: "Bunny", value: 4 },
              { label: "LightTest", value: 5 }
            ]}
            onClick={this.props.onClickSetScene}
          />
          <Group
            title="AA Samples"
            narrow={true}
            initialIndex={0}
            options={[
              { label: "10", value: 10 },
              { label: "100", value: 100 },
              { label: "500", value: 500 },
              { label: "1k", value: 1000 },
              { label: "5k", value: 5000 },
              { label: "10k", value: 10000 }
            ]}
            onClick={this.props.onClickSetAASamples}
          />
          <Group
            title="Max Bounce"
            narrow={true}
            initialIndex={1}
            options={[
              { label: "1", value: 1 },
              { label: "1k", value: 1000 },
              { label: "2k", value: 2000 }
            ]}
            onClick={this.props.onClickSetBounceMax}
          />
          <Group
            title="Save Output"
            narrow={false}
            initialIndex={0}
            options={[
              { label: "Off", value: false },
              { label: "On", value: true }
            ]}
            onClick={this.props.onClickSetSaveOutput}
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
          <div className={style.row}>
            <StatusBar status={this.props.statusStatistics} />
          </div>
        </div>
      </div>
    );
  }
}
