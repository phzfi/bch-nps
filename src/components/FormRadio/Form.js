import React, { useState } from "react";

const Form = () => {
	const [score, setScore] = useState("");
	const [comment, setComment] = useState("");

	const scoreHandler = (e) => {
		setScore(e.target.value);
	};

	const commentHandler = (e) => {
		setComment(e.target.value.trim());
	};

	// console.log(score);
	// console.log(comment);

	return (
		<div className="form-popup">
			<form>
				<h1>How likely are you to recommend us as an employer?</h1>
				<p>On a scale of 1-10 (1=not likely, 10=very likely)</p>
				<div className="radio-buttons">
					{Array(10)
						.fill(1)
						.map((val, i) => val + i)
						.map((item) => (
							<div key={item} className="radio-wrapper">
								<label htmlFor={item}>{item}</label>
								<input
									onClick={scoreHandler}
									type="radio"
									name="score"
									id={item}
									value={item}
								/>
							</div>
						))}
				</div>
				<div className="textarea-wrapper">
					<label htmlFor="comment">
						Please provide any comments to help explain your selection.
					</label>
					<textarea
						id="comment"
						rows="6"
						cols="40"
						onChange={commentHandler}
					></textarea>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Form;
