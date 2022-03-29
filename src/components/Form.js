import React, { useState } from "react";


function range(start, end) {
	return Array(end - start + 1).fill().map((_, idx) => ({
		score: start + idx,
		clicked: false}
	))
}
	
const radioArray = range(1, 10);

const Form = () => {
	const [score, setScore] = useState("");
	const [buttons, setButtons] = useState(radioArray);

	const clickHandler = (e) => {
		e.preventDefault();
		setButtons(prevState => prevState.map(button =>
			button.score == e.target.textContent ? {...button, clicked: true} : {...button, clicked: false})
		);
		setScore(e.target.textContent);
	};

	return (
		<form>
			<h1>How likely are you to recommend us as an employer?</h1>
			<p>On a scale of 1-10 (1=not likely, 10=very likely)</p>
			<div className="buttons">
				{buttons.map((item) => (
						<button key={item.score} id={item.clicked ? "active" : ""} onClick={clickHandler} value={item.score}>
							{item.score}
						</button>
					))}
			</div>
			<div className="textarea-wrapper">
				<label htmlFor="comment">
					Please provide any comments to help explain your selection.
				</label>
				<textarea id="comment" rows="6" cols="40"></textarea>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default Form;
