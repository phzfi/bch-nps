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
	Zoom,
	Container,
	Alert
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';




function range(start, end) {
	return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
const radioArray = range(0, 10);


const MuiForm = () => {
	const [surveyOpen, setSurveyOpen] = useState(true);
	const [score, setScore] = useState(undefined);
	const [comment, setComment] = useState(undefined);
	const [thankyouOpen, setThankyouOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		getResults();
	}, [])

	const handleSubmit = () => {
		sendSurvey();
		setSurveyOpen(false);
		setThankyouOpen(true);
	};

	const handleCloseSurvey = () => {
		setSurveyOpen(false);
	};

	const handleCloseThankyou = () => {
		setThankyouOpen(false);
	};

	const sendSurvey = () => {
		axios.post('http://localhost:8080/api/reviews', {
			score: score,
			comment: comment
		});
	};

	const getResults = () => {
		axios.get('http://localhost:8080/api/reviews')
		.catch(err => console.log(err))
		.then(res => console.log(res.data));
	};
		

	return (
		<div>
			<Typography variant="h3"
						sx={{position: "absolute", top: "3rem", left: "3rem"}}>
			Promoter Score Survey test page
			</Typography>
			{/* <Zoom > */}
			<Dialog open={surveyOpen} 
					onClose={handleCloseSurvey}
					maxWidth="xl"
					fullScreen={fullScreen}
					>
				<img
					style={{ maxWidth: "15%", alignSelf: "center", paddingTop: "2rem" }}
					src="https://phz.fi/app/uploads/2019/04/cropped-mstile-310x310.png"
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
			</Dialog>
			{/* </Zoom> */}
			{thankyouOpen &&
				(<Alert onClose={handleCloseThankyou}>
					Score <strong>submitted</strong>. Thank you for your feedback!
				</Alert>)}

		</div>
	);
};

export default MuiForm;
