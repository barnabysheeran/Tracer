import React from "react";

import Button from "./../Button";
import Title from "./../Title";

import style from "./../../../index.css";

export default class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.initialIndex
    };
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.row}>
        <Title text={this.props.title} />
        <React.Fragment>
          {this.props.options.map((option, index) => (
            <Button
              className={
                style.button +
                " " +
                (this.props.narrow === true
                  ? style.buttonNarrow
                  : style.buttonWide) +
                " " +
                (index === this.state.selectedIndex
                  ? style.buttonOn
                  : style.buttonOff)
              }
              key={index}
              text={option.label}
              value={option.value}
              onClick={() => {
                this.props.onClick(option.value);
                this.setState({ selectedIndex: index });
              }}
            />
          ))}
        </React.Fragment>
        <br />
        <br />
      </div>
    );
  }
}
