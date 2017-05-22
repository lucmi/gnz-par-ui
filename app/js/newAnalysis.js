const ipc = require('electron').ipcRenderer
const remote = require('electron').remote
const fs = require('fs')

let myDir = null;

//this function runs immediatley on the script being sourced
(function() {
  let btnAdd = document.getElementById('btnAdd')
  let txtAnalysis  = document.getElementById('txtAnalysis')
  let btnCancel = document.getElementById('btnCancel')

  btnAdd.onclick = function() {
    if (myDir !== null && txtAnalysis.value !== ""){
      let dir= [myDir, txtAnalysis.value].join("/")
      //this will be replaced by a call to the server to setup the analysis folder
      fs.mkdirSync(dir)
      remote.getCurrentWindow().close();
    }
  }
}())

//what to do when receiving a message entitled "myDir"
ipc.on('myDir', (event, message) => {
  myDir = message
})
