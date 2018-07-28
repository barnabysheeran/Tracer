import React from "react";

export default class Button extends React.Component {
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
      <div className={this.props.className} onClick={this.handleClick}>
        {this.props.text}
      </div>
    );
  }
}
