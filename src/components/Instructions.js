import ReactSyntaxHighlighter from "react-syntax-highlighter";
import "./Instructions.css";

const Instructions = () => {
	const embedCode = `<!-- EMBEDDABLE PROMOTER SCORE SURVEY -->
<div id="psForm"></div>
<script 
    src="https://prismatic-stardust-51d9cb.netlify.app/static/js/main.6b2b7247.js"
    type="text/javascript"
></script>
<!-- EMBEDDABLE PROMOTER SCORE SURVEY -->`;
	return (
		<div className="embed-container">
			<div className="embed-card">
				<h1>How to embed the questionnaire form?</h1>
				<p>Copy and insert the HTML code below to your application.</p>
				<div className="code-block">
					<ReactSyntaxHighlighter
						language="html"
						showLineNumbers={true}
						customStyle={{ margin: "3rem" }}
					>
						{embedCode}
					</ReactSyntaxHighlighter>
				</div>
			</div>
		</div>
	);
};

export default Instructions;
