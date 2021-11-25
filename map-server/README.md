# Map server application

## Branches
* `master`

## Tech stack: #babel #nodejs #express #mocha #chai #dockers, socketIO

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