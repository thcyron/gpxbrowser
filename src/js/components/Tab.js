"use strict";

import React from "react";

export default class Tab extends React.Component {
  handleClick(event) {
    event.preventDefault();

    if (!this.props.active) {
      this.props.onSelect(this.props.name);
    }
  }

  render() {
    return (
      <li role="presentation" className={this.props.active ? "active" : null}>
        <a onClick={this.handleClick.bind(this)} href={"#"+this.props.name} aria-controls={this.props.name} role="tab">{this.props.label}</a>
      </li>
    );
  }
}
