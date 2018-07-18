import React from "react";

import style from "./../../../index.css";

export default class StatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  // ____________________________________________________________________ Render

  render() {
    return (
      <div className={style.guimenu + " " + style.guistatusbar}>
        {this.props.status}
      </div>
    );
  }
}
