fx_version 'cerulean'
game 'gta5'

version '1.0.0'
author 'Noxa Anticheat'
description 'Noxa Anticheat - The best Anti-Cheat that protects you from all cheaters.'
discord 'https://discord.gg/7Sz9TJVe3c'
website 'https://noxa-ac.netlify.app'

lua54 'yes'

ui_page "web/index.html"

client_scripts {
    "resource/noxaac.lua",
    "resource/noxaac.js",
    "resource/client/main.lua",
}

server_scripts {
    "resource/noxaac.lua",
    "resource/noxaac.js",
    "resource/server/exports.lua",
    "resource/server/auth.lua",
    "resource/server/server.js",
}

files {
    "web/index.html"
}

data_file 'DLC_ITYP_REQUEST' 'stream/mads_no_exp_pumps.ytyp'

dependencies {
    "/server:7290",
    "/onesync",
}
