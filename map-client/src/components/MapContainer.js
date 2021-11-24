import React, { useState, useEffect } from 'react'
import MapGL, { Source, Layer, Image } from '@urbica/react-map-gl';
import { useMapStyle } from '../hooks/useMapStyle';
import { useStyles } from '../hooks/useStyles';
import { useSelectRoutes } from '../hooks/useSelectRoutes';
import { useSocketListenerEvents } from '../hooks/useSocketListenerEvents';
import useConstructPoints from '../hooks/useContructPoints';
import useDebounceEffect from '../hooks/useDebounceEffect';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import 'mapbox-gl/dist/mapbox-gl.css';
import {
	Paper, Grid, FormControl, FormHelperText, 
	Button, InputLabel, Select, Input, MenuItem,
} from '@material-ui/core';

const displayOptions = [
	{value: 3000, label: '1 second'},
	{value: 15000, label: '5 seconds'},
	{value: 30000, label: '10 seconds'},
]

let imageURL = '/carmap2.png';

const MapContainer = ({
	mapToken, path,
	width, height,
	selectedId, disaplayIds,
	routes, coordinates, socket, 
	distanceTime, tripTime, style
}) => {

	// destructure routes.
	let { loading, data } = routes;

	// hook for styling.
	const classes = useStyles();

	// set ViewPort
	const [viewPort, setViewPort] = useState({
		latitude: 35.930000,
		longitude: 14.400000,
		width: "100vw",
		height: "100vh",
		zoom: 11,
	});

	// set custom theme hook.
	const [ 
		theme, 
		handleChange, 
		displayStyles 
	] = useMapStyle(style);

	// custom hook for routes.
	const [
		selectedPath, 
		selectedMapId, 
		handleMapChange
	] = useSelectRoutes(routes, path, selectedId);

	// custom hook for socket events (triggering timers).
	const [
		removeTimer, setTimer, 
		milliseconds, myTripTime, mapData, myDistanceTime, 
		displaySecondsDropdown, imageUrl, handleMillSelect
	] = useSocketListenerEvents(socket, 3000, tripTime, coordinates, distanceTime);

	return (
		<React.Fragment>
		{loading && data === null ? 
			<Box className={classes.root} sx={{ display: 'flex' }}>
				<span className={classes.textLoader}>Loading settings....</span>
				<CircularProgress className={classes.loader} size={60} />
			</Box> : <Grid container spacing={2} className={classes.root}>
			<Grid item xs={2}>
				<FormControl className={classes.formControl}>
					<InputLabel
						style={{ disableAnimation: false }}
						disableAnimation={false}
						htmlFor="theme"
					>
						Map Themes *
						</InputLabel>
					<Select
						value={theme}
						onChange={(event) => {
							handleChange(event)
						}}
						input={<Input name="theme" id="theme" />}
					>
						<MenuItem selected value="Please Select"><em>Please select</em></MenuItem>
						{displayStyles().map(option => {
							return <MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						})}
					</Select>
					<FormHelperText>Select a map theme</FormHelperText>
				</FormControl>
			</Grid>
			<Grid item xs={2}>
				<FormControl className={classes.formControl}>
					<InputLabel
						style={{ disableAnimation: false }}
						disableAnimation={false}
						htmlFor="route"
					>
						Routes *
						</InputLabel>
					<Select
						value={selectedMapId}
						onChange={(event) => {
							handleMapChange(event)
						}}
						input={<Input name="route" id="route" />}
					>
						<MenuItem selected disabled value=""><em>Please select</em></MenuItem>
						{disaplayIds.map(option => {
							return <MenuItem key={option.id} value={option.id}>
								{option.label}
							</MenuItem>
						})}
					</Select>
					<FormHelperText>Select a route</FormHelperText>
				</FormControl>
			</Grid>
			{displaySecondsDropdown && <Grid item xs={2}>
				<FormControl className={classes.formControl}>
					<InputLabel
						style={{ disableAnimation: false }}
						disableAnimation={false}
						htmlFor="milliseconds"
					>
						Seconds *
						</InputLabel>
					<Select
						value={milliseconds}
						onChange={(event) => {
							handleMillSelect(event)
						}}
						input={<Input name="milliseconds" id="milliseconds" />}
					>
						<MenuItem selected disabled value=""><em>Please select</em></MenuItem>
						{displayOptions.map(option => {
							return <MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						})}
					</Select>
					<FormHelperText>Select Seconds</FormHelperText>
				</FormControl>
			</Grid>}
			<Grid item xs={2}>
				<Button
                    onClick={removeTimer}
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                >Remove Timer</Button>
				<Button
                    onClick={setTimer}
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                >Set Timer</Button>
			</Grid>
			<Grid item xs={1}>
				<Paper style={{marginBottom: '3px'}}>Time Distance: <strong>{myDistanceTime} s</strong></Paper>
				<Paper>Trip Time: <strong>{myTripTime}</strong></Paper>
			</Grid>
			<MapGL
				style={{ width, height, margin: '0 auto' }}
				mapStyle={theme} // use a dropdown to change themes.
				accessToken={mapToken}
				onViewportChange={setViewPort}
				{...viewPort}
			>
				<Source id='route' type='geojson' data={selectedPath} />
					<Layer
						id='route'
						type='line'
						source='route'
						layout={{
							'line-join': 'round',
							'line-cap': 'round'
						}}
						paint={{
							'line-color': 'blue',
							'line-width': 7
					}}
				/>
				<Source id='point' type='geojson' data={mapData} />
					<div className={classes.marketBtn}>
						<Image id='my-image' className={classes.markerBtnImg} image={imageUrl} />
					</div>
					<Layer
						id='image-layer'
						type='symbol'
						source='point'
						layout={{
							'icon-image': 'my-image',
							'icon-size': 0.12
						}}
				/>
				
			</MapGL>
		</Grid>
		}
		</React.Fragment>
	)
}

export default React.memo(MapContainer);