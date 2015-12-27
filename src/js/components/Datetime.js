"use strict";

import React from "react";

export default class DateTime extends React.Component {
  render() {
    return (
      <time dateTime={this.props.datetime.format("YYYY-MM-DD HH:mm:ss")}>
        {this.props.datetime.format("YYYY-MM-DD H:mm:ss")} <span className="text-muted">{this.props.datetime.format("Z")}</span>
      </time>
    );
  }
}
