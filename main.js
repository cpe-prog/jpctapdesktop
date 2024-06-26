const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		autoHideMenuBar: true,
		minHeight: 650,
		minWidth: 950,
		icon: "icon.ico",
		title: "JpcTap-POS",
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
