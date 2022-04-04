import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
	Box,
	FormControl,
	Rating,
	Button,
	TextareaAutosize,
	Typography,
	// ButtonGroup,
	Dialog,
	DialogContent,
	DialogTitle,
	Container,
	Alert
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/phz.png';
import StarIcon from '@mui/icons-material/Star';


const MuiForm = () => {
	const [surveyOpen, setSurveyOpen] = useState(true);
	const [error, setError] = useState(false);
	const [score, setScore] = useState(0);
	// const [country, setCountry] = useState(undefined);
	const [cookieFound, setCookieFound] = useState(false);
	const [comment, setComment] = useState(undefined);
	const [thankyouOpen, setThankyouOpen] = useState(false);
	const [hover, setHover] = useState(-1);
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
	}, [cookieFound, surveyOpen, error]);


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
		if (navigator.cookieEnabled) {
			if (document.cookie.split(';').some((item) => item.trim().startsWith('-surveyAnsweringIcons-'))) {
				setCookieFound(true);
			}
		}
	}

	function createCookie() {
		const cookieName = "-surveyAnsweringIcons-";
		const cookieValue = "-surveyWasAnsweredIcons-";
		const date = new Date();
		date.setDate(date.getDate() + 30);
		const expires = "; expires=" + date.toUTCString();
		document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
		setCookieFound(true);
		console.log('status OK, 30 days cookie set');
	}

	// const handleClick = (e) => {
	// 	setScore(e.target.value);
	// }

	const submitOK = () => {
		createCookie();
		setSurveyOpen(false);
		setThankyouOpen(true);
	};

	const errorInSubmit = (err) => {
		console.log(err);
		setError(true);
		setSurveyOpen(false);
		setTimeout(() => setSurveyOpen(true), 5000);
		
	}

	const handleCloseSurvey = () => {
		setSurveyOpen(false);
		setTimeout(() => window.location.reload(), 2000);
	};

	const handleCloseThankyou = () => {
		setThankyouOpen(false);
		setTimeout(() => window.location.reload(), 2000);
	};

	const handleCloseError = () => {
		setError(false);
		setTimeout(() => window.location.reload(), 2000);
	}

	const sendSurvey = () => {
		axios.post('http://localhost:8080/api/reviews', {
			score: score,
			comment: comment,
		})
		.catch(err => errorInSubmit(err))
		.then((res) => res.status === 200 ?  submitOK() : errorInSubmit());
	};

	const getResults = () => {
		axios.get('http://localhost:8080/api/reviews')
		.then(res => console.log(res.data))
		.catch(err => console.log(err));
	};

	const labels = {
		0: 'Not rated yet',
		1: '1 star',
		2: '2 stars',
		3: '3 stars',
		4: '4 stars',
		5: '5 stars',
		6: '6 stars',
		7: '7 stars',
		8: '8 stars',
		9: '9 stars',
		10: '10 stars',
	  };

	return (
		<div>
			{cookieFound && !thankyouOpen &&<Typography variant="h6" p={2}>
			You already answered in the last 30 days. Clear your -surveyAnswering- cookie to test again.
			</Typography>}
			{/* <Zoom > */}
			{!cookieFound && <Dialog open={surveyOpen} 
					onClose={handleCloseSurvey}
					maxWidth="xl"
					fullScreen={fullScreen}
					>
				<img
					style={{ maxWidth: "10%", alignSelf: "center", paddingTop: "1.5rem" }}
					src={logo}
					alt="PHZ logo"
				/>
				<DialogTitle align="center">
					How likely are you to recommend PHZ to a friend or colleague?
				</DialogTitle>
						<Typography
						variant="subtitle1"
						align="center"
						color="textPrimary"
						padding= "0"
						margin= "0"
					>
						(0 = Not Likely, 10 = Very Likely)
					</Typography>
				<DialogContent align="center">
					<FormControl className="centerForm" margin="dense" alignitems="center" sx={{display: "flex", justifyContent: "center"}}>
						{/* <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth>
						{radioArray.map((item, i) => (
								<Button key={i} onClick={handleClick} value={item.score}>{item.score}</Button>
							))}


						</ButtonGroup> */}
						{/* {radioArray.map((item, i) => (
								<Button key={i} onClick={handleClick} value={item.score}>{item.score}</Button>
							))} */}
							    <Box
									sx={{
										'& > legend': { mt: 2 },
									}}
									>
									{score !== null && (
        								<Box sx={{ml: 2, mb: "0.5rem"}}>
											{labels[hover !== -1 ? hover : score]}
										</Box>
      								)}
									<Rating
										name="hover-feedback"
										value={score}
										emptyLabelText="not rate yet"
										max={10}
										size={"large"}
										required
										onChange={(event, newValue) => {
										setScore(newValue);
										}}
										onChangeActive={(event, newHover) => {
											setHover(newHover);
										}}
										emptyIcon={<StarIcon style={{ opacity: 0.75 }} fontSize="inherit" />}
									/>
								</Box>

						<Typography
							paragraph
							color="textPrimary"
							align="center"
							marginTop="1rem"
							marginBottom="0rem"
							paddingBottom="0rem"
						>
							Any comments? Ideas?
						</Typography>
						<TextareaAutosize
							aria-label="empty textarea"
							minRows={5}
							sx={{marginTop: "0rem", padding: "0rem"}}
							onChange={e => setComment(e.target.value)}
						/>
						<Container>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								sx={{minWidth: '100px',
									m: 1
								}}
								onClick={sendSurvey}>
									Submit
							</Button>
							<Button
								type="submit"
								variant="outlined"
								color="primary"
								sx={{minWidth: '100px',
								m: 1,
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
			{error &&
				(<Alert severity="error" onClose={handleCloseError}>
					Something went wong. Did you forget to give a score?
				</Alert>)}

		</div>
	);
};

export default MuiForm;
