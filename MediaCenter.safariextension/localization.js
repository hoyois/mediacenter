// Media Center localization file
// Save with encoding: UTF-8

function fallback(lang) {
	switch(lang) {
	case "en-gb": return "en-us";
	case "en-ca":
	case "en-au": return "en-gb";
	case "fr-ca":
	case "fr-ch": return "fr-fr";
	case "es-xl": return "es-es";
	case "de-at":
	case "de-ch": return "de-de";
	case "no-nb": return "no-nb";
	default: return "en-us";
	}
}

const STRINGS = {
	"DOWNLOAD_VIDEO": {
		"en-us": "Download Video",
		"tr-tr": "Videoyu indir",
		"fr-fr": "Télécharger la vidéo",
		"es-es": "Descargar el vídeo",
		"de-de": "Video herunterladen",
		"ja-jp": "ビデオを保存",
		"no-nb": "Last ned video",
		"zh-tw": "下載影片",
		"zh-cn": "下载视频"
	},
	"DOWNLOAD_AUDIO": {
		"en-us": "Download Audio",
		"tr-tr": "Sesi indir",
		"fr-fr": "Télécharger l’audio",
		"es-es": "Descargar el audio",
		"de-de": "Audio herunterladen",
		"ja-jp": "オーディオを保存",
		"no-nb": "Last ned lyd",
		"zh-tw": "下載音頻",
		"zh-cn": "下载音频"
	},
	"OPEN_IN_QUICKTIME_PLAYER": {
		"en-us": "Open in QuickTime Player",
		"tr-tr": "QuickTime Player’da aç",
		"fr-fr": "Ouvrir dans QuickTime Player",
		"es-es": "Abrir en QuickTime Player",
		"de-de": "Im QuickTime-Player öffnen",
		"ja-jp": "QuickTime プレーヤーで開く",
		"no-nb": "Åpne i QuickTime Player",
		"zh-tw": "於 QuickTime Player 檢視",
		"zh-cn": "在 QuickTime Player 查看"
	},
	"SEND_VIA_AIRPLAY": {
		"en-us": "Send via AirPlay",
		"tr-tr": "AirPlay ile gönder",
		"fr-fr": "Ouvrir dans QuickTime Player",
		"es-es": "Enviar vía AirPlay",
		"de-de": "An AirPlay-Gerät senden",
		"ja-jp": "AirPlay を経由で出力",
		"no-nb": "Spill av via AirPlay",
		"zh-tw": "經由 AirPlay 輸出",
		"zh-cn": "通过 AirPlay 输出"
	}
};

for(var string in STRINGS) {
	var lang = navigator.language;
	do {
		this[string] = STRINGS[string][lang];
		lang = fallback(lang);
	} while(this[string] === undefined);
}
