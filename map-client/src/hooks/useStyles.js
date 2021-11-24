import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
		"& .MuiFormControl-root": {
			margin: '0 auto'
		},
		"& .MuiButtonBase-root": {
			marginTop: '20px'
		},
		"& .Mui-selected": {
			background: '#e0e0e0',
			"&:hover": {
				background: '#e0e0e0',
			}
		},
		"& .MuiTypography-body1": {
			fontWeight: '300'
		},
		"& .MuiFormLabel-root": {
			fontSize: '16px',
			color: '#0f5b8e',
		},
		"& .MuiInputBase-root": {
			marginTop: '19px'
		},
		"& .MuiIconButton-colorInherit": {
			marginTop: '0px'
		},
		"& .MuiTablePagination-toolbar": {
			fontWeight: '400',
			fontStyle: 'italic',
			color: '#4d4e52'
		},
		"& .MuiTablePagination-selectRoot": {
			marginTop: '8px',
			marginLeft: '0px',
			marginRight: '10px'
		},
		"& .MuiTablePagination-select": {
			fontSize: '15px'
		},
		"& .MuiTablePagination-caption": {
			fontSize: '15px'
		},
		"& .MuiTab-root": {
			minWidth: '120px'
		},
		"&. MuiPaper-elevation4": {
			boxShadow: 'none'
		},
	},
	marketBtn: {
		background: 'none',
		border: 'none',
		cursor: 'pointer'
	},
	markerBtnImg: {
		width: '50px',
		height: '50px'	
	},
	loader: {
		width: '200px',
		marginTop: '90px',
		color: '#2b5b8f', 
	},
	textLoader: {
		display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
		position: 'absolute', 
		color: '#2b5b8f', 
		fontSize: '22px', 
		top: '-300px'
	},
	button: {
        color: "#295985",
        border: "1px solid #295985",
        backgroundColor: "#d7d6da",
        height: "70px",
		marginLeft: "10px",
        "&:hover": {
            border: "1px solid rgba(210, 211, 216, 0.5)",
        },
    },
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1
	},
	labelContainer: {
		paddingLeft: 0,
		paddingRight: 0
	},
	formControl: {
		width: "100%",
		"& label span": {
			color: "red"
		},
		paddingRight: '25px'
	},
	titleDescription: {
		fontWeight: 'bold',
		color: '#3f51b5',
	},
	tabContainer: {
		boxShadow: 'none'
	},
	tabStyle: {
		minWidth: 100,
		paddingLeft: 12,
		paddingRight: 12
	},
	pageContent: {
		padding: theme.spacing(1)
	},
	searchInput: {
		width: '75%'
	},
}));