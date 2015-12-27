"use strict";

import React from "react";
import ReactDOM from "react-dom";
import Leaflet from "leaflet";

export default class DocMap extends React.Component {
  componentDidMount() {
    this.map = Leaflet.map(ReactDOM.findDOMNode(this));
    this.map.addLayer(Leaflet.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));
    this.updateMap();
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }

  updateMap() {
    if (this.multiPolyline) {
      this.map.removeLayer(this.multiPolyline);
    }

    let latlngs = [];

    this.props.doc.tracks.forEach((track) => {
      track.segments.forEach((segment) => {
        latlngs.push(segment.points.map((point) => {
          return [point.lat, point.lon];
        }));
      });
    });

    this.multiPolyline = Leaflet.multiPolyline(latlngs, { color: "red" });
    this.multiPolyline.addTo(this.map);
    this.map.fitBounds(this.multiPolyline.getBounds());
  }

  render() {
    if (this.map) {
      this.updateMap();
    }

    return <div className="doc-map"></div>;
  }
}
