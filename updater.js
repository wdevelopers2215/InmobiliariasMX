//Modules
const {dialog, BrowserWindow, ipcMain} = require('electron')
const {autoUpdater} = require('electron-updater')

//Disable auto downloading
autoUpdater.autoDownload = false

//Check for updates
exports.check = () => {

  //Start update Check
  autoUpdater.checkForUpdates()

  //Listen for download (update) found
  autoUpdater.on('update-available', () => {

    //Track progress percent
    let downloadProgress = 0

    //Promt user to update
    dialog.showMessageBox({
      type: 'info',
      title: 'Actualización Disponible',
      message: 'Por favor no ingore este mensaje y de clic en Actualizar para tener la ultima versión de la aplicación',
      buttons: ['Actualizar', 'No']
    }, (buttonIndex) => {
      //Si no 'Actualizar' button, return
      if(buttonIndex !== 0) return

      //Else start download and show download progress in a new window
      autoUpdater.downloadUpdate()

      //Create progress window
      let progressWin = new BrowserWindow({
        width: 350,
        height: 35,
        useContentSize: true,
        autoHideMenuBar: true,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        resizable: false
      })

      //Load progress HTML
      progressWin.loadURL(`file://${__dirname}/progress.html`)

      //Handle win close
      progressWin.on('closed', () => {
        progressWin = null
      })

      //Listen for progress request from progressWin
      ipcMain.on('download-progress-request', (e) => {
        e.returnValue = downloadProgress
      })

      //Track download progress on autoUpdater
      autoUpdater.on('download-progress', (d) => {

        downloadProgress = d.percent
      })

      //Listen for completed update download
      autoUpdater.on('update-downloaded', () => {

        //Close progressWin
        if(progressWin) progressWin.close()

        //Promt user to quit and install update
        dialog.showMessageBox({
          type: 'info',
          title: 'Actualización Lista',
          message: '¿Desea salir e instalarla ahora?',
          buttons: ['Si', 'Después']
        }, (buttonIndex) => {

          //Actualizar if 'Si'
          if(buttonIndex === 0) autoUpdater.quitAndInstall()
        })
      })
    })
  })
}
