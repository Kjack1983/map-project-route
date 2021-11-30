# Popeye Routes - Mern stack application

## Branches
* `master`

## Tech stack: #babel #nodejs #express, #dockers #mocha, #chai #mongodb, #react, #react hooks, #socketIO

For dockerazing the application please run on the root folder (map-project) the following commands below to

## Sending build context to Docker daemon. Tag the application  
```
sudo docker build -t "api-server" ./map-server/
sudo docker build -t "react-app" ./map-client/
```

## Run the following commands below to build the containers
```
sudo docker-compose up
sudo docker ps (@see containers)
```

The server and client side react application should be up and running by now. You should be able to see the application on localhost (http://localhost:3001/). 

if you are facing issues with running the docker containers. Please change the .env file variable to the following below:

from:

```
DATABASE=mongodb://mongo:27017/popeyedb
```
to:

```
DATABASE=mongodb://localhost:27017/popeyedb
```

and run the application locally `npm start` or `npm run watch:dev` on the server side project (map-server) project and `npm start` for the cliend side project (map-client).

## CRUD operations are also developed for the purpose of this project

```

1) getPaths GET http://localhost:3006/api/popeye/
2) addPath POST http://localhost:3006/api/popeye/

3) getPath GET by id http://localhost:3006/api/popeye/:id
4) updatePath PUT by id http://localhost:3006/api/popeye/:id
5) updatePath DELETE by id http://localhost:3006/api/popeye/:id

```

# mocha chai assertetion (Integration CRUD unit tests)

Integration tests are also developed for the purpose of this project in order to check CRUD operations. If 
`npm run` test or `npm run coverage` will automatically check the routes and the expected properties from the server response. It will also create a new route with POST http request, then UPDATE and delete that entry.

# Consuming application
Click here to see the front end application [map-client](https://github.com/Kjack1983/map-project-route/tree/master/map-client)

## Functionality
The application consists of 5 sections and one down below where the map exists.

1) first section contains a dropdown where the user can switch theme maps

2) second section there is dropdown where the user can switch routes manually (on change event)

3) Third section contains a drop down with a list of seconds to provide the time cover of each route travel. Switching seconds on the list will also change the time interval for each route trip. `Therefore in order to test properly` at the beginning please press start timer and you will be able to see `the routes and the icons displayed for each route`. Please note that when the time changes from the dropdown the icons will disappear from the map. This is happening because the points are not coming from the backend (Mainly developed from the front end side) and it's seperating the logic from the icons (actual points that are implemented from the client side).

4) Timer section contains two buttons, One for setting a timer `set timer` and `remove timer`. The set timer will start the trip at a default case of `3000` milliseconds (whole trip) and this will be devided by a set of 3 timeoutes, 1 for each route please check `controller/paths.js`. In addition when the `set timer` is clicked the `Seconds drodown menu list` disappers. This is to avoid further implementation with the combination. Please note that when the `remove timer` is clicked then the trip will stop (meaning clearing the time interval and timeouts) via websockets SocketIO.

5) The last section provides the time cover distance. At the top is the `time distance for each route` and at the botton is the `trip time` which demonstrates the time of the entire trip (Village - Lunch - Village).


![map-project-route](/screenshots/screenshot1.png?raw=true "images")
![map-project-route](/screenshots/screenshot2.png?raw=true "images")
![map-project-route](/screenshots/screenshot3.png?raw=true "images")
![map-project-route](/screenshots/screenshot5.png?raw=true "images")
![map-project-route](/screenshots/screenshot6.png?raw=true "images")
![map-project-route](/screenshots/screenshot7.png?raw=true "images")

## Available Scripts

In the project directory, you can run the following commands:

```
"scripts": {
    "start": "npm run prod",
    "build": "npm-run-all clean transpile",
    "server": "node ./dist-server/bin/www",
    "dev": "NODE_ENV=development npm-run-all build server",
    "prod": "NODE_ENV=production npm-run-all build server",
    "transpile": "babel ./server --out-dir dist-server",
    "clean": "rimraf dist-server",
    "watch:dev": "nodemon",
    "test": "NODE_ENV=test npx mocha \"server/**/*.test.js\" --recursive --require @babel/register --file ./server/mocha-setup.js",
    "test:watch": "NODE_ENV=test npx mocha \"server/**/*.test.js\" --recursive --require @babel/register --file ./server/mocha-setup.js --watch"
    "coverage": "NODE_ENV=test nyc --reporter=lcov --reporter=text npm run test"
}
```

#### `npm install`

```
Install application. 
```

#### `npm start`

```
Runs the app in the development mode. Open http://localhost:3006 to view it in the browser.
Ports is always running at PORT 3006 to avoid conflicts with the front end consuming application [popeye-routes]. 

```

#### `npm run transpile`

```
place the transpiled contents in a different folder called dist-server in our project root.

```

#### `npm run clean`

```
remove transpiled contents /dist-server/ from the project root.

```

#### `npm run build`

```
combines two processes of transpiling and cleaning content.

```

#### `npm run dev`

```
While having the build script we can run our dev server with the following command above.

```

#### `npm run prod`

```
If we have a dev script that sets the Node Environment to development, we have a prod script that sets it to production.

```

#### `npm run watch:dev`

```
it saves your file whenever localhost:3006 catches any changes.

```

#### `npm run test`

```
npm run test to run unit test when performing calculations. 
```

### `npm run test:watch`

```
npm run test to run unit test when performing calculations. The following command will watch the changes of the js files

NODE_ENV=test npx mocha \"server/**/*.test.js\" --recursive --require @babel/register --file ./server/mocha-setup.js --watch

Therefore if the user applies any short of changes to the tests (e.g change a number) and save it, this will impact the test directly.
```

### `npm run coverage`

```
Using nyc library to create test coverage reports. Run the following command above and check the coverage folder for index.html (right click copy path) and paste to the browser to check the coverage percentage of the file. Check the screenshot below.

```

Coverage report ![popeye-routes](/screenshots/screenshot-coverage.png?raw=true "images")