"use strict";

import React from "react";
import classNames from "classnames";

class DirectoryEntry extends React.Component {
  handleClick(event) {
    event.preventDefault();

    if (this.props.onSelect) {
      this.props.onSelect(this.props.entry.path);
    }
  }

  render() {
    const classes = classNames({
      "list-group-item": true,
      "dir": this.props.entry.type == "dir",
      "file": this.props.entry.type == "file",
    });

    return (
      <li className={classes}>
        <a href={this.props.entry.path} onClick={this.handleClick.bind(this)}>{this.props.entry.name}</a>
      </li>
    );
  }
}

export default class Directory extends React.Component {
  handleSelect(path) {
    if (this.props.onSelect) {
      this.props.onSelect(path);
    }
  }

  render() {
    return (
      <ul className="list-group directory">
        {this.props.entries.map((entry, i) => {
          return <DirectoryEntry key={i}
                                 entry={entry}
                                 active={false}
                                 onSelect={this.handleSelect.bind(this)} />;
        })}
      </ul>
    );
  }
}
