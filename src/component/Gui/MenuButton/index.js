import React from "react";

import style from "./../../../index.css";

export default class MenuButton extends React.Component {
  constructor(props) {
    super(props);

    // Scope
    this.handleClick = this.handleClick.bind(this);
  }

  // _______________________________________________________________ Interaction

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(this.props.value);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div
        className={style.guimenu + " " + style.guimenubutton}
        onClick={this.handleClick}
      >
        {this.props.text}
      </div>
    );
  }
}
