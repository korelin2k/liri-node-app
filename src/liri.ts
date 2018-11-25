import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as inquirer from "inquirer";
import * as moment from "moment";
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

                writeOutput(stringOutput);
                console.log(stringOutput);
                stringOutput = "";
            }
        }
    },
};

// Band Object
const myBand = {
    search(bandName: string) {
        const bandEndpoint: string = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=codingbootcamp`;
        axios.get(bandEndpoint)
            .then((response) => {
                this.formatBand(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    formatBand(bandDetails: any) {
        let i: any;
        let stringOutput: string = "";

        for (i in bandDetails) {
            if (bandDetails[i]) {
                const venueName = bandDetails[i].venue.name;
                const venueLoc = bandDetails[i].venue.city + ", " + bandDetails[i].venue.country;
                const venueDate = moment.utc(bandDetails[i].datetime).format("MM/DD/YYYY");

                stringOutput += "\n===================================================\n";
                stringOutput += `Venue Name: ${venueName}\n`;
                stringOutput += `Venue Location: ${venueLoc}\n`;
                stringOutput += `Venue Date: ${venueDate}\n`;
                stringOutput += "\n===================================================\n";

                writeOutput(stringOutput);
                console.log(stringOutput);
                stringOutput = "";
            }
        }
    },
};

// Movie Object
const myMovie = {
    search(movieName: string) {
        const apiKey: string = "trilogy";
        const movieEndpoint: string = `http://www.omdbapi.com/?apikey=${apiKey}&&t=${movieName}`;
        axios.get(movieEndpoint)
            .then((response) => {
                this.formatMovie(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    formatMovie(movieDetails: any) {
        let stringOutput: string = "";

        const movieTitle: string = movieDetails.Title;
        const movieYear: string = movieDetails.Year;
        const movieCountry: string = movieDetails.Country;
        const movieLang: string = movieDetails.Language;
        const moviePlot: string = movieDetails.Plot;
        const movieActors: string = movieDetails.Actors;
        let movieIMDBRating: string = "Not Available";
        let movieRTRating: string = "Not Available";

        // have to break up the ratings response... this API sucks
        movieDetails.Ratings.forEach((element: any) => {
            if (element.Source === "Internet Movie Database" || element.Source === "IMDB") {
                movieIMDBRating = element.Value;
            } else if (element.Source === "Rotten Tomatoes" || element.Source === "RT") {
                movieRTRating = element.Value;
            }
        });

        stringOutput += "\n===================================================\n";
        stringOutput += `Title: ${movieTitle}\n`;
        stringOutput += `Year: ${movieYear}\n`;
        stringOutput += `IMDB Rating: ${movieIMDBRating}\n`;
        stringOutput += `RT Rating: ${movieRTRating}\n`;
        stringOutput += `Country: ${movieCountry}\n`;
        stringOutput += `Language: ${movieLang}\n`;
        stringOutput += `Plot: ${moviePlot}\n`;
        stringOutput += `Actors: ${movieActors}\n`;
        stringOutput += "\n===================================================\n";

        writeOutput(stringOutput);
        console.log(stringOutput);
    },
};

// Function to write all output to log.txt
function writeOutput(output: string) {
    const fileName: string = "log.txt";
    fs.appendFile(fileName, output, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

// Function to parse the random.txt file and call parseQuestion
function parseFile() {
    let i: any;
    const fileName: string = "random.txt";
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            return console.error(err);
        }

        const fileOutput: string[] = data.toString().split("\n");
        for (i in fileOutput) {
            if (fileOutput[i]) {
                const lineOutput: string[] = fileOutput[i].split(",");
                parseQuestion(lineOutput[0], lineOutput[1]);
            }
        }
    });
}

// Function to parse the question and search string and to send it to the appropriate lookup
function parseQuestion(question: string, title: string) {
    switch (question) {
        case "concert-this":
            if (!title) {
                title = "Nine Inch Nails";
            }

            myBand.search(title);
            break;
        case "spotify-this-song":
            if (!title) {
                title = "Ace of Base";
            }

            myMusic.search(title);
            break;
        case "movie-this":
            if (!title) {
                title = "Mr. Nobody";
            }

            myMovie.search(title);
            break;
        case "do-what-it-says":
            parseFile();
            break;
        case "exit":
            console.log("Thank you for playing!");
            process.exit();
            break;
        default:
            console.log("Invalid input - exiting program");
            process.exit();
    }
}

// Function to integrate the chatbot with interactive Q&A
function chatBot() {
    const questionType: inquirer.Questions = [
        {
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says", "exit"],
            message: "What do you want to try?",
            name: "question",
            type: "list",
        },
        {
            when(res: inquirer.Answers) {
                return (res.question !== "exit" && res.question !== "do-what-it-says");
            },
            message: "What do you want to search for?",
            name: "search",
            type: "input",
        },
    ];

    inquirer.prompt(questionType).then((res: inquirer.Answers) => {
        parseQuestion(res.question, res.search);

        // Giving it time to return the API call, hence the timeout
        setTimeout(chatBot, 3000);
    });
}

// Pull in the variables
if (process.argv[2] === "chat-bot") {
    chatBot();
} else if (!process.argv[2]) {
    console.log("Invalid input! Try out \"chat-bot\" for an interactive bot today!");
} else {
    const question: string = process.argv[2];
    const title: string = process.argv.splice(3, process.argv.length - 1).join(" ");

    parseQuestion(question, title);
}
