var documentID;
    
function viewInQuickTimePlayer(url) {
    // Relative URLs need to be resolved for QTP
    var tmpAnchor = document.createElement("a");
    tmpAnchor.href = url;
    url = tmpAnchor.href;
    var QTObject = document.createElement("embed");
    QTObject.className = "CTFallowedToLoad";
    QTObject.setAttribute("type", "video/quicktime");
    QTObject.setAttribute("width", "0");
    QTObject.setAttribute("height", "0");
    QTObject.style.width = "0 !important";
    QTObject.style.height = "0 !important";
    // need an external URL for source, since QT plugin doesn't accept safari-extension:// protocol
    // Apple has a small 1px image for this exact purpose
    QTObject.setAttribute("src", "http://images.apple.com/apple-events/includes/qtbutton.mov");
    QTObject.setAttribute("href", url);
    QTObject.setAttribute("target", "quicktimeplayer");
    QTObject.setAttribute("autohref", "true");
    QTObject.setAttribute("controller", "false");
    document.body.appendChild(QTObject);
    //setTimeout(function() {document.body.removeChild(QTObject);}, 1000);
}

function downloadURL(url) {
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, true, false, false, 0, null);
    
    downloadLink.dispatchEvent(event);
}

function handleMessageEvent(event) {
    if(event.message.documentID !== documentID) return;
    switch(event.name) {
        case "download":
            downloadURL(event.message.url);
            break;
        case "qtp":
            viewInQuickTimePlayer(event.message.url);
            break;
    }
}

function handleBeforeLoadEvent(event) {
    const media = event.target;
    if(!(media instanceof HTMLMediaElement)) return;
    if(media.className === "CTFvideoElement") return; // CTF compatibility
    var url = event.url;
    if(url === media.poster) return; // posters fire beforeload events...
    
    if(documentID === undefined) documentID = safari.self.tab.canLoad(event, "");
    var isVideo = media instanceof HTMLVideoElement;
    var downloadable = true;
    
    // Streaming videos are not downloadable
    if(/^rts?p:/.test(url)) downloadable = false;
    
    // Neither are Vimeo videos
    if(/^(?:http:\/\/vimeo\.com)?\/play_redirect/.test(url)) downloadable = false;
    
    // Site-specific hacks
    switch(window.location.host) {
        case "trailers.apple.com":
            try{
                var controlLayer = media.parentNode.getElementsByClassName("ACMediaControls")[0];
                controlLayer.style.pointerEvents = "none";
                controlLayer.getElementsByClassName("mediaControllerPanel")[0].style.pointerEvents = "auto";
            } catch(err){}
            break;
        case "vimeo.com":
        case "www.vimeo.com":
            try{
                media.parentNode.getElementsByClassName("cover")[0].style.pointerEvents = "none";
            } catch(err){}
            break;
    }
    
    // YouTube5
    if(media.nextSibling && media.nextSibling.className === "youtube5overlay") {
        media.nextSibling.style.pointerEvents = "none";
        var UIElements = media.nextSibling.getElementsByTagName("div");
        for(var i = 0; i < UIElements.length; i++) {
            UIElements[i].style.pointerEvents = "auto";
        }
    }
    
    var handleContextMenu = function(e) {
        safari.self.tab.setContextMenuEventUserInfo(e, {"documentID": documentID, "url": url, "isVideo": isVideo, "downloadable": downloadable});
        e.stopPropagation();
    };
    media.addEventListener("contextmenu", handleContextMenu, false);
}

safari.self.addEventListener("message", handleMessageEvent, false);
document.addEventListener("beforeload", handleBeforeLoadEvent, true);

