"use strict";

import React from "react";
import Leaflet from "leaflet";
import moment from "moment";
import {formatDuration, formatDistance} from "../utils";
import DateTime from "./DateTime";

export default class DocSummary extends React.Component {
  render() {
    return (
      <ul className="doc-summary">
        <li><DateTime datetime={moment(this.props.doc.start)} /></li>
        <li>{formatDuration(this.props.doc.duration)}</li>
        <li>{formatDistance(this.props.doc.distance)}</li>
      </ul>
    );
  }
}
