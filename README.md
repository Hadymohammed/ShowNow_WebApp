###ShowNow WebApp
Search by your fav movie name and get details using theMovieDB API. Developed to continuation front-end course and using APIs journey as I've built a basic project WeatherMap webapp :  https://github.com/Hadymohammed/Weather-webapp 

##Technologies used
- JavaScript.
- node Js,Express.

##Developing process
- For the first time, I've used Postman platform which helps me a lot in building projects idea and visualizing the data I'll use.
- Build UI for the web design using Adobe photoshop to practice my designing skills.
- Start implementing the UI design and then its functionality.
- Testing and fixing API integration and responsiveness bugs.

##How works
- First display a place holders text and images.
- Pick a random movie to display.
- Search for a movie.
- After clicking on **show** button, an onclick event listener run which calls **getServerData** function passing the movie name to it.
- **getServerData** function sends a GET request to the server side carrying the movie name as a parameter.
- The server sends a request to the movie database API passing the movie name.
- Convert fetched data into JSON.
- Sends the data to the endpoint that the client side calls.
- On the client side, update the UI using new data. 

##Author
#Abdelhady Mohamed
