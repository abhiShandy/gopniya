const { app, BrowserWindow, Menu } = require("electron");

const isMac = process.platform === "darwin";

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        click: () => {
          console.log("Open clicked");
        },
      },
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [{ role: "toggleDevTools" }],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {},
  });
  win.loadURL("http://localhost:5173"); // TODO: change to file:// in production
};

app.whenReady().then(() => {
  createWindow();
});
