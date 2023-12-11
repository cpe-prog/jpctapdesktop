const { ipcRenderer } = require("electron");
const Quagga = require("quagga");

Quagga.init(
	{
		inputStream: {
			name: "Live",
			type: "LiveStream",
			target: document.querySelector("#result"),
			constraints: {
				width: 800,
				height: 600,
				facingMode: "environment",
			},
		},
		decoder: {
			readers: ["ean_reader"],
		},
	},
	function (err) {
		if (err) {
			console.error(err);
			return;
		}
		console.log("Initialization finished. Ready to start");
		Quagga.start();
	}
);

Quagga.onDetected(function (result) {
	const barcodeData = result.codeResult.code;
	console.log("Barcode detected and processed: ", barcodeData);
	ipcRenderer.send("barcode-detected", barcodeData);
});

// Listen for the barcode data from the main process
ipcRenderer.on("update-barcode", (event, barcodeData) => {
	document.querySelector(
		"#result"
	).innerText = `Scanned Barcode: ${barcodeData}`;
});
