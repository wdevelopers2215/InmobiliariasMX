const {app, BrowserWindow} = require('electron');
const mainWindow = require('./mainWindow')
const updater = require('./updater');

/*const path = require('path');
const url = require('url');*/

process.env.GOOGLE_API_KEY = 'AIzaSyDWwimwqf8iqMjtvr1uN0jl2Jrqo2FloP8';

app.on('ready', () => {

  //create main window
  mainWindow.createWindow()

  //Check for update after x seconds
  setTimeout(updater.check, 2000)
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    mainWindow.createWindow()
  }
})
