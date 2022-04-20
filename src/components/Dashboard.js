import { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [reviews, setReviews] = useState([]);
	const [promoterScore, setPromoterScore] = useState({
		score: 0,
		promoters: 0,
		passives: 0,
		detractors: 0,
	});
	// const [sixMonthsReviews, setSixMonthsReviews] = useState([]);
	// const [sevenDayReviews, setSevenDaysReviews] = useState([]);
	// const [psSixMonths, setPsSixMonths] = useState(undefined);
	// const [psSevenDays, setPsSevenDays] = useState(undefined);

	useEffect(() => {
		getReviews();
	}, []);

	// useEffect(() => {
	// 	getSixMonthsReviews();
	// 	getSevenDaysReviews();
	// 	getPsSevenDays();
	// 	getPsSixMonths();
	// }, [
	// 	loading,
	// 	reviews,
	// 	sixMonthsReviews,
	// 	sevenDayReviews,
	// 	psSevenDays,
	// 	psSixMonths,
	// ]);

	const getReviews = () => {
		axios
			.get("http://localhost:8080/api/reviews")
			.then((res) => {
				setReviews(res.data);
				setPromoterScore(calcPromoterScore(res.data));
				setLoading(false);
			})
			.catch((err) => console.log(err));
	};

	// const getSixMonthsReviews = () => {
	// 	const sixMonthsAgo = new Date();
	// 	sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 120);
	// 	setSixMonthsReviews(
	// 		reviews?.filter((review) => Date.parse(review.createdAt) > sixMonthsAgo)
	// 	);
	// };

	// const getSevenDaysReviews = () => {
	// 	const sevenDaysAgo = new Date();
	// 	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
	// 	setSevenDaysReviews(
	// 		reviews?.filter((review) => Date.parse(review.createdAt) > sevenDaysAgo)
	// 	);
	// };

	// const getPsSevenDays = () => {
	// 	let respondants = sevenDayReviews.length;
	// 	let promoters = 0;
	// 	let detractors = 0;
	// 	for (let review of reviews) {
	// 		if (review.score > 8) {
	// 			promoters += 1;
	// 		}
	// 		if (review.score < 7) {
	// 			detractors += 1;
	// 		}
	// 	}
	// 	if (respondants) {
	// 		setPsSevenDays(((promoters - detractors) / respondants) * 100);
	// 	}
	// };

	// const getPsSixMonths = () => {
	// 	let respondants = sixMonthsReviews.length;
	// 	let promoters = 0;
	// 	let passives = 0;
	// 	let detractors = 0;
	// 	for (let review of reviews) {
	// 		if (review.score > 8) {
	// 			promoters += 1;
	// 		}
	// 		if (review.score < 7) {
	// 			detractors += 1;
	// 		} else {
	// 			passives += 1;
	// 		}
	// 	}
	// 	if (respondants) {
	// 		setPsSixMonths(((promoters - detractors) / respondants) * 100);
	// 		setPsGroups({
	// 			promoters: promoters,
	// 			passives: passives,
	// 			detractors: detractors,
	// 		});
	// 	}
	// };

	function calcPromoterScore(data) {
		let respondants = data.length;
		let promoters = 0;
		let passives = 0;
		let detractors = 0;
		for (let review of data) {
			if (review.score > 8) {
				promoters += 1;
			}
			if (review.score < 7) {
				detractors += 1;
			} else {
				passives += 1;
			}
		}
		if (respondants) {
			return {
				score: ((promoters - detractors) / respondants) * 100,
				promoters: promoters,
				passives: passives,
				detractors: detractors,
			};
		}
	}

	const getPsByTimeSelection = (e) => {
		const date = new Date();
		date.setMonth(date.getMonth() - e.target.value);
		const filteredReviews = reviews?.filter(
			(review) => Date.parse(review.createdAt) > date
		);
		setPromoterScore(calcPromoterScore(filteredReviews));
		console.log(date);
	};

	// CHART DATA

	const data = [
		{
			id: "Promoters",
			label: "Promoters",
			value: promoterScore.promoters,
			color: "#3AC92E",
		},
		{
			id: "Passives",
			label: "Passives",
			value: promoterScore.passives,
			color: "#F7B055",
		},
		{
			id: "Detractors",
			label: "Detractors",
			value: promoterScore.detractors,
			color: "#ED6930",
		},
	];

	const CenteredMetric = ({ centerX, centerY }) => {
		return (
			<text
				x={promoterScore.score >= 0 ? centerX : centerX - 8}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize: "2.5rem",
					fontWeight: 500,
					fill: "#fff",
				}}
			>
				{`${Math.ceil(promoterScore.score)}`}
			</text>
		);
	};

	return (
		<div className="pie-wrapper">
			<h2>Promoter Score</h2>
			<select defaultValue="6" onChange={getPsByTimeSelection}>
				<option value="1">Rolling 1 month</option>
				<option value="2">Rolling 2 months</option>
				<option value="3">Rolling 3 months</option>
				<option value="4">Rolling 4 months</option>
				<option value="5">Rolling 5 months</option>
				<option value="6">Rolling 6 months</option>
			</select>
			{!loading && (
				<ResponsivePie
					data={data}
					margin={{ top: 20, right: 80, bottom: 160, left: 80 }}
					innerRadius={0.7}
					padAngle={2}
					cornerRadius={3}
					activeOuterRadiusOffset={8}
					borderWidth={1}
					colors={{ datum: "data.color" }}
					borderColor={{ from: "color", modifiers: [["darker", 2]] }}
					enableArcLabels={false}
					arcLinkLabel={(d) => `${d.value}`}
					arcLinkLabelsSkipAngle={15}
					arcLinkLabelsTextColor="#FFF"
					arcLinkLabelsThickness={2}
					arcLinkLabelsColor={{ from: "color" }}
					arcLabelsSkipAngle={10}
					arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
					layers={[
						"arcs",
						"arcLabels",
						"arcLinkLabels",
						"legends",
						CenteredMetric,
					]}
					legends={[
						{
							anchor: "bottom",
							direction: "row",
							justify: false,
							translateX: 0,
							translateY: 50,
							itemsSpacing: 4,
							itemWidth: 100,
							itemHeight: 28,
							itemTextColor: "#FFF",
							itemDirection: "top-to-bottom",
							itemOpacity: 1,
							symbolSize: 20,
							symbolShape: "circle",
						},
					]}
				/>
			)}
		</div>
	);
};

export default Dashboard;
