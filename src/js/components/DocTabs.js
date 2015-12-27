"use strict";

import React from "react";
import Tab from "./Tab";

export default class LogTabs extends React.Component {
  constructor(props) {
    super(props);

    this.tabs = [
      { name: "map", label: "Map" },
      { name: "details", label: "Details" },
      { name: "tracks", label: "Tracks" },
    ];
  }

  handleSelect(tab) {
    this.props.onChange(tab);
  }

  render() {
    return (
      <ul className="nav nav-tabs doc-tabs" role="tablist">
        {this.tabs.map((tab, i) => {
          return <Tab key={i}
                      name={tab.name}
                      label={tab.label}
                      active={this.props.active == tab.name}
                      onSelect={this.handleSelect.bind(this)} />;
        })}
      </ul>
    );
  }
}
