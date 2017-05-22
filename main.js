'use strict'

var electron = require('electron');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain

var mainWindow = null;

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		height: 600,
		width: 800
	});

	mainWindow.loadURL('file://'+__dirname + '/app/index.html')

	ipc.on('create_AddAnalysis', (event, arg) =>{
		var addAnalysis = new BrowserWindow({
			parent: mainWindow,
	    height: 150,
	    width: 200,
			title: 'Add Analysis',
			frame: false
	  });
	  addAnalysis.loadURL('file://' + __dirname + '/app/newAnalysis.html')
	  addAnalysis.webContents.on('did-finish-load', () => {
	    addAnalysis.webContents.send('myDir', arg)
	  });
	});
});
