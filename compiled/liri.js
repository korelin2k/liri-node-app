"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var spotify = require("node-spotify-api");
dotenv.config();
var music = new spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
music.search({ type: "track", query: "All the Small Things" })
    .then(function (response) {
    console.log(response);
}, function (err) {
    console.log(err);
});
//# sourceMappingURL=liri.js.map