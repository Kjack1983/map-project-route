// @desc Get all routes
// @route GET /api/paths
// @access public
import PopeyeRoutes from '../models/popeye';
import routeData from '../config/routedata';
import path from 'path';
import "babel-polyfill";
import { io } from '../bin/www';
import fs from 'fs';
import moment from 'moment';

let ObjectID = require('mongodb').ObjectID;
let objectId = new ObjectID();
let pathToFile = __dirname.replace('/dist-server/controllers', '/server/config/routedata.js');
let updatedRouteData = routeData;

let interval;
let delay = 3000;
let timeOut;
let coordinateRoutes = [];
let currentTime;
let tripTime;
let additionTime;

/**
 * Set timer for Routes algorithm third of
 * delay interval for each route.
 *
 * @param {object} socket 
 * @param {object} routes
 * @return {void}
 */
const getApiRouteAndEmit = (socket = {}, routes = {}) => { 
    coordinateRoutes.forEach((items, index) => {
       timeOut = setTimeout(() => {
            currentTime = moment(new Date()).valueOf();
            index === 2 
                ? socket.emit('geo', routes[index - 2])
                : socket.emit('geo', routes[index]);


            // Send remainder from tripTimer % current todo. last route to village. 
            if(index === 2) {
                tripTime = moment(new Date()).valueOf();
                let duration = moment(tripTime).diff(moment(currentTime));
                let timediff = moment.utc(duration * 1000).format('HH:mm:ss');
                additionTime = moment().add(timediff, 'seconds').format('HH:mm:ss');

                // this will add the seconds as long as the timer is set.
                socket.emit('tripTime', additionTime);
            }
            socket.emit('distanceTime', (((index + 1) * (delay / 3)) / 1000).toFixed(1));
        }, (index + 1) * (delay / 3));
    })
    
}

/**
 * Set interval for instant real time data through socket
 * 
 * @param {object} socket
 * @param {object} popeyes
 * @return {void}
 */
const setRouteInterval = (socket = {}, popeyes = []) => {
    interval = setInterval(() => {
        getApiRouteAndEmit(socket, popeyes);
    }, delay);
}

/**
 * Process paths to create timer algorithm based.
 * 
 * @param {object} routes 
 * @param {object} socket
 * @return {void}
 */
const processRoutes = (routes = [], socket = {}) => {
    coordinateRoutes = routes.reduce((acc, curr, index) => {
        let { coordinates } = curr.route.geometry;
        acc.push(coordinates[0], coordinates[coordinates.length - 1])
        return acc;
    }, []);

	// emit for markers.
	socket.emit('coordinates', coordinateRoutes); 
    coordinateRoutes = coordinateRoutes.slice(1);
}

/**
 * Stream data to the client.
 * 
 * @param {array} routes
 * @return {void}
 */
 const streamData = (routes = []) => {
    io.once('connection', (socket) => {
        // process routes.
        processRoutes(routes, socket);

        socket.on('removeTimer', data => {
            clearInterval(interval);
            clearTimeout(timeOut);
        });

        socket.on('setTimer', data => {
            clearInterval(interval);
            clearTimeout(timeOut);
            if(data) {
                setRouteInterval(socket, routes);
            }
        });

        socket.on('milliseconds', milliseconds => {
            console.log(`Changed the milliseconds for the delay ${milliseconds}`);
            delay = milliseconds;

            // Clear interval and reset it.
            clearInterval(interval);
            clearTimeout(timeOut);
            setRouteInterval(socket, routes);
        });


        socket.on('disconnect', () => {
            clearInterval(interval);
            clearTimeout(timeOut);
        });
    });
}

/**
 * Fecth all entities.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const getPaths = async (req, res, next) => {
    try {
        let popeyes = await PopeyeRoutes.find({});
       
        if (Array.isArray(popeyes) && popeyes.length) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            streamData(popeyes);
            res.status(200).json(popeyes);
            next();
        } else if(updatedRouteData.length) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            streamData(updatedRouteData);
            res.status(200).json(updatedRouteData);
            next();
        } else {
            throw new Error('No routes were found');
        }
    } catch(error) {
        next(error);
    }
}

/**
 * Fetch entity route by id.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
 export const getPath = async (req, res, next) => {
    let { id } = req.params;

    try {
        let popeyeRoute = await PopeyeRoutes.findById({_id: id});
        const route = updatedRouteData.find(data => data._id === id);

        if (Object.keys(popeyeRoute).length) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(popeyeRoute);
            next();
        } else if (Object.keys(route).length) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(route);
            next();
        } else {
            throw new Error('No route was found');
        }
    } catch(error) {
        next(error);
    }
}

/**
 * Add popeye entity
 * eg:
 * {
 *     "route": {
 *       "geometry": {
 *         "type": "LineString",
 *         "coordinates": [
 *           [
 *             14.495279788970945,
 *             35.915087047076575
 *           ]
 *         ]
 *       },
 *       "type": "Feature",
 *       "properties": {
 *         "color": "#33C9EB"
 *       }
 *     },
 *     "_id": "61a65867d324d055d49d5611",
 *     "name": "new",
 *     "__v": 0
 *   }
 *
 *
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
export const addPopeye = async (req, res, next) => {
    let { body } = req;
    try {

        let popeye = await PopeyeRoutes.create(body);
        
        if(updatedRouteData.find(route => route._id === popeye._id)){
            console.warn('FOUND no need to write into file')
        } else {
            let updatedBody = {...body, _id: popeye._id};
            updatedRouteData = [...updatedRouteData, updatedBody];
            const fileObj = 'export default ' + JSON.stringify(updatedRouteData);
            fs.chmod(pathToFile, 0o644, (error) => {
                fs.writeFile(pathToFile, fileObj, (err, routeFile) => {
                    if(err) return console.err(err)
                    console.log(routeFile);
                    console.log('Changed file permissions');
                });
            });
        }

        if (Object.keys(popeye).length) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(popeye);
            next();
        } else {
            throw new Error('Post not successfull');
        }
    } catch (error) {
        next(error);
    }
}

export const deletePopeye = async (req, res, next) => {
    let { id } = req.params;

    try {
        updatedRouteData = updatedRouteData.filter(route => route._id !== id);
        const fileObj = 'export default ' + JSON.stringify(updatedRouteData);

        fs.chmod(pathToFile, 0o644, (error) => {
            if(error) return console.warn(error);
            fs.writeFile(pathToFile, fileObj, (err, routeFile) => {
                if(err) return console.err(err)
                console.log('File was successfully stored');
            });

            console.log('Changed file permissions');
        });
        
        // Find By id and remove.
        let popeye = await PopeyeRoutes.findByIdAndRemove({_id: id});

        if (popeye) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                success: true, 
                message: `Route was successufully deleted popeye ${id}`
            });
            next();
        } else {
            throw new Error('Not found');
        }
    } catch (err) {
        next(err);
    }
}

/**
 * Update Route.
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
export const updatePopeye = async (req, res, next) => {
    let { params: { id }, body } = req;

    try {

        // Find By id and remove.
        await PopeyeRoutes.findByIdAndUpdate({_id: id}, body);

        let popeye = await PopeyeRoutes.findOne({_id: id});

        if (popeye) {

            // find the route to be updated.
            let foundRoute = updatedRouteData.find(route => route._id === id);

            // Add id to the body.
            body = { ...body, _id: popeye._id }

            let bodyGeometry = typeof body.route.geometry !== 'undefined' && 
                            Object.keys(body.route.geometry).length ?
                            body.route.geometry : 
                            foundRoute.route.geometry;

            let bodyType = typeof body.route.type !== 'undefined' &&
                            typeof body.route.type !== '' ?
                            body.route.type :
                            foundRoute.route.type

            let bodyProperties = typeof body.route.properties !== 'undefined' &&
                            Object.keys(body.route.properties).length ?
                            body.route.properties :
                            foundRoute.route.properties;

            let bodyName = typeof body.name !== 'undefined' &&
                            typeof body.name !== '' ?
                            body.name :
                            foundRoute.name

            // Replace old values with new for the found route.
            foundRoute = {
                ...foundRoute,
                route: {
                    geometry: bodyGeometry,
                    type: bodyType,
                    properties: bodyProperties
                },
                name: bodyName,
                __v: 0,
                _id: body._id,
            };

            // remove the old route
            updatedRouteData = updatedRouteData.filter(route => route._id !== id);

            // merge the foundRoute.
            updatedRouteData = [...updatedRouteData, foundRoute];

            // Update properties.
            const fileObj = 'export default ' + JSON.stringify(updatedRouteData);
            fs.chmod(pathToFile, 0o644, (error) => {
                if(error) return console.warn(error);
                fs.writeFile(pathToFile, fileObj, (err, routeFile) => {
                    if(err) return console.err(err)
                    console.log('Changed file permissions');
                });
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(popeye);
            next();
        } else {
            throw new Error('Not found');
        }
    } catch (err) {
        next(err);
    }
}