"use strict";

import React from "react";
import moment from "moment";
import {formatDuration, formatDistance} from "../utils";
import DateTime from "./DateTime";

export default class LogDetails extends React.Component {
  constructor(props) {
    super(props);

    let tracks = [];

    this.props.doc.tracks.forEach((track) => {
      track.segments.forEach((segment) => {
        tracks.push(segment);
      });
    });

    this.tracks = tracks;
  }

  render() {
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th className="text-right">Duration</th>
            <th className="text-right">Distance</th>
          </tr>
        </thead>
        <tbody>
          {this.tracks.map((track, i) => {
            return (
              <tr key={i}>
                <td><DateTime datetime={moment(track.start)} /></td>
                <td><DateTime datetime={moment(track.end)} /></td>
                <td className="text-right">{formatDuration(track.duration)}</td>
                <td className="text-right">{formatDistance(track.distance)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
