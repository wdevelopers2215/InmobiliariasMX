<<<<<<< HEAD
// Modules
const { BrowserWindow, session } = require("electron");

// BrowserWindow instance
exports.win;

// mainWindow createWindow fn
exports.createWindow = () => {
  //Session from new partition
  // let appSession = session.fromPartition("partition1");

  this.win = new BrowserWindow({
    minHeight: 300,
    minWidth: 1200,
    icon: `${__dirname}/assets/icons/64x64.png`
  });

  //

  // session.defaultSession.cookies.set(cookie, error => {
  //   if (error) console.error(error);
  // });

  // session.defaultSession.cookies.get(
  //   { url: "http://www.github.com" },
  //   (error, cookies) => {
  //     console.log(error, cookies);
  //   }
  // );

  // session.defaultSession.cookies.get({}, (error, cookies) => {
  //   console.log(error, cookies);
  // });

  // let mainSession = this.win.webContents.session;
  // mainSession.clearStorageData();

  this.win.maximize();

  // Load main window content
  this.win.loadURL(`file://${__dirname}/index.html`);

  // Handle window closed
  this.win.on("closed", () => {
    this.win = null;
  });
};
=======
// Modules
const {BrowserWindow} = require('electron')

// BrowserWindow instance
exports.win

// mainWindow createWindow fn
exports.createWindow = () => {

  this.win = new BrowserWindow({
    minHeight: 300,
    minWidth: 1200
  })

  this.win.maximize()

  // Load main window content
  this.win.loadURL(`file://${__dirname}/index.html`)

  // Handle window closed
  this.win.on('closed', () => {
    this.win = null
  })
}
>>>>>>> 9daba400ea2cbc188df48a5c7eeb64eae7bcca1b
