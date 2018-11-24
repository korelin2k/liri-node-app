import * as dotenv from "dotenv";
import * as inquire from "inquirer";
import * as spotify from "node-spotify-api";

// Pull in environment properties
dotenv.config();

// Define the authorization parameters to leverage the Spotify API
const music = new spotify(
    {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET,
    });

music.search({ type: "track", query: "All the Small Things" })
    .then((response) => {
        console.log(response);
    }, (err) => {
        console.log(err);
    });
