import React, { useState } from 'react';

/**
 * Custom hook to support map styling.
 * 
 * @param {string} selectedTheme 
 * @return [
 *  Array<theme:string, 
 *  styles: Array, 
 *  handleChange:function, 
 *  displayStyles:function>
 * ]
 */
export const useMapStyle = (selectedTheme) => {
	const [theme, setTheme] = useState(selectedTheme);
	const [styles] = useState([
		'mapbox://styles/mapbox/streets-v11',
		'mapbox://styles/mapbox/outdoors-v11',
		'mapbox://styles/mapbox/light-v10',
		'mapbox://styles/mapbox/dark-v10',
		'mapbox://styles/mapbox/satellite-v9',
		'mapbox://styles/mapbox/satellite-streets-v11',
		'mapbox://styles/mapbox/navigation-day-v1',
		'mapbox://styles/mapbox/navigation-night-v1'
	])

	/**
	 * Append job list status
	 * 
	 * @return {array} acc
	 */
	const displayStyles = React.useCallback(() => {
		return styles.reduce((acc, curr) => {
			// replace string for label.
			let label = curr.replace('mapbox://styles/mapbox/', '');
			acc = [...acc, { value: curr, label }];
			return acc;
		}, [])
	}, [])

	return [theme, (event) => {
		let { value } = event.target; 
		setTheme(value);
	}, displayStyles];
}