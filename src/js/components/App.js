"use strict";

import * as path from "path";
import * as fs from "fs";
import {spawn} from "child_process";
import React from "react";
import Doc from "./Doc";
import Breadcrumb from "./Breadcrumb";
import Directory from "./Directory";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: this.props.path,
    };

    this.fetch();
  }

  fetch() {
    const stats = fs.statSync(this.state.path);

    if (stats.isFile()) {
      this.fetchDocument();
    } else if (stats.isDirectory()) {
      this.fetchDirectory();
    }
  }

  fetchDirectory() {
    fs.readdir(this.state.path, (err, entries) => {
      if (err) {
        alert(err);
        return;
      }

      const filteredEntries = entries
        .filter(entry => entry[0] != ".")
        .map((entry) => {
          const p = path.join(this.state.path, entry);
          const st = fs.statSync(p);

          if (st.isDirectory()) {
            return {
              path: p,
              name: `${entry}/`,
              type: "dir",
            };
          }

          if (st.isFile() && /\.gpx$/i.test(entry)) {
            return {
              path: p,
              name: entry,
              type: "file",
            };
          }

          return null;
        })
        .filter((entry) => {
          return entry != null;
        });

      this.setState({
        path: this.state.path,
        entries: filteredEntries,
        doc: null,
      });
    });
  }

  fetchDocument() {
    const proc = spawn("gpxtojson", ["-"]);
    const fileStream = fs.createReadStream(this.state.path);

    let json = "";
    let stderr = "";

    fileStream.pipe(proc.stdio[0]);

    proc.on("error", (err) => {
      alert(err);
    });

    proc.stderr.on("data", (data) => {
      stderr += String(data);
    });

    proc.stdout.on("data", (data) => {
      json += String(data);
    });

    proc.on("close", (code) => {
      fileStream.close();

      if (code === 0) {
        let doc = JSON.parse(json);
        doc.name = path.basename(this.state.path);

        this.setState({
          path: this.state.path,
          entries: [],
          doc: doc,
        });
      } else {
        console.log(`gpxtojson exited with status ${code}`);
        console.log(stderr);
      }
    });

    fileStream.read();
  }

  handleDirectorySelect(newPath) {
    this.setState({
      path: newPath,
      entries: [],
      doc: null,
    }, () => {
      this.fetch();
    });
  }

  render() {
    let content;

    if (this.state.doc) {
      content = <Doc doc={this.state.doc} />;
    } else if (this.state.entries) {
      content = <Directory entries={this.state.entries} onSelect={this.handleDirectorySelect.bind(this)} />;
    }

    return (
      <div className="app">
        <div className="container-fluid">
          <Breadcrumb path={this.state.path} onSelect={this.handleDirectorySelect.bind(this)} />
          {content}
        </div>
      </div>
    );
  }
}
