import { useEffect } from 'react';

/**
 * Use Debounce Utility
 *
 * Allows debouncing the useEffect hook.  Simple implementation
 * does not handle the useEffect return - maybe can investigate
 * in the future if needed.
 *
 * @param {function} callback Function to run post debounce.
 * @param {array} values Dependencies to monitor with useEffect.
 * @param {number} delay Debounce delay in milliseconds.
 */
export default function useDebounceEffect(callback, values = [], delay = 100) {

	// Require callback function
	if (typeof callback !== 'function') {
		throw new Error('Debounce Effect callback is not of type function');
	}

	// Require integer for delay
	if (typeof delay !== 'number') {
		throw new Error('Debounce Effect delay is not of type number');
	}

	// Set debounced useEffect
	useEffect(() => {
		const handler = setTimeout(() => {
			callback();
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, values);
};
