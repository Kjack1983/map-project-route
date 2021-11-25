import { useState, useCallback } from 'react';
import useDebounceEffect from './useDebounceEffect';

const useConstructPoints = (socket) => {
    const [myCoordinates, setMyCoordinates] = useState([]);
    const [points, setPoints] = useState({});

    const fetchCoordinates = useCallback((data) => {
        setMyCoordinates(data);

        const myPoints = data.reduce((acc, curr, index) => {
            return {
                ...acc, 
                type: 'Feature',
                properties: {
                    lunch: index
                },
                geometry: {
                    type: 'Point',
                    coordinates: curr[index]
                }
            };
        }, {})

        setPoints(myPoints)

	}, [setMyCoordinates])

    useDebounceEffect(() => {

        socket.on('coordinates', fetchCoordinates);

        // clean up function
        return () => {
            socket.removeListener('coordinates', fetchCoordinates);
            socket.off('coordinates', fetchCoordinates);
        }

    }, [], 500)

    return { myCoordinates, points }

}

export default useConstructPoints;