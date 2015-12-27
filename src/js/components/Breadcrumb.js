"use strict";

import * as path from "path";
import React from "react";

class BreadcrumbComponent extends React.Component {
  handleClick(event) {
    event.preventDefault();
    this.props.onSelect(this);
  }

  render() {
    if (this.props.active) {
      return (
        <li className="active">{this.props.name}</li>
      );
    }

    return (
      <li>
        <a href={this.props.path} onClick={this.handleClick.bind(this)}>{this.props.name}</a>
      </li>
    );
  }
}

export default class Breadcrumb extends React.Component {
  handleSelect(component) {
    if (this.props.onSelect) {
      this.props.onSelect(component.props.path);
    }
  }

  render() {
    const pathComponents = this.props.path.split(path.sep).filter(x => x.length > 0);
    const componentsWithPath = pathComponents.map((name, i) => {
      return {
        name: name,
        path: path.join("/", ...pathComponents.slice(0, i + 1)),
      };
    });

    return (
      <ol className="breadcrumb">
        {componentsWithPath.map((component, i) => {
          return <BreadcrumbComponent key={i}
                                      name={component.name}
                                      path={component.path}
                                      active={i == pathComponents.length - 1}
                                      onSelect={this.handleSelect.bind(this)} />;
        })}
      </ol>
    );
  }
}
