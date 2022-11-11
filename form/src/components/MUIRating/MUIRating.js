import { useState } from 'react'
import "./MUIRating.css";
import { db } from "../../firebase-config";
import { collection, doc, addDoc, getDoc } from "firebase/firestore";
import {
	Box,
	FormControl,
	Rating,
	Button,
	TextareaAutosize,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const MuiForm = () => {
	const [score, setScore] = useState(0);
	const [comment, setComment] = useState("");
	const [_, setHover] = useState(-1);
	const [errorOpen, setErrorOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState(undefined);
	const [surveyTitle, setSurveyTitle] = useState("");

	const reviewsCollectionRef = collection(db, "reviews");

	// get survey form title from config db
	const configDocRef = doc(db, "config", "form")
	getDoc(configDocRef).then((data) => setSurveyTitle(data.data().surveyTitle))

	const navigate = useNavigate();

	const submitOK = () => {
		navigate("/thanks");
	};

	const errorInSubmit = (err) => {
		console.log("couldn't submit the form:", err);
		setErrorMsg(`Could not submit the answer, please try again! Error: ${err}`)
		setErrorOpen(true);
	};

	const sendSurvey = async () => {
		if (score) {
			try {
				await addDoc(reviewsCollectionRef, {
					score: score,
					comment: comment,
					createdAt: new Date()
				});
				submitOK();
			} catch (error) {
				errorInSubmit();
			}
		}
	};

	const labelsStars = [...Array(10).keys()].map((x) => x + 1);

	const closeAlert = () => {
		setErrorOpen(false)
	}

	return (
		<div id="surveyForm">

			<Snackbar
				open={errorOpen}
				anchorOrigin={{vertical: "top", horizontal: "center"}}
				onClose={closeAlert}
			>
				<Alert severity="error">{ errorMsg }</Alert>
			</Snackbar>

			<h2>{ surveyTitle }</h2>

			<p>(1 = Not Likely, 10 = Very Likely)</p>

			<FormControl
				margin="dense"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					align="center"
					sx={{
						"& > legend": { mt: 2 },
					}}
				>

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
						emptyLabelText="not rated yet"
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

			</FormControl>
		</div>

	);
};

export default MuiForm;
