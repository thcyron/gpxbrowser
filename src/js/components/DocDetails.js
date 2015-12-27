"use strict";

import React from "react";
import Leaflet from "leaflet";
import moment from "moment";
import {formatDuration, formatDistance, formatPace, formatSpeed} from "../utils";
import DateTime from "./DateTime";

export default class DocDetails extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-6 kill-last-margin">
              <dl className="dl-horizontal">
                <dt>Start</dt>
                <dd><DateTime datetime={moment(this.props.doc.start)} /></dd>
                <dt>End</dt>
                <dd><DateTime datetime={moment(this.props.doc.end)} /></dd>
                <dt>Duration</dt>
                <dd>{formatDuration(this.props.doc.duration)}</dd>
                <dt>Distance</dt>
                <dd>{formatDistance(this.props.doc.distance)}</dd>
              </dl>
            </div>
            <div className="col-md-6 kill-last-margin">
              <dl className="dl-horizontal">
                <dt>Speed</dt>
                <dd>{formatSpeed(this.props.doc.distance, this.props.doc.duration)}</dd>
                <dt>Pace</dt>
                <dd>{formatPace(this.props.doc.duration, this.props.doc.distance)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
