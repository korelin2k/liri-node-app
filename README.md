# liri-node-app

### Three ways to leverage the application:
1. Command Line
2. File (random.txt)
3. Chatbot!

### From command line or file, the possible options are:
1. concert-this
2. spotify-this-song
3. movie-this
4. do-what-it-says (only available on command line)
5. chat-bot (only available on command line)

### How to leverage the application:
  * Create a .env file that contains the SPOTIFY_ID and SPOTIFY_SECRET properties, this is needed for the music search functionality. If you do not have it, the application will fail to launch.
  * npm start (arguments here)

### Examples:
1. chat-bot

> LIBP45P-30877WL:liri-node-app n0159480$ npm start chat-bot
>
> liri-node-app@1.0.0 start /Users/n0159480/bootcamp/assignments/liri-node-app
> npm install -y && npm run test && npm run build && node compiled/liri.js "chat-bot"
>
> audited 225 packages in 1.308s
> found 0 vulnerabilities
>
>
> liri-node-app@1.0.0 test /Users/n0159480/bootcamp/assignments/liri-node-app
> tslint -c test/tslint.json "src/*.ts"
>
>
> liri-node-app@1.0.0 prebuild /Users/n0159480/bootcamp/assignments/liri-node-app
> rm -rf ../compiled
>
>
> liri-node-app@1.0.0 build /Users/n0159480/bootcamp/assignments/liri-node-app
> tsc -p ./src
>
> ? What do you want to try? (Use arrow keys)  
> ❯ concert-this  
>  spotify-this-song  
>  movie-this  
>  do-what-it-says  
>  exit  


2. spotify-this-song

> ? What do you want to try? spotify-this-song  
> ? What do you want to search for? Shake It Off  
>   
> Artist(s): Taylor Swift  
> Song: Shake It Off  
> Preview: null  
> Album: 1989  

3. movie-this

> ? What do you want to try? movie-this  
> ? What do you want to search for? Star Wars The Last Jedi  
>  
> Title: Star Wars: The Last Jedi  
> Year: 2017  
> IMDB Rating: 7.2/10  
> RT Rating: 91%  
> Country: USA  
> Language: English  
> Plot: Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.  
>Actors: Mark Hamill, Carrie Fisher, Adam Driver, Daisy Ridley  

4. concert-this

> ? What do you want to try? concert-this  
> ? What do you want to search for? Nine Inch Nails  
>   
> Venue Name: The Pavillion at Toyota Music Factory  
> Venue Location: Irving, United States  
> Venue Date: 11/27/2018  

5. do-what-it-says

> ? What do you want to try? do-what-it-says  
>  
> Title: Star Wars: Episode IV - A New Hope  
> Year: 1977  
> IMDB Rating: 8.6/10  
> RT Rating: 93%  
> Country: USA  
> Language: English  
> Plot: Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the evil Darth Vader.  
> Actors: Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing  
> 
> Artist(s): Backstreet Boys   
> Song: I Want It That Way  
> Preview: https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3390c3ceaa77fad02f6b5f6?cid=fd6acb2455584bd2a02625167490efab  
> Album: The Hits--Chapter One  
>   
> ...  
> ...  
> ...  
>   
> Artist(s): MaxLife   
> Song: I Want It That Way  
> Preview: https://p.scdn.co/mp3-preview/a6c2734a24cf016a7f884c3f731e64371ba32555?cid=fd6acb2455584bd2a02625167490efab  
> Album: I Want It That Way  

### Things I tried:
  * TypeScript - it was mentioned in class last week, so figured I'd give it a shot... love it, although it did take me a while longer on several parts. Primarily due to the fact that not all npm packages actually support @types, such as spotify. Even looked at alternative spotify API packages with no luck (considered writing my own spotify integration, but it would have needed token generation too). For the spotify API, I had to disable the class check for "strict" checks due to this.
  * Scripts with package.json. Ended up doing some vanilla "testing" packages, such as tslint - was a nice way to validate I was conforming to the TypeScript standards.
  * npm start calls several parts: "npm install -y && npm run test && npm run build && node compiled/liri.js"; super quick and easy to run all the steps in this fashion.