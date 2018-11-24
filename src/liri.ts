import * as dotenv from "dotenv";
import * as inquirer from "inquirer";
import * as spotify from "node-spotify-api";

// Pull in environment properties
dotenv.config();

// Music Object
const myMusic = {
    musicConnection: new spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET,
    }),

    search(track: string) {
        this.musicConnection.search({ type: "track", query: track })
            .then((response) => {
                // console.log(response);
                this.formatSong(response);
            }, (err) => {
                console.log(err);
            });
    },
    formatSong(songDetails: any) {
        const songList = songDetails.tracks.items;
        let stringOutput: string = "";
        let i: any;

        for (i in songList) {
            if (songList[i]) {
                console.log(songList[i]);
                stringOutput += "\n===================================================\n";

                const artistList = songList[i].artists;
                let previewURL: string = "";

                let artistOutput: string = "";
                for (i in artistList) {
                    if (artistList[i]) {
                        artistOutput += `${artistList[i].name} `;
                    }
                }

                stringOutput += `Artist(s): ${artistOutput}\n`;
                stringOutput += `Song: ${songList[i].name}\n`;

                if (!songList[i].preview_url) {
                    previewURL = "Not Available";
                } else {
                    previewURL = songList[i].preview_url;
                }
                stringOutput += `Preview: ${previewURL}\n`;
                stringOutput += `Album: ${songList[i].album.name}\n`;
                stringOutput += "===================================================\n";

                console.log(stringOutput);
                stringOutput = "";
            }
        }
    },
};

// Band Object

// Movie Object

// Function to integrate the chatbot with interactive Q&A
function chatBot() {
    const questionType = [
        {
            choices: ["concert-this", "spotify-this-song", "movie-this", "exit"],
            message: "What do you want to try?",
            name: "question",
            type: "list",
        }];

    inquirer.prompt(questionType).then((res: inquirer.Answers) => {
        switch (res.question) {
            case "concert-this":
                break;
            case "spotify-this-song":
                myMusic.search("The Day The World Went Away");
                break;
            case "movie-this":
                break;
            case "exit":
                process.exit();
                break;
        }

        chatBot();
    });
}

chatBot();
