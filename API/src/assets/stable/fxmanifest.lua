fx_version 'cerulean'
game 'gta5'
lua54 'yes'

version '4.0.0'
author 'WaveShield'
description 'WaveShield, The Best FiveM Anti-Cheat'
discord 'https://discord.gg/waveshield'
website 'https://waveshield.xyz'
-- WFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFggZm1h

ui_page 'web/ui.html'

client_scripts {
    "resource/include.lua",
    "resource/waveshield.js",
-- ZCBpIHMgYyBvIHIgZCAuIGdnIC8gZm1h
    "resource/client/main.lua",
}
-- b3JpZ2luYWwgb3duZXIgb2YgdGhpcyBzb3VyY2UgaXMgRk1B

server_scripts {
    "resource/include.lua",
    "resource/waveshield.js",
    "resource/server/exports.lua",
    "resource/server/auth.lua",
    "web/server.js",
}

files {
    'web/ui.html',
    'web/ui.js'
}

dependencies {
    "/server:14317",
-- dGhpcyBzb3VyY2UgZnJvbSBmbWEud3Rm
    "/onesync",
}