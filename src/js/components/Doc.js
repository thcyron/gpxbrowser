"use strict";

import React from "react";
import DocTabs from "./DocTabs";
import DocMap from "./DocMap";
import DocSummary from "./DocSummary";
import DocDetails from "./DocDetails";
import DocTracks from "./DocTracks";

export default class Doc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "map",
    };
  }

  handleTabChange(tab) {
    this.setState({
      activeTab: tab,
    });
  }

  render() {
    let content;

    switch (this.state.activeTab) {
    case "map":
      content = <DocMap doc={this.props.doc} />;
      break;
    case "details":
      content = <DocDetails doc={this.props.doc} />;
      break;
    case "tracks":
      content = <DocTracks doc={this.props.doc} />;
      break;
    }

    return (
      <div className="doc">
        <h1 className="doc-title">{this.props.doc.name}</h1>
        <DocSummary doc={this.props.doc} />
        <DocTabs active={this.state.activeTab} onChange={this.handleTabChange.bind(this)} />
        {content}
      </div>
    );
  }
}
