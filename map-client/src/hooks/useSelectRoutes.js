import { useState, useMemo } from 'react';

/**
 * Custom hook to handle the mapId on 
 * change and find the selected route.
 * 
 * @param { object } routes 
 * @param { object } path 
 * @param { string } selectedId 
 * @return { Array[
 *  selectedPath:object, 
 *  selectedMapId:String, 
 *  handleMapId:Function>
 * ] } 
 */
export const useSelectRoutes = (routes = {}, path, selectedId) => {
	const [selectedPath, setSelectedPath] = useState({});
	const [selectedMapId, setSelectedMapId] = useState('');
	let {loading, data} = routes;

	useMemo(() => {
		setSelectedMapId(selectedId);
		setSelectedPath(path);
	}, [selectedId, path])

	return [selectedPath, selectedMapId, (event) => {
		let {target: {value: eventValue}} = event;
		setSelectedMapId(eventValue);

		let coordinatesFound = false; 
		if(!loading) {
			data.forEach(coordinate => {
				coordinatesFound = Object.entries(coordinate).reduce((acc, [key, value]) => {
					return acc || value === eventValue;
				}, false);

				// Set Route.
				if(coordinatesFound) {
					setSelectedPath(coordinate.route);
				}

				coordinatesFound = false;
			});
		}
	}];
}