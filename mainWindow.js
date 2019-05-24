// Modules
const { BrowserWindow, session } = require("electron");

// BrowserWindow instance
exports.win;

// mainWindow createWindow fn
exports.createWindow = () => {

  this.win = new BrowserWindow({
    show: false,
    minHeight: 300,
    minWidth: 1200,
    icon: `${__dirname}/assets/icons/64x64.png`,
    webPreferences: { nodeIntegration: true }
  });

  this.win.maximize();
  this.win.show();

  // Load main window content
  this.win.loadURL(`file://${__dirname}/index.html`);

  // Handle window closed
  this.win.on("closed", () => {
    this.win = null;
  });
};
