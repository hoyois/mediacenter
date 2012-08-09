function airplay(url) {
	var xhr = new XMLHttpRequest();
	var port = ":7000";
	if(/:\d+$/.test(safari.extension.settings.airplayHostname)) port = "";
	xhr.open("POST", "http://" + safari.extension.settings.airplayHostname + port + "/play", true, "AirPlay", safari.extension.secureSettings.getItem("airplayPassword"));
	xhr.addEventListener("load", function() {
		// Set timer to prevent playback from aborting
		var timer = setInterval(function() {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://" + safari.extension.settings.airplayHostname + port + "/playback-info", true, "AirPlay", safari.extension.secureSettings.getItem("airplayPassword"));
			xhr.addEventListener("load", function() {
				if(xhr.responseXML.getElementsByTagName("key").length === 0) { // playback terminated
					clearInterval(timer);
				}
			}, false);
			xhr.addEventListener("error", function() {clearInterval(timer);}, false);
			xhr.send(null);
		}, 1000);
	}, false);
	xhr.send("Content-Location: " + url + "\nStart-Position: 0\n");
}

function stop() {
	var xhr = new XMLHttpRequest();
	var port = ":7000";
	if(/:\d+$/.test(safari.extension.settings.airplayHostname)) port = "";
	xhr.open("POST", "http://" + safari.extension.settings.airplayHostname + port + "/stop", true, "AirPlay", safari.extension.secureSettings.getItem("airplayPassword"));
	xhr.send(""); // sic
}

// TODO: airplayImage ??

function respondToCanLoad(event) {
	// Settings for injected script
	event.message = {
		"override": safari.extension.settings.override,
		"allowPropagation": safari.extension.settings.allowPropagation
	};
}

function handleContextMenu(event) {
	if(event.userInfo === null) return;
	if(event.userInfo.isLink) {
		if(safari.extension.settings.linksQTP) event.contextMenu.appendContextMenuItem("qtp", OPEN_IN_QUICKTIME_PLAYER);
		if(safari.extension.settings.linksAirPlay) event.contextMenu.appendContextMenuItem("airplay", SEND_VIA_AIRPLAY);
	} else {
		if(safari.extension.settings.mediaDownload) event.contextMenu.appendContextMenuItem("download", event.userInfo.isVideo ? DOWNLOAD_VIDEO : DOWNLOAD_AUDIO);
		if(safari.extension.settings.mediaQTP) event.contextMenu.appendContextMenuItem("qtp", OPEN_IN_QUICKTIME_PLAYER);
		if(safari.extension.settings.mediaAirPlay) event.contextMenu.appendContextMenuItem("airplay", SEND_VIA_AIRPLAY);
	}
}

function doCommand(event) {
	if(event.command === "airplay") airplay(event.userInfo.url);
	else if(event.command === "stop") stop();
	else safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(event.command, event.userInfo.url);
}

safari.application.addEventListener("message", respondToCanLoad, false);
safari.application.addEventListener("contextmenu", handleContextMenu, false);
safari.application.addEventListener("command", doCommand, false);
