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
            options={[{ label: "Test", value: 0 }]}
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
          <Group
            title="Aperture"
            narrow={true}
            initialIndex={1}
            options={[
              { label: "0.1", value: 0.1 },
              { label: "0.2", value: 0.2 },
              { label: "0.3", value: 0.3 },
              { label: "0.4", value: 0.4 },
              { label: "0.5", value: 0.5 },
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 }
            ]}
            onClick={this.props.onClickSetAperture}
          />
          <Group
            title="FOV"
            narrow={true}
            initialIndex={3}
            options={[
              { label: "1", value: 1 },
              { label: "10", value: 10 },
              { label: "15", value: 15 },
              { label: "20", value: 20 },
              { label: "25", value: 25 },
              { label: "30", value: 30 },
              { label: "35", value: 35 },
              { label: "40", value: 40 }
            ]}
            onClick={this.props.onClickSetFov}
          />
          <Group
            title="Camera"
            narrow={false}
            initialIndex={0}
            options={[
              { label: "Position A", value: 0 },
              { label: "Position B", value: 1 },
              { label: "Position C", value: 2 }
            ]}
            onClick={this.props.onClickSetCameraPosition}
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
