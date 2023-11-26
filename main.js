const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadFile("index.html"); // Set the URL of your Next.js app here

	mainWindow.on("closed", function () {
		mainWindow = null;
	});
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (mainWindow === null) createWindow();
});

ipcMain.on("save-file", (event, content) => {
	// Implement the file saving logic here
	// For example, saving content to a file named 'output.txt'
	fs.writeFileSync("output.txt", content);
});
