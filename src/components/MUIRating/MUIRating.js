import { useState, useEffect } from "react";
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
	Snackbar,
	Alert,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slide from '@mui/material/Slide';
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

const MuiForm = () => {
	const [surveyOpen, setSurveyOpen] = useState(true);
	const [error, setError] = useState(false);
	const [score, setScore] = useState(0);
	const [surveyAnswered, setSurveyAnswered] = useState(false);
	const [comment, setComment] = useState(undefined);
	const [thankyouOpen, setThankyouOpen] = useState({
		open: false,
		Transition: SlideTransition
	});
	const [hover, setHover] = useState(-1);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		checkIsSurveyAnswered();
	}, [surveyAnswered, surveyOpen, error, score]);

	useEffect(() => {
		getResults();
	}, [surveyOpen]);

	const checkIsSurveyAnswered = () => {
		const answered = "-surveyAnsweredInLast30days-";
		const closed = "-surveyClosedInLast7days-";
		const date = new Date();
		date.setDate(date.getDate());
		const expires = localStorage.getItem(answered) ? localStorage.getItem(answered) : localStorage.getItem(closed);
		const now = date.getTime();
		if (now < Date.parse(expires) || now < Date.parse(closed)) {
			setSurveyAnswered(true);
		}
		if (now > Date.parse(expires)) {
			localStorage.removeItem(answered);
		}
		if (now > Date.parse(expires)) {
			localStorage.removeItem(closed);
		}
	};

	const setExpiryForSurvey = () => {
		const date = new Date();
		date.setDate(date.getDate() + 30);
		const answered = "-surveyAnsweredInLast30days-";
		localStorage.setItem(answered, date);
	};

	const setExpiryForClosedSurvey = () => {
		const date = new Date();
		date.setDate(date.getDate() + 7);
		const closed= "-surveyClosedInLast7days-";
		localStorage.setItem(closed, date);
	};

	const submitOK = () => {
		setExpiryForSurvey();
		setSurveyOpen(false);
		setThankyouOpen({
			...thankyouOpen,
			open: true
		});
	};

	const errorInSubmit = (err) => {
		console.log(err);
		setErrorMessage(err);
		setError(true);
		setSurveyOpen(false);
	};

	const handleCloseSurvey = () => {
		setSurveyOpen(false);
		setExpiryForClosedSurvey();
	};

	const handleCloseThankyou = () => {
		setThankyouOpen({
			...thankyouOpen,
			open: false
		});
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
			// .then((res) => console.log(res.data))
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

	const { vertical, horizontal } = { open: false, vertical: "bottom", horizontal: "left"};

	// snackbar transition
	function SlideTransition(props) {
		return <Slide {...props} direction="up" />;
	}

	return (
		<div>
			{!surveyAnswered && (
				<Dialog
					open={surveyOpen}
					onClose={handleCloseSurvey}
					maxWidth="xl"
					fullScreen={fullScreen}
					TransitionComponent={Slide}
					aria-describedby="alert-dialog-slide-description"
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
								Why/Why not?
							</Typography>
							<TextareaAutosize
								aria-label="empty textarea"
								minRows={5}
								cols={45}
								className="textarea"
								onChange={(e) => setComment(e.target.value)}
							/>
							<Container>
								<Button
									disabled={score === 0 ? true : false}
									type="submit"
									variant="contained"
									color="primary"
									sx={{ minWidth: "100px", m: 1 }}
									onClick={sendSurvey}
								>
									Submit
								</Button>
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
			{thankyouOpen && (
				<Snackbar open={thankyouOpen.open}
						autoHideDuration={5000}
						anchorOrigin={{vertical, horizontal}}
						onClose={handleCloseThankyou}
						TransitionComponent={thankyouOpen.Transition}
						key={thankyouOpen.Transition.name}
				>
					<Alert onClose={handleCloseThankyou}
						severity="success"
						sx={{ width: '100%' }}
					>
						Score <strong>submitted</strong>. Thank you for your feedback!
					</Alert>
				</Snackbar>
			)}
			{error && (
				<Snackbar open={error}
						autoHideDuration={5000}
						onClose={handleCloseError}
				>
					<Alert severity="error"
						onClose={handleCloseError}
					>
						{`${errorMessage}`}
					</Alert>
				</Snackbar>
			)}
		</div>
	);
};

export default MuiForm;
