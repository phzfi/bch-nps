import React, { useState } from "react";

const Form = () => {
	const [score, setScore] = useState("");
	const [count, setCount] = useState(0);

	const changeHandler = (e) => {
		e.preventDefault();
		setScore(e.target.value);
		setCount(1);
		if (count === 1) e.target.style.backgroundColor = "#0000EE";
	};

	return (
		<form>
			<h1>How likely are you to recommend us as an employer?</h1>
			<p>On a scale of 1-10 (1=not likely, 10=very likely)</p>
			<div className="buttons">
				{Array(10)
					.fill(1)
					.map((val, i) => val + i)
					.map((item) => (
						<button key={item} onClick={changeHandler} value={item}>
							{item}
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
