import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	Button,
	TextareaAutosize,
	Typography,
	Dialog,
	DialogContent,
	DialogTitle,
	Container,
	Alert
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/phz.png';




function range(start, end) {
	return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
const radioArray = range(0, 10);


const MuiForm = () => {
	const [surveyOpen, setSurveyOpen] = useState(true);
	const [score, setScore] = useState(undefined);
	// const [country, setCountry] = useState(undefined);
	const [cookieFound, setCookieFound] = useState(false);
	const [comment, setComment] = useState(undefined);
	const [thankyouOpen, setThankyouOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		// info.map(i => console.log(i));
		// const geo = navigator.geolocation;
		// if (geo) {
		// 	geo.getCurrentPosition(getCountry, error, options)
		// };
		checkACookieExists();
		getResults();
	}, [cookieFound, surveyOpen]);


	// const options = {
	//   enableHighAccuracy: true,
	//   timeout: 5000,
	//   maximumAge: 10000
	// };

	// function getCountry(position) {
	// 	const crd = position.coords;
	// 	const latitude = crd.latitude;
	// 	const longitude= crd.longitude;
	// 	axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
	// 	.then(res => setCountry(res.data.countryName));
	// }

	// const info = [
	// 	navigator.userAgent, // Get the User-agent
	// 	navigator.cookieEnabled, // Checks whether cookies are enabled in browser
	// 	navigator.appName, // Get the Name of Browser
	// 	navigator.language,  // Get the Language of Browser
	// 	navigator.appVersion,  // Get the Version of Browser
	// 	navigator.platform,  // Get the platform for which browser is compiled
	// 	document.location,
	// 	document.referrer,
	// 	navigator.languages,
	// 	document.cookie,
	// ]


	// function error(err) {
	// 	console.warn(`ERROR(${err.code}): ${err.message}`);
	// }


	function checkACookieExists() {
		if (document.cookie.split(';').some((item) => item.trim().startsWith(decodeURIComponent('-surveyAnswering3-')))) {
			setCookieFound(true);
		}
	}

	function createCookie() {
		const cookieName = "-surveyAnswering3-";
		const cookieValue = "-surveyWasAnswered3-";
		const date = new Date();
		date.setDate(date.getDate() + 30);
		const expires = "; expires=" + date.toUTCString();
		document.cookie = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue) + expires + "; path=/";
		setCookieFound(true)
	}

	const handleSubmit = () => {
		sendSurvey();  
		createCookie();
		setSurveyOpen(false);
		setThankyouOpen(true);
	};

	const handleCloseSurvey = () => {
		setSurveyOpen(false);
		setTimeout(() => setSurveyOpen(true), 2000);
	};

	const handleCloseThankyou = () => {
		setThankyouOpen(false);
		setTimeout(() => setSurveyOpen(true), 2000);
	};

	const sendSurvey = () => {
		axios.post('http://localhost:8080/api/reviews', {
			score: score,
			comment: comment,
		})
		.then((res) => res.status === 200 ? createCookie() : undefined);
	};

	const getResults = () => {
		axios.get('http://localhost:8080/api/reviews')
		.catch(err => console.log(err))
		.then(res => console.log(res.data));
	};

	return (
		<div>
			{cookieFound && !thankyouOpen &&<Typography variant="h6" p={2}>
			You already answered the survey in the last 30 days. 
			</Typography>}
			{/* <Zoom > */}
			{!cookieFound && <Dialog open={surveyOpen} 
					onClose={handleCloseSurvey}
					maxWidth="xl"
					fullScreen={fullScreen}
					>
				<img
					style={{ maxWidth: "15%", alignSelf: "center", paddingTop: "2rem" }}
					src={logo}
					alt="PHZ logo"
				/>
				<DialogTitle align="center">
					How likely are you to recommend us to a friend or colleague?
				</DialogTitle>
				<DialogContent align="center">
					<Typography
						variant="subtitle1"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						(0 = Not Likely, 10 = Very Likely)
					</Typography>
					<FormControl className="centerForm" margin="dense" alignitems="center">
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
							row
							onChange={(event) => setScore(event.target.value)}
							sx={{flexWrap: "nowrap"}}
							>
							{radioArray.map((radio, i) => (
								<FormControlLabel key={i}
								sx={{width: "9%", margin: "0rem", padding: "0rem"}}	
								value={radio}
								control={<Radio
								sx={{ margin: "0rem", padding: "0rem"}}			
								/>}
								label={radio}
								labelPlacement="top"/>
							))}
						</RadioGroup>
						<Typography
							paragraph
							color="textPrimary"
							align="center"
							margin="1rem"
						>
							Please provide any comments to help explain your selection.
						</Typography>
						<TextareaAutosize
							aria-label="empty textarea"
							minRows={5}
							onChange={e => setComment(e.target.value)}
						/>
						<Container>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								sx={{minWidth: '200px',
									margin: "1rem 1rem"}}
								onClick={handleSubmit}>
									Submit
							</Button>
							<Button
								type="submit"
								variant="outlined"
								color="primary"
								sx={{minWidth: '200px',
								margin: "1rem 1rem",
								':hover': {
									bgcolor: 'primary.main',
									color: 'white',
								}
								}}
								onClick={handleCloseSurvey}>
									Close
							</Button>
						</Container>
					</FormControl>
				</DialogContent>
			</Dialog>}
			{/* </Zoom> */}
			{thankyouOpen &&
				(<Alert onClose={handleCloseThankyou}>
					Score <strong>submitted</strong>. Thank you for your feedback!
				</Alert>)}

		</div>
	);
};

export default MuiForm;
