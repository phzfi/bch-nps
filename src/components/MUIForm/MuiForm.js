import React, { useState } from "react";
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
} from "@mui/material";


function range(start, end) {
	return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
const radioArray = range(1, 10);

const MuiForm = () => {
	const [open, setOpen] = useState(true);
	const [score, setScore] = useState(undefined);

	const handleClickOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	console.log('score now', score);

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
			Open form dialog
			</Button>
			<Dialog open={open} onClose={handleClose} maxWidth="xl"  >
			
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
							style={{flexWrap: "wrap", flexBasis: 0}}>
							{radioArray.map((radio, i) => (
								<FormControlLabel key={i}
								value={radio}
								control={<Radio size="small" 
								sx={{'& .MuiSvgIcon-root': {
									margin: 0, padding: 0}}}
								
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
							minRows={5}/>
	
						<Button
							type="submit"
							variant="contained"
							color="primary"
							style={{minWidth: '200px', margin: "1rem 0 0 0", alignSelf: "center"}}
							onClick={handleClose}>
								Submit
						</Button>

					</FormControl>

				</DialogContent>
	
			</Dialog>
		</div>
	);
};

export default MuiForm;
