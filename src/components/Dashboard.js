import { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [reviews, setReviews] = useState([]);
	const [sixMonthsReviews, setSixMonthsReviews] = useState([]);
	const [sevenDayReviews, setSevenDaysReviews] = useState([]);
	const [psSixMonths, setPsSixMonths] = useState(undefined);
	const [psSevenDays, setPsSevenDays] = useState(undefined);

	useEffect(() => {
		getReviews();
	}, []);

	useEffect(() => {
		getSixMonthsReviews();
		getSevenDaysReviews();
		getPsSevenDays();
		getPsSixMonths();
	}, [
		loading,
		reviews,
		sixMonthsReviews,
		sevenDayReviews,
		psSevenDays,
		psSixMonths,
	]);

	const getReviews = () => {
		axios
			.get("http://localhost:8080/api/reviews")
			.then((res) => {
				setReviews(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	};

	const getSixMonthsReviews = () => {
		const sixMonthsAgo = new Date();
		sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 120);
		setSixMonthsReviews(
			reviews?.filter((review) => Date.parse(review.createdAt) > sixMonthsAgo)
		);
	};

	const getSevenDaysReviews = () => {
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
		setSevenDaysReviews(
			reviews?.filter((review) => Date.parse(review.createdAt) > sevenDaysAgo)
		);
	};

	const getPsSevenDays = () => {
		let respondants = sevenDayReviews.length;
		let promoters = 0;
		let detractors = 0;
		for (let review of reviews) {
			if (review.score > 8) {
				promoters += 1;
			}
			if (review.score < 7) {
				detractors += 1;
			}
		}
		if (respondants) {
			setPsSevenDays(((promoters - detractors) / respondants) * 100);
		}
	};

	const getPsSixMonths = () => {
		let respondants = sixMonthsReviews.length;
		let promoters = 0;
		let detractors = 0;
		for (let review of reviews) {
			if (review.score > 8) {
				promoters += 1;
			}
			if (review.score < 7) {
				detractors += 1;
			}
		}
		if (respondants) {
			setPsSixMonths(((promoters - detractors) / respondants) * 100);
		}
	};

	const data = [
		{
			id: "Promoters",
			label: "Promoters",
			value: 56,
			color: "#3AC92E",
		},
		{
			id: "Passives",
			label: "Passives",
			value: 28,
			color: "#F7B055",
		},
		{
			id: "Detractors",
			label: "Detractors",
			value: 12,
			color: "#ED6930",
		},
	];

	const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
		let total = 0;
		dataWithArc.forEach((datum) => {
			total += datum.value;
		});
		return (
			<text
				x={total > 0 ? centerX : centerX - 8}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize: "3rem",
					fontWeight: 500,
					fill: "#fff",
				}}
			>
				{total}
			</text>
		);
	};

	return (
		<div>
			{/* <div className="score-box">
				{loading && <h1>Loading promoter scores...</h1>}
				<h1>PS of last 6 months: </h1>
				{psSixMonths && (
					<div className="score">
						{(Math.round(psSixMonths * 100) / 100).toFixed(1)}
					</div>
				)}
				<h1>PS of last 7 days: </h1>
				{!loading && (
					<div className="score">
						{(Math.round(psSevenDays * 100) / 100).toFixed(1)}
					</div>
				)}
			</div> */}
			<div className="pie-wrapper">
				<h2>Promoter Score</h2>
				<ResponsivePie
					data={data}
					margin={{ top: 40, right: 60, bottom: 100, left: 60 }}
					innerRadius={0.7}
					padAngle={2}
					cornerRadius={3}
					activeOuterRadiusOffset={8}
					borderWidth={1}
					colors={{ datum: "data.color" }}
					borderColor={{ from: "color", modifiers: [["darker", 2]] }}
					enableArcLabels={false}
					arcLinkLabel={(d) => `${d.value} ${d.id}`}
					arcLinkLabelsSkipAngle={15}
					arcLinkLabelsTextColor="#FFF"
					arcLinkLabelsThickness={4}
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
							itemHeight: 18,
							itemTextColor: "#FFF",
							itemDirection: "left-to-right",
							itemOpacity: 1,
							symbolSize: 20,
							symbolShape: "circle",
						},
					]}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
