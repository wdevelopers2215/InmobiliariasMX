const {app, BrowserWindow} = require('electron');

/*const path = require('path');
const url = require('url');*/

let mainWindow;

process.env.GOOGLE_API_KEY = 'AIzaSyDWwimwqf8iqMjtvr1uN0jl2Jrqo2FloP8';

function createWindow() {
  //mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow = new BrowserWindow({
    minHeight: 300,
    minWidth: 1200
  });
  mainWindow.maximize();
  //mainWindow.setMenu(null);

  mainWindow.loadFile('index.html');

  /*mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))*/

  mainWindow.on('closed', function () {
    mainWindow = null
  });

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
