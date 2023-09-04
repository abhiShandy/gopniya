const { app, BrowserWindow, Menu } = require("electron");

Menu.setApplicationMenu(null);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {},
  });
  win.loadURL("http://localhost:5173"); // TODO: change to file:// or loadFile in production
};

app.whenReady().then(() => {
  createWindow();
});
