const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		width: 800,
		height: 600,
		minHeight: 600,
		minWidth: 800,
		icon: "icon.png",
		title: "Barcode Scanner",
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL("https://jpc-tap.vercel.app/");

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

ipcMain.on("barcode-detected", (event, barcodeData) => {
	mainWindow.webContents.send("update-barcode", barcodeData);
});
