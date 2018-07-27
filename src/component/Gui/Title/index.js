import React from "react";

import style from "./../../../index.css";

export default class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.menu + " " + style.title}>{this.props.text}</div>
    );
  }
}
