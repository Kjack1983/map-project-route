import { useState, useCallback } from 'react';
import useDebounceEffect from '../hooks/useDebounceEffect';

// Simulate markers with routes.
const timerHordOne = [1, 2, 3];
const timerHordFive = [5, 10, 15];
const timerHordTen = [10, 20, 30];

/**
 * Set socket listener remove and reset timers.
 * 
 * @param {object} socket 
 * @param {number} initialValue 
 * @param {string} tripTime
 * @param {distanceTime} 
 * @return {array {<
 *   removeTimer: function, 
 *   setTimer: function, 
 *   milliseconds:integer, 
 *   function() => {}
 * >}
 */
export const useSocketListenerEvents = (socket, initialValue, tripTime, coordinates, distanceTime) => {
	const [milliseconds, setMilliseconds] = useState(initialValue);
	const [myTripTime, setMyTripTime] = useState(tripTime);
	const [myDistanceTime, setMyDistanceTime] = useState(distanceTime);
	const [isResetClicked, setIsResetClicked] = useState(false);
	const [isChanged, setChanged] = useState(false);
	const [displaySecondsDropdown, setDisplaySecondsDropdown] = useState(true);
	const [imageUrl, setImageUrl] = useState('/carmap2.png');

	const [mapData, setMapData] = useState({
		type: 'FeatureCollection',
		features: []
	})

	/**
	 * @Remove socket timers from server.
	 * reset settings
	 */
	const removeTimer = useCallback(() => {
		setMilliseconds(3000);
		setMyDistanceTime(0)
		setMyTripTime('00:00:00');
		setIsResetClicked(false)
		setChanged(false);
		socket.emit('removeTimer', true);
		setDisplaySecondsDropdown(true);
		// Initialize our points.
	}, [socket]);

	/**
	 * set timers and settings.
	 */
	const setTimer = useCallback(() => {
		setMyDistanceTime(distanceTime);
		setMyTripTime(tripTime);
		setIsResetClicked(true)
		setChanged(true);
		setDisplaySecondsDropdown(false);
		socket.emit('setTimer', true);
	}, [socket, distanceTime, tripTime]);

	/**
	 * Rebuilds points based on routes.
	 * 
	 * @param {array} points 
	 * @param {string} path
	 * @return {array} points
	 */
	const rebuildPointBasedOnRoute = (points = [], path = '') => {
		return points.filter(({
			properties: {
				route
			} 
		}) => route === path)
	}

	/**
	 * Display images according to base route (Village, Lunch)
	 *
	 * @param { array } timeHord 
	 * @param { number } distanceTimeNum 
	 * @param { array } points 
	 * @return { void }
	 */
	const displayPointBasedOnRoute = (distanceTimeNum, points) => {
		switch(milliseconds) {
			case 3000:
				setMapDataOnMilliSwitch(timerHordOne, distanceTimeNum, points);
			break
			case 15000:
				setMapDataOnMilliSwitch(timerHordFive, distanceTimeNum, points);
			break;
			case 30000:
				setMapDataOnMilliSwitch(timerHordTen, distanceTimeNum, points);
			break;
			default:
				console.log('No milliseconds');
			break;
		}
	}

	/**
	 * Set map point on change event milliseconds. 
	 * @param {array} timeHord 
	 * @param {number} distanceTimeNum 
	 * @param {array} points 
	 */
	const setMapDataOnMilliSwitch = (timeHord = [], distanceTimeNum = 0, points = []) => {
		if(distanceTimeNum === timeHord[0] || distanceTimeNum === timeHord[2]) {
			setMapData({
				...mapData,
				features: rebuildPointBasedOnRoute(points, 'village')
			});
			setImageUrl('/carmap2.png');
		} else {
			setMapData({
				...mapData,
				features: rebuildPointBasedOnRoute(points, 'lunch')
			});
			setImageUrl('/human.png');
		}
	}

	useDebounceEffect(() => {
		if(isResetClicked) {
			setMyTripTime(tripTime);
			setMyDistanceTime(distanceTime)
		}

		if(isResetClicked && isChanged) {
			const points = coordinates.reduce((acc, curr, index) => {
				const value = index <= 1 ? 'village' : 'lunch';
				return [...acc, {
					type: 'Feature',
					properties: {
						route: value
					},
					geometry: {
						type: 'Point',
						coordinates: curr
					}
				}];
			}, []);

			setImageUrl('/carmap2.png');
			displayPointBasedOnRoute(Number(distanceTime), points);

		} else {
			setMapData({
				type: 'FeatureCollection',
				features: []
			})
		}
	},[
		socket, tripTime, 
		distanceTime, isResetClicked, 
		isChanged, coordinates], 70
	)

	return [
		removeTimer, setTimer, 
		milliseconds, myTripTime, 
		mapData, myDistanceTime, 
		displaySecondsDropdown, imageUrl, (event) => {
			let { target: { value } } = event;
			setMilliseconds(value);
			setChanged(false);

			// Emitting the new interval delay to the server.
			socket.emit('milliseconds', value);
		}
	];
}
