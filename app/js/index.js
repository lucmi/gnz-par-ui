const fs = require('fs')
const electron = require('electron')
var ipc = electron.ipcRenderer

var myDir = null;

//runs straight away on the script being sourced
(function(){

  myDir = "B:/genomnzAnalysis"

  analysisList = document.getElementById('selAnalysisFolders')

  fs.readdir(myDir, function(err, dir){
    for(i = 0; i < dir.length; i++){
      analysisList.appendChild(getOption(dir[i]))
    }
  })
}())

//returns an otption element with the value and inner html of the parameter
function getOption(option){
  const optionElement = document.createElement("option")
  optionElement.value = option
  optionElement.innerHTML = option

  return optionElement
}

//send a message to the main process to create a new window
function CreateNewAnalysis(){
  ipc.send('create_AddAnalysis', myDir)
}
