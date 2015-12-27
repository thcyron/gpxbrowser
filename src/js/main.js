"use strict";

import electron from "electron";

const app = electron.app;

let mainWindow = null;

app.on("window-all-closed", () => {
  app.quit();
});

app.on("ready", () => {
  mainWindow = new electron.BrowserWindow({ width: 1200, height: 800 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
