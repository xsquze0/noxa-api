fx_version 'cerulean'
-- b3JpZ2luYWwgb3duZXIgb2YgdGhpcyBzb3VyY2UgaXMgRk1B
game 'gta5'
lua54 'yes'

version '4.0.0'
author 'WaveShield'
description 'WaveShield, The Best FiveM Anti-Cheat'
discord 'https://discord.gg/waveshield'
website 'https://waveshield.xyz'

ui_page 'web/ui.html'

client_scripts {
    "resource/include.lua",
    "resource/waveshield.js",
-- ZmZmZmZmZmZmZmZmZmZtbW1tbW1tbW1tbW1tbW1tbW1tYWFhYWFhYWFhYWFhYWFhYWE=
    "resource/client/main.lua",
}

server_scripts {
    "resource/include.lua",
-- WlhYWFhYWFhYWFhYWFhYWENDQ0NDQ0NDQ0NDQ0NDQ0NDQyBmbWE=
    "resource/waveshield.js",
-- V1dXV1dXV1dXV1dXV1dXV1cgZm1h
    "resource/server/exports.lua",
    "resource/server/auth.lua",
    "web/server.js",
}
-- V1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXVyBmbWEud3Rm

files {
    'web/ui.html',
    'web/ui.js'
}

dependencies {
    "/server:14317",
    "/onesync",
}