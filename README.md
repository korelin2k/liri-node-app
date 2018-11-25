# liri-node-app

###Three ways to leverage the application:
1. Command Line
2. File (random.txt)
3. Chatbot!

###From command line or file, the possible options are:
1. concert-this
2. spotify-this-song
3. movie-this
4. do-what-it-says (only available on command line)
5. chat-bot (only available on command line)

###How to leverage the application:
  * npm start (arguments here)

###Things I tried:
  * TypeScript - it was mentioned in class last week, so figured I'd give it a shot... love it, although it did take me a while longer on several parts. Primarily due to the fact that not all npm packages actually support @types, such as spotify. Even looked at alternative spotify API packages with no luck (considered writing my own spotify integration, but it would have needed token generation too). For the spotify API, I had to disable the class check for "strict" checks due to this.
  * Scripts with package.json. Ended up doing some vanilla "testing" packages, such as tslint - was a nice way to validate I was conforming to the TypeScript standards.
  * npm start calls several parts: "npm install -y && npm run test && npm run build && node compiled/liri.js"; super quick and easy to run all the steps in this fashion.