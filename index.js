const { app, BrowserWindow } = require("electron");
const { join } = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });
  win.loadFile("./index.html");
};

app.whenReady().then(() => {
  createWindow();
});
