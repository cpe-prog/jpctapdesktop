const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadFile("index.html");

	mainWindow.on("closed", function () {
		mainWindow = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (mainWindow === null) createWindow();
});

// Listen for barcode data from the renderer process
ipcMain.on("barcode-detected", (event, barcodeData) => {
	// Send the barcode data back to the renderer to update the UI
	mainWindow.webContents.send("update-barcode", barcodeData);
});
