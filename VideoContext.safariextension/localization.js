// VideoContext localization file
// Save with encoding: UTF-8

function fallback(lang) {
    switch(lang) {
        case "en-gb": return "en-us";
        case "en-ca": return "en-gb";
        case "fr-ca": return "fr-fr";
        default: return "en-us";
    }
}

const STRINGS = {
    DOWNLOAD_VIDEO: {
        "en-us": "Download Video",
        "fr-fr": "Télécharger la vidéo"
    },
    DOWNLOAD_AUDIO: {
        "en-us": "Download Audio",
        "fr-fr": "Télécharger l'audio"
    },
    VIEW_IN_QUICKTIME_PLAYER: {
        "en-us": "View in QuickTime Player",
        "fr-fr": "Ouvrir avec QuickTime Player"
    }
};

for(var string in STRINGS) {
    var lang = navigator.language;
    do {
        this[string] = STRINGS[string][lang];
        lang = fallback(lang);
    } while(this[string] === undefined);
}


