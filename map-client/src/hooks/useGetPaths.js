import { useState, useReducer, useEffect } from 'react';
import { baseUrl } from '../shared/baseUrl';

/**
 * Fetch Ids 
 * @param {Array} state 
 * @param {Array} action 
 * @return {Array<[{id: String]}>} 
 */
const idListReducer = (state, action) => {
	return action.reduce((acc, curr, index) => {
		let label = index === 0 ? 'Popeye-work-route': 'Lunch-route';
		let {_id } = curr;
		return [
			...acc, { id: _id, label: label }
		]
	}, []);
};

/**
 * Custom hook for fetching the routes.
 * 
 * @return {Array<
 * 	selectedPath: {}, 
 *  setSelectedPath: {}, 
 *  routes:array, 
 *  disaplayIds: array, 
 *  selectedId: string
 * >} 
 */

export const useGetPaths = () => {
	const [routes, setRoutes] = useState({
		loading: true, 
		data: null
	});
	const [selectedPath, setSelectedPath] = useState({});
	const [disaplayIds, dispatch] = useReducer(idListReducer, []);
	const [selectedId, setSelectedId] = useState('');
	useEffect(() => {
		let timer = null;
		const getPaths = async () => {
			try {
				let response = await fetch(`${baseUrl}api/popeye/`);

				// No delay with asyc await and how its implemeted right now 
				// circular progress loader small delay of 1 second 
				// (bullet points specifications).
				timer = setTimeout(async () => {
					if (response.ok) {
						let data = await response.json();

						setRoutes({
							loading: false, 
							data
						});

						// Store first route as default.
						setSelectedPath(data[0].route);
						
						// Construct ids for the dropdown. 
						dispatch(data);
						setSelectedId(data[0]._id);
					} else {
						throw new Error(`Error ${response.status}: ${response.statusText}`);
					}
				}, 800)

			} catch (error) {
				console.log('%c%s', 'color: #00a3cc', 'ERROR:', error);
				return false;
			}
		}

		getPaths();

		return () => {
			clearTimeout(timer);
		}

	}, [])

	return [
		selectedPath, setSelectedPath,
		routes, disaplayIds, selectedId
	];
}