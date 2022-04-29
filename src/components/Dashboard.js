import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import Reviews from "./Reviews";
import Volume from "./Volume";
import Pie from "./Pie";
import Trend from "./Trend";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [reviews, setReviews] = useState([]);
	const [promoterScore, setPromoterScore] = useState({
		score: 0,
		promoters: 0,
		passives: 0,
		detractors: 0,
	});
	const [volume, setVolume] = useState([]);
	const [months, setMonths] = useState(1);
	const [trend, setTrend] = useState([]);

	useEffect(() => {
		getReviews();
	}, [months]);

	const getReviews = () => {
		axios
			.get("http://localhost:8080/api/reviews")
			.then((res) => {
				setReviews(res.data);
				setPromoterScore(calcPromoterScore(res.data));
				setLoading(false);
				setVolume(getVolume(res.data));
				setTrend(calcTrendData(res.data));
			})
			.catch((err) => console.log(err));
	};

	const calcPromoterScore = (data) => {
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
	};

	const handleTimeSelection = (e) => {
		setMonths(e.target.value);
		const date = new Date();
		date.setMonth(date.getMonth() - e.target.value);
		const filteredReviews = reviews?.filter(
			(review) => Date.parse(review.createdAt) > date
		);
		setPromoterScore(calcPromoterScore(filteredReviews));
	};

	// PIE CHART DATA

	const pieData = [
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

	// VOLUME

	const getVolume = (data) => {
		const dates = [];
		let date = new Date();
		// consider month as 31 days
		for (let i = 31 * months; i > 0; i--) {
			const curdate = date;
			// toDateString() taking only the date, no time --> "Thu Apr 19 2022"
			dates.push({
				date: curdate.toDateString(),
				promoters: 0,
				passives: 0,
				detractors: 0,
			});
			date.setDate(date.getDate() - 1);
		}

		for (let day of dates.reverse()) {
			// look for reviews of the given day
			for (let review of data) {
				const reviewDay = new Date(review.createdAt).toDateString();
				if (reviewDay === day.date) {
					if (review.score > 8) {
						day.promoters += 1;
					} else if (review.score < 7) {
						day.detractors += 1;
					} else {
						day.passives += 1;
					}
				}
			}
		}
		return dates;
	};

	// VOLUME DATA

	const volumeData = volume.map((day) => {
		const week = `${day.date}`.replace(/\D+\s(\D+)\s(\d+)\s\d+/g, "$1 $2"); // "Thu Apr 19 2022"
		return {
			week: `${week}`,
			detractors: `${day.detractors}`,
			detractorsColor: "#ED6930",
			passives: `${day.passives}`,
			passivesColor: "#F7B055",
			promoters: `${day.promoters}`,
			promotersColor: "#3AC92E",
		};
	});

	// TREND DATA

	const calcTrendData = (data) => {
		const trendData = [];
		const dates = [];
		let date = new Date();
		// consider month as 31 days
		for (let i = 31 * months; i > 0; i--) {
			const curdate = date;
			// toDateString() taking only the date, no time --> "Thu Apr 19 2022"
			dates.push({
				date: curdate.toDateString(),
				promoters: 0,
				passives: 0,
				detractors: 0,
				trendTilDay: -100,
			});
			date.setDate(date.getDate() - 1);
		}

		for (let trend of dates.reverse()) {
			for (let review of data) {
				const reviewDay = new Date(review.createdAt).getTime();
				if (+reviewDay <= new Date(trend.date).getTime()) {
					if (review.score > 8) {
						trend.promoters += 1;
					} else if (review.score < 7) {
						trend.detractors += 1;
					} else {
						trend.passives += 1;
					}
				}
			}
			let total = trend.promoters + trend.passives + trend.detractors;
			trend.trendTilDay = ((trend.promoters - trend.detractors) / total) * 100;
			// console.log(`trend until ${trend.date}: ${trend.trendTilDay}`);
		}
		dates.map((item) => {
			trendData.push({
				x: `${item.date}`,
				y: isNaN(item.trendTilDay) ? -100 : item.trendTilDay,
			});
		});
		return trendData;
	};

	const trendData = [
		{
			id: "Score",
			color: "#2765E3",
			data: trend,
		},
	];

	return (
		<div className="dashboard">
			<div className="pie-wrapper">
				<h2>Promoter Score</h2>
				<select defaultValue="6" onChange={handleTimeSelection}>
					<option value="1">Rolling 1 month</option>
					<option value="3">Rolling 3 months</option>
					<option value="6">Rolling 6 months</option>
					<option value="12">Rolling 1 year</option>
				</select>
				{!loading && <Pie data={pieData} promoterScore={promoterScore} />}
			</div>
			<Reviews reviews={reviews} />
			<div className="trend-wrapper">
				<Trend data={trendData} />
			</div>
			<div className="volume-wrapper">{<Volume data={volumeData} />}</div>
		</div>
	);
};

export default Dashboard;
