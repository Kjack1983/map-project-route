// @desc Get all routes
// @route GET /api/paths
// @access public
import PopeyeRoutes from '../models/popeye';
import "babel-polyfill";
import { io } from '../bin/www';
import moment from 'moment';

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
 * Fecth all entities.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const getPaths = async (req, res, next) => {
    try {
        let popeyes = await PopeyeRoutes.find({});
       
        if (popeyes) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');

            io.once('connection', (socket) => {
                // process routes.
            	processRoutes(popeyes, socket);

				socket.on('removeTimer', data => {
                    clearInterval(interval);
                    clearTimeout(timeOut);
                });

                socket.on('setTimer', data => {
                    if(data) {
                        setRouteInterval(socket, popeyes);
                    }
                });

                socket.on('milliseconds', milliseconds => {
                    console.log(`Changed the milliseconds for the delay ${milliseconds}`);
                    delay = milliseconds;

                    // Clear interval and reset it.
                    clearInterval(interval);
                    clearTimeout(timeOut);
                    setRouteInterval(socket, popeyes);
                });


                socket.on('disconnect', () => {
                    clearInterval(interval);
                    clearTimeout(timeOut);
                });
            });
            res.status(200).json(popeyes);
            next();
        } else {
            throw new Error('ERROR: no entities found');
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

        if (popeyeRoute) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(popeyeRoute);
            next();
        } else {
            throw new Error('ERROR: no entities found');
        }
    } catch(error) {
        next(error);
    }
}

/**
 * Add popeye entity
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
export const addPopeye = async (req, res, next) => {
    let { body } = req;

    try {
        let popeye = await PopeyeRoutes.create(body);
        if (popeye) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(popeye);
            next();
        } else {
            throw new Error('Entity was not stored');
        }
    } catch (error) {
        next(error);
    }
}

export const deletePopeye = async (req, res, next) => {
    let { id } = req.params;

    try {
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
 * Update entity.
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
export const updatePopeye = async (req, res, next) => {
    let { id } = req.params;

    try {
        // Find By id and remove.
        await PopeyeRoutes.findByIdAndUpdate({_id: id}, req.body);
        let popeye = await PopeyeRoutes.findOne({_id: id});
        
        if (popeye) {
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