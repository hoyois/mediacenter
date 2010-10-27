var documentCount = 0;

function handleContextMenu(event) {
    if(event.userInfo.url) {
        if(event.userInfo.downloadable) event.contextMenu.appendContextMenuItem("download", event.userInfo.isVideo ? DOWNLOAD_VIDEO : DOWNLOAD_AUDIO);
        event.contextMenu.appendContextMenuItem("qtp", VIEW_IN_QUICKTIME_PLAYER);
    }
}

function doCommand(event) {
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(event.command, event.userInfo);
}

function respondToCanLoad(event) {
    event.message = documentCount++;
}

safari.application.addEventListener("contextmenu", handleContextMenu, false);
safari.application.addEventListener("command", doCommand, false);
safari.application.addEventListener("message", respondToCanLoad, false);

