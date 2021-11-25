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

The server and client side react application should be up and running by now. You should be able to see the application on localhost (http://localhost:3001/). However it will not work because our mongo database is empty at this point. So you could either use postman and make two POST HTTP requests or directly inside the main root project (map-project) run the following command below which will import the dump db into your remote mongo docker container.

```
mongorestore --uri 'mongodb://mongo:27017/popeyedb' --archive=popeyedb --gzip
```

Alternatively if you are facing issues with your mongodb connection you could make the two simple POST requests below:

http://localhost:3006/api/popeye/  POST CRUD operation. `Please keep the exact order for the purpose of this task`.

![map-project-route](/screenshots/postman.png?raw=true "images")

```
1)
{
    "name": "Main-route",
    "route": {
        "type": "Feature",
        "properties": {
            "color": "#33C9EB"
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [14.340945482254028, 35.96093506939264],
                [14.342586994171143, 35.96095243760745],
                [14.344421625137327, 35.961343221430845],
                [14.346792697906494, 35.96189031553499],
                [14.349625110626219, 35.962498193427706],
                [14.351985454559324, 35.963001860136956],
                [14.35338020324707, 35.96338394998041],
                [14.354968070983885, 35.963870243470936],
                [14.354259967803955, 35.96604116002663],
                [14.354710578918455, 35.965832754627144],
                [14.355053901672362, 35.96376603797507],
                [14.354538917541502, 35.96338394998041],
                [14.352436065673828, 35.96289765349514],
                [14.351320266723633, 35.96149085037202],
                [14.350783824920656, 35.96051823109128],
                [14.350998401641844, 35.95857295659467],
                [14.35114860534668, 35.95700975486853],
                [14.35164213180542, 35.95732239768882],
                [14.35164213180542, 35.95763503927157],
                [14.35183525085449, 35.9578434663059],
                [14.352071285247801, 35.95763503927157],
                [14.352006912231444, 35.95699238578669],
                [14.35312271118164, 35.95600234180726],
                [14.353852272033691, 35.9553596750382],
                [14.354796409606932, 35.95504702444914],
                [14.356126785278322, 35.95513387195911],
                [14.35713529586792, 35.95549863045834],
                [14.357929229736326, 35.95572443249474],
                [14.360246658325195, 35.954664894270834],
                [14.362564086914062, 35.9536227116616],
                [14.364495277404783, 35.95310161520082],
                [14.366297721862791, 35.95247629491057],
                [14.370417594909666, 35.95327531440302],
                [14.372220039367674, 35.95414380468494],
                [14.372220039367674, 35.95442171955852],
                [14.373979568481445, 35.95372693054125],
                [14.376296997070312, 35.95435224093178],
                [14.378228187561033, 35.95476911177551],
                [14.380116462707518, 35.95463015507205],
                [14.380116462707518, 35.95414380468494],
                [14.378399848937987, 35.95376167013726],
                [14.378442764282227, 35.953240574593146],
                [14.380331039428711, 35.95320583476798],
                [14.382691383361816, 35.95331005419763],
                [14.385738372802734, 35.95337953374102],
                [14.386940002441404, 35.95285843567613],
                [14.386510848999023, 35.95115615804285],
                [14.385609626770018, 35.94962755095217],
                [14.383249282836912, 35.947473554397945],
                [14.38307762145996, 35.946361791265204],
                [14.383978843688963, 35.94573641762877],
                [14.38505172729492, 35.944972065351664],
                [14.384322166442873, 35.94413821807163],
                [14.384880065917967, 35.94399924266952],
                [14.387025833129881, 35.94493732189066],
                [14.388699531555176, 35.94493732189066],
                [14.39080238342285, 35.943200129364214],
                [14.39183235168457, 35.944103474244],
                [14.392647743225098, 35.9453889856921],
                [14.395222663879395, 35.94632704841528],
                [14.398441314697264, 35.94688293218141],
                [14.401144981384277, 35.94698715995218],
                [14.406337738037108, 35.94559744503743],
                [14.409384727478026, 35.94445091183275],
                [14.410972595214844, 35.944103474244],
                [14.41161632537842, 35.94431193698057],
                [14.412646293640137, 35.9451110390429],
                [14.415435791015625, 35.944589886440546],
                [14.419598579406738, 35.943443338616916],
                [14.421057701110838, 35.94302640801116],
                [14.423031806945799, 35.94431193698057],
                [14.424662590026854, 35.94709138758547],
                [14.426164627075194, 35.948620043744704],
                [14.428181648254395, 35.94872426922402],
                [14.4310998916626, 35.951295120857246],
                [14.43328857421875, 35.95390062836848],
                [14.434533119201658, 35.95383114928342],
                [14.437108039855959, 35.95237207438095],
                [14.438996315002443, 35.95247629491057],
                [14.441528320312498, 35.951225639480604],
                [14.443931579589846, 35.9507392681331],
                [14.445562362670897, 35.94893271977019],
                [14.445734024047853, 35.947682008243845],
                [14.448180198669432, 35.94632704841528],
                [14.449210166931152, 35.94392975487681],
                [14.45002555847168, 35.94302640801116],
                [14.452943801879881, 35.94316538512415],
                [14.454274177551268, 35.94198407187319],
                [14.455218315124512, 35.9394824090512],
                [14.458909034729004, 35.936494208013784],
                [14.461956024169922, 35.934444097779405],
                [14.465088844299316, 35.93281092107036],
                [14.467062950134277, 35.93194219630849],
                [14.469208717346191, 35.930030968230454],
                [14.47169780731201, 35.92721616639055],
                [14.47268486022949, 35.925652344291976],
                [14.47298526763916, 35.923984233298555],
                [14.47397232055664, 35.92308065848517],
                [14.475560188293455, 35.92356720005217],
                [14.477362632751463, 35.92339343555044],
                [14.480409622192381, 35.92325442367415],
                [14.485001564025877, 35.92381046971315],
                [14.486675262451174, 35.922246580263426],
                [14.488863945007324, 35.92235084052222],
                [14.490280151367186, 35.92200330579175],
                [14.490580558776855, 35.92026560923165],
                [14.489850997924805, 35.9190144440679],
                [14.490752220153809, 35.91911870858751],
                [14.492340087890623, 35.918215078185],
                [14.49341297149658, 35.91713765921297],
                [14.493927955627441, 35.916546810320284],
                [14.49315547943115, 35.91539985575366],
                [14.493885040283201, 35.91425288455719],
                [14.494571685791017, 35.91446142601165],
                [14.494957923889158, 35.915087047076575],
                [14.495515823364258, 35.91505229048055]
            ]
        }
    }
}
2)
{
    "name": "lunch",
    "route": {
        "type": "Feature",
        "properties": {
            "color": "#33C9EB"
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [14.495279788970945, 35.915087047076575],
                [14.495869874954222, 35.91489588560945],
                [14.496642351150513, 35.91466127772297],
                [14.49722170829773, 35.91465258852865],
                [14.497629404067993, 35.91484375058367],
                [14.497983455657959, 35.915269518955206],
                [14.498187303543093, 35.91573873042466],
                [14.4984233379364, 35.91639040840409],
                [14.498616456985474, 35.91695519164361],
                [14.498745203018187, 35.917407015331804],
                [14.499077796936033, 35.91688568007788],
                [14.499270915985107, 35.91652943234488],
                [14.499496221542357, 35.916094981718636],
                [14.499796628952026, 35.915695285035135],
                [14.500075578689577, 35.915234762439354],
                [14.50020432472229, 35.91501753386925],
                [14.498519897460938, 35.91447011522699],
                [14.49815511703491, 35.91514787108289],
                [14.498026371002197, 35.91515656022283],
                [14.497779607772827, 35.914861128929424],
                [14.49722170829773, 35.9145743857366],
                [14.496395587921143, 35.9146352101371],
                [14.495505094528198, 35.914939331437985],
                [14.495204687118528, 35.91504360132915]
            ]
        }
    }
}

```
## CRUD operations are also developed for the purpose of this project
```
1) getPaths GET http://localhost:3006/api/popeye/
2) addPath POST http://localhost:3006/api/popeye/

3) getPath GET by id (e.g http://localhost:3006/api/popeye/619ea76363566774a8f1d1ca)
4) updatePath PUT by id (e.g http://localhost:3006/api/popeye/619ea76363566774a8f1d1ca)
5) updatePath DELETE by id (e.g http://localhost:3006/api/popeye/619ea76363566774a8f1d1ca)

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