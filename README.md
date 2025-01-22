# AP-assignment4

Part 4 of Netflix project


## Getting  started:
Link to GitHub repository:
https://github.com/matan211/AP-assignment4

Server(on cpp_server folder):
g++ -c src/ConsoleMenu.cpp -o ConsoleMenu.o
g++ -c src/DisplayRecommendedMoviesCommand.cpp -o DisplayRecommendedMoviesCommand.o
g++ -c src/AddMovieCommand.cpp -o AddMovieCommand.o
g++ -c src/HelpCommand.cpp -o HelpCommand.o
g++ -c src/DeleteCommand.cpp -o DeleteCommand.o
g++ -c src/Utils.cpp -o Utils.o
g++ ConsoleMenu.o DisplayRecommendedMoviesCommand.o AddMovieCommand.o HelpCommand.o DeleteCommand.o Utils.o -o output.exe -lws2_32
./output.exe

if data\commandsHistory.txt and data\movies.txt exists, make sure there are empty.
(important - this is the data for recommendation movies)

Run NodeJS:
1. On server folder: npm init -y
2. Install requirements: npm i express cors body-parser custom-env jsonwebtoken mongoose uuid axios
3. Add to package.json: "scripts": {
    "start": "SET NODE_ENV=local && node app.js"
  }
4. Create config on 'server' folder.
5. Create .env.local file in 'config' file.
6. Write in .env.local: CONNECTION_STRING="mongodb://localhost:27017/Netflix_database"
PORT=8080 
7. Run server on 'server' folder: npm start

Run the app(locally):
1. cd frontend
2. npm start

Run on Docker:
1. On root folder do the command:
  docker-compose up
2. open browser in http://localhost:3000/

How to add movie:
1. Login in as admin.
2. Click on 'Admin Page' button on the navigation bar.
3. Save video file in server\public\movies\ directory.
4. Add new movie in the Admin page - with file of the video saved in the server. 
For example,  for the video server\public\movies\video_360.mp4, we will write video_360.mp4.