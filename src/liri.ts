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
                const albumName: string = songList[i].album.name;
                const previewURL: string = songList[i].preview_url;
                const artistList = songList[i].artists;

                stringOutput += "\n===================================================\n";
                let artistOutput: string = "";
                for (i in artistList) {
                    if (artistList[i]) {
                        artistOutput += `${artistList[i].name} `;
                    }
                }
                stringOutput += `Artist(s): ${artistOutput}\n`;
                stringOutput += `Song: ${songList[i].name}\n`;
                stringOutput += `Preview: ${previewURL}\n`;
                stringOutput += `Album: ${albumName}\n`;
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
    const questionType: inquirer.Questions = [
        {
            choices: ["concert-this", "spotify-this-song", "movie-this", "exit"],
            message: "What do you want to try?",
            name: "question",
            type: "list",
        },
        {
            when(res: inquirer.Answers) {
                return res.question !== "exit";
            },
            message: "What do you want to search for?",
            name: "search",
            type: "input",
        },
    ];

    inquirer.prompt(questionType).then((res: inquirer.Answers) => {
        switch (res.question) {
            case "concert-this":
                break;
            case "spotify-this-song":
                let songTitle: string = "Ace of Base";
                if (res.search) {
                    songTitle = res.search;
                }

                myMusic.search(songTitle);
                break;
            case "movie-this":
                break;
            case "exit":
                process.exit();
                break;
        }

        // Giving it time to return the API call, hence the timeout
        setTimeout(chatBot, 3000);
    });
}

chatBot();
