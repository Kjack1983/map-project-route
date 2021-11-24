import React, { useState, useEffect, useMemo, useCallback} from 'react';
import { useGetPaths} from '../hooks/useGetPaths';
import MapContainer from './MapContainer';
import io from 'socket.io-client';

const socketServer = process.env.REACT_APP_SOCKET_SERVER;
const ENDPOINT = `${socketServer}:3006`
const MAPBOX_TOKEN = "pk.eyJ1Ijoia2phY2siLCJhIjoiY2p6cjZnNndxMHBqODNucG01Mnl4YjdxMyJ9.G-F7NI9jWRokI7J_JGRF_w";

export const App = () => {
	const [socketConn, setSocketConn] = useState({});
	const [distanceTime, setDistanceTime] = useState(0);
	const [tripTime, setTripTime] = useState('00:00:00');
	const [coordinates, setCoordinates] = useState();

	// Map state management.
	const [
		selectedPath,
		setSelectedPath,
		routes, disaplayIds,
		selectedId
	] = useGetPaths();

	// Memoize array to avoid to many rerenderings.
	const memoizedRoutes = useMemo(() =>  routes, [routes]);

	const getData = useCallback((data) => {
  		setSelectedPath(data.route)
	}, [setSelectedPath]);

	const displayTime = useCallback((data) => {
		setDistanceTime(data);
	}, [setDistanceTime])

	const displayTripTime = useCallback((data) => {
		setTripTime(data);
	}, [setTripTime])
	
	const fetchCoordinates = useCallback((data) => {
		setCoordinates(data);
	}, [setCoordinates])

	// Memoize coordinates to avoid further renderings on child components.
	const memoizedCoordinates = useMemo(() => coordinates, [coordinates]);

	useEffect(() => {
		let socket = io(ENDPOINT);
		setSocketConn(socket);
		socket.on('geo', getData);
		socket.on('distanceTime', displayTime);
		socket.on('tripTime', displayTripTime);
		socket.on('coordinates', fetchCoordinates);

		return () => {
			socket.removeListener('geo', getData);
			socket.removeListener('distanceTime', displayTime);
			socket.removeListener('tripTime', displayTripTime);
		}
	}, [getData, displayTime, displayTripTime, fetchCoordinates]);

	return ( 
		<MapContainer mapToken={MAPBOX_TOKEN}
			path={selectedPath}
			width='80%'
			height='900px'
			selectedId={selectedId}
			disaplayIds={disaplayIds}
			routes={memoizedRoutes}
			coordinates={memoizedCoordinates}
			socket={socketConn}
			distanceTime={distanceTime}
			tripTime={tripTime}
			style='mapbox://styles/mapbox/streets-v11' 
		/>
	);
};

export default React.memo(App);