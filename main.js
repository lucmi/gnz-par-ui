'use strict'

var electron = require('electron');
var ssh = require('simple-ssh');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain

var mainWindow = null;
var connection = null;

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

	ipc.on('provide_connection', (event, arg) => {
		if(connection !== null){
			//return the connection somehow
			event.sender.send('provide_connection_reply', connection)
		}else{
			//make new connection
			var setupConnection = new BrowserWindow({
				parent: mainWindow,
		    height: 150,
		    width: 300,
				title: 'Setup Connection',
				frame: false
			});
			setupConnection.loadURL('file://' + __dirname + '/app/setupConnection.html')
		}
	})

});
