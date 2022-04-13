import React, { useState, useEffect } from "react";
import "./MUIRating.css";
import axios from "axios";
import {
	Box,
	FormControl,
	Rating,
	Button,
	TextareaAutosize,
	Typography,
	Dialog,
	DialogContent,
	DialogTitle,
	Container,
	Alert,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

const MuiForm = () => {
	const [surveyOpen, setSurveyOpen] = useState(true);
	const [error, setError] = useState(false);
	const [score, setScore] = useState(0);
	const [surveyAnswered, setSurveyAnswered] = useState(false);
	const [comment, setComment] = useState(undefined);
	const [thankyouOpen, setThankyouOpen] = useState(false);
	const [hover, setHover] = useState(-1);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		checkIsSurveyAnswered();
	}, [surveyAnswered, surveyOpen, error, score]);

	useEffect(() => {
		getResults();
	}, [surveyOpen]);

	const checkIsSurveyAnswered = () => {
		const key = "-surveyAnsweringIn30days-";
		// const currentDate = new Date();
		const now = new Date();
		now.setDate(now.getDate());
		const itemStr = localStorage.getItem(key);
		if (now < Date.parse(itemStr)) {
			setSurveyAnswered(true);
		}
		if (now > Date.parse(itemStr)) {
			localStorage.removeItem(key);
		}
	};

	const setExpiryForSurvey = () => {
		const date = new Date();
		date.setDate(date.getDate() + 30);
		const key = "-surveyAnsweringIn30days-";
		localStorage.setItem(key, date);
	};

	const submitOK = () => {
		setExpiryForSurvey();
		setSurveyOpen(false);
		setThankyouOpen(true);
	};

	const errorInSubmit = (err) => {
		console.log(err);
		setError(true);
		setSurveyOpen(false);
	};

	const handleCloseSurvey = () => {
		setSurveyOpen(false);
	};

	const handleCloseThankyou = () => {
		setThankyouOpen(false);
	};

	const handleCloseError = () => {
		setError(false);
	};

	const sendSurvey = () => {
		if (score) {
			axios
				.post("http://localhost:8080/api/reviews", {
					score: score,
					comment: comment,
				})
				.catch((err) => errorInSubmit(err))
				.then((res) => (res.status === 200 ? submitOK() : errorInSubmit()));
		}
	};

	const getResults = () => {
		axios
			.get("http://localhost:8080/api/reviews")
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	const labels = {
		0: "No rating given",
		1: "1 star",
		2: "2 stars",
		3: "3 stars",
		4: "4 stars",
		5: "5 stars",
		6: "6 stars",
		7: "7 stars",
		8: "8 stars",
		9: "9 stars",
		10: "10 stars",
	};

	const labelsStars = [...Array(10).keys()].map((x) => x + 1);

	return (
		<div>
			{/* <Zoom > */}
			{!surveyAnswered && (
				<Dialog
					open={surveyOpen}
					onClose={handleCloseSurvey}
					maxWidth="xl"
					fullScreen={fullScreen}
				>
					<DialogTitle
						align="center"
						sx={{ fontSize: "1.8rem", padding: "3rem" }}
					>
						How likely are you to recommend PHZ to a friend or colleague?
					</DialogTitle>
					<Typography
						variant="subtitle1"
						align="center"
						color="textPrimary"
						padding="0"
						margin="0"
					>
						(1 = Not Likely, 10 = Very Likely)
					</Typography>
					<DialogContent align="center">
						<FormControl
							margin="dense"
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Box
								sx={{
									"& > legend": { mt: 2 },
								}}
							>
								{score !== null && (
									<Box sx={{ ml: 2, mb: "0.5rem" }}>
										{labels[hover !== -1 ? hover : score]}
									</Box>
								)}
								<Box align="center" sx={{ display: "flex" }}>
									{labelsStars.map((label) => (
										<Typography key={label} margin={1.6}>
											{label}
										</Typography>
									))}
								</Box>
								<Rating
									className="rating"
									name="hover-feedback"
									value={score}
									emptyLabelText="not rate yet"
									max={10}
									sx={{ fontSize: "2.2rem" }}
									required
									onChange={(event, newValue) => {
										setScore(newValue);
									}}
									onChangeActive={(event, newHover) => {
										setHover(newHover);
									}}
									emptyIcon={
										<StarIcon style={{ opacity: 0.75 }} fontSize="inherit" />
									}
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
								cols={45}
								className="textarea"
								onChange={(e) => setComment(e.target.value)}
							/>
							<Container>
								{score !== 0 && (
									<Button
										type="submit"
										variant="contained"
										color="primary"
										sx={{ minWidth: "100px", m: 1 }}
										onClick={sendSurvey}
									>
										Submit
									</Button>
								)}
								{score === 0 && (
									<Button
										disabled
										type="submit"
										variant="contained"
										color="primary"
										sx={{ minWidth: "100px", m: 1 }}
										onClick={sendSurvey}
									>
										Submit
									</Button>
								)}
								<Button
									type="submit"
									variant="outlined"
									color="primary"
									sx={{
										minWidth: "100px",
										m: 1,
										":hover": {
											bgcolor: "primary.main",
											color: "white",
										},
									}}
									onClick={handleCloseSurvey}
								>
									Close
								</Button>
							</Container>
						</FormControl>
					</DialogContent>
				</Dialog>
			)}
			{/* </Zoom> */}
			{thankyouOpen && (
				<Alert onClose={handleCloseThankyou}>
					Score <strong>submitted</strong>. Thank you for your feedback!
				</Alert>
			)}
			{error && (
				<Alert severity="error" onClose={handleCloseError}>
					Something went wong.
				</Alert>
			)}
		</div>
	);
};

export default MuiForm;
