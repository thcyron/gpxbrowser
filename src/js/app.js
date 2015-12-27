"use strict";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(
  <App path={process.cwd()} />,
  document.getElementById("app")
);
