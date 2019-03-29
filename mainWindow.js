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
