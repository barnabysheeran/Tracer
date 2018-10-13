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
            title="Scene"
            classWidth={style.buttonWide}
            initialIndex={0}
            options={[
              { label: "Example A", value: 0 },
              { label: "Example B", value: 1 },
              { label: "Cornell Box", value: 2 }
            ]}
            onClick={this.props.onClickSetScene}
          />

          <Group
            title="Output"
            classWidth={style.buttonStandard}
            initialIndex={1}
            options={[
              { label: "400*200", value: [400, 200] },
              { label: "800*400", value: [800, 400] },
              { label: "1600*800", value: [1600, 800] }
            ]}
            onClick={this.props.onClickSetDimensions}
          />

          <Group
            title="AA Samples"
            classWidth={style.buttonNarrow}
            initialIndex={1}
            options={[
              { label: "1", value: 1 },
              { label: "10", value: 10 },
              { label: "100", value: 100 },
              { label: "500", value: 500 },
              { label: "1k", value: 1000 },
              { label: "5k", value: 5000 },
              { label: "10k", value: 10000 },
              { label: "20k", value: 20000 }
            ]}
            onClick={this.props.onClickSetAASamples}
          />

          <Group
            title="Max Bounce"
            classWidth={style.buttonNarrow}
            initialIndex={5}
            options={[
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5", value: 5 },
              { label: "50", value: 50 }
            ]}
            onClick={this.props.onClickSetBounceMax}
          />

          <Group
            title="Save Output"
            classWidth={style.buttonStandard}
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
                style.button +
                " " +
                style.buttonStandard +
                " " +
                style.buttonOff
              }
              onClick={this.props.onClickClear}
            />
            <Button
              text="Start"
              className={
                style.button +
                " " +
                style.buttonStandard +
                " " +
                style.buttonOff
              }
              onClick={this.props.onClickStart}
            />
          </div>
          <div className={style.row} />
          <div className={style.row}>
            <StatusBar status={this.props.status} />
          </div>
          <div className={style.row}>
            <StatusBar status={this.props.statistics} />
          </div>
        </div>
      </div>
    );
  }
}
