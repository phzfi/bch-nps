import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import Reviews from "./Reviews";
import Volume from "./Volume";
import Pie from "./Pie";
import Trend from "./Trend";

const daysAverageInMonth = 30.4;
const weeksAverageInMonth = 5;

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
	const [months, setMonths] = useState(6);
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
		// if selected time span < 3 months --> use days, else use weeks
		for (let i= ((months < 3) ? daysAverageInMonth :  weeksAverageInMonth) * months; i > 0; i--) {
			const curdate = date;
			dates.push({
				date: curdate.toDateString(),
				weekStart: 0,
				promoters: 0,
				passives: 0,
				detractors: 0,
				responses: 0,
				score: 0
			});
			date.setDate(date.getDate() - ((months < 3) ? 1 : 6));
		}

		if (dates.length === 31) {
			for (let day of dates) {
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
			return dates.reverse();
		} else {
			for (let weekEnd of dates) {
				// look for reviews of the week starting from given day
				for (let review of data) {
					const weekStart = new Date((weekEnd.date));
					weekStart.setDate(weekStart.getDate() - 6);
					weekEnd.weekStart = weekStart.toDateString();
					const start = weekStart.getTime();
					const end = new Date(weekEnd.date).getTime();
					const reviewTime = new Date(review.createdAt).getTime();
					if (reviewTime <= end && reviewTime >= start) {
						if (review.score > 8) {
							weekEnd.promoters += 1;
						} else if (review.score < 7) {
							weekEnd.detractors += 1;
						} else {
							weekEnd.passives += 1;
						}
					}
				}
			}
			return dates.reverse();
		}
	};

	// VOLUME DATA

	const volumeData = volume.map(timeSpan => {
		// if days -> "Thu Apr 19 2022" -> "Apr 19 22"
		// if weeks -> "Thu Apr 19 2022Mon Apr 26 2022" ->"Apr 19 - Apr 26"
		const timeLabel = months < 3 ? 
							`${timeSpan.date}`.replace(/^\D+\s(\D+)\s(\d+)\s\d{2}(\d{2})/g, "$1 $2") :
							`${timeSpan.weekStart}${timeSpan.date}`.replace(/^\D+\s(\D+)\s(\d+)\s\d{2}(\d{2})\D+\s(\D+)\s(\d+)\s\d{2}(\d{2})$/, "$1 $2 - $4 $5"); 
		return {
			timeSpan: `${timeLabel}`,
			detractors: `${timeSpan.detractors}`,
			detractorsColor: "#ED6930",
			passives: `${timeSpan.passives}`,
			passivesColor: "#F7B055",
			promoters: `${timeSpan.promoters}`,
			promotersColor: "#3AC92E",
		};
	});

	// TREND DATA

	const calcTrendData = (data) => {
		const trendData = [];
		const dates = [];
		let date = new Date();
		// if selected time span < 3 months --> use days, else use weeks
		for (let i= ((months < 3) ? daysAverageInMonth :  weeksAverageInMonth) * months; i > 0; i--) {
			const curdate = date;
			dates.push({
				date: curdate.toDateString(),
				promoters: 0,
				passives: 0,
				detractors: 0,
				trendTilDay: -100,
			});
			date.setDate(date.getDate() - ((months < 3) ? 1 : 6));
		}
		console.log(dates.length);
		if (dates.length === 31) {
			for (let day of dates) {
				for (let review of data) {
					const reviewDay = new Date(review.createdAt).getTime();
					if (+reviewDay <= new Date(day.date).getTime()) {
						if (review.score > 8) {
							day.promoters += 1;
						} else if (review.score < 7) {
							day.detractors += 1;
						} else {
							day.passives += 1;
						}
					}
				}

				let total = day.promoters + day.passives + day.detractors;
				day.trendTilDay = isNaN(((day.promoters - day.detractors) / total) * 100) ? -100  : (((day.promoters - day.detractors) / total) * 100);
			}
			dates.reverse().map(item => {
					const trimmedDate = `${item.date}`.replace(
						/\D+\s(\D+)\s(\d+)\s\d+/g,
						"$1 $2"
					);
					
					trendData.push({
						x: `${trimmedDate}`,
						y: isNaN(item.trendTilDay) ? -100 : item.trendTilDay,
					});
			});
			return trendData;

		} else {
			for (let weekEnd of dates) {
				for (let review of data) {
					const end = new Date(weekEnd.date).getTime();
					const reviewTime = new Date(review.createdAt).getTime();
					if (+reviewTime <= end) {
						if (review.score > 8) {
							weekEnd.promoters += 1;
						} else if (review.score < 7) {
							weekEnd.detractors += 1;
						} else {
							weekEnd.passives += 1;
						}
					}
				}
				let total = weekEnd.promoters + weekEnd.passives + weekEnd.detractors;
				weekEnd.trendTilDay = isNaN(((weekEnd.promoters - weekEnd.detractors) / total) * 100) ? -100 : (((weekEnd.promoters - weekEnd.detractors) / total) * 100);
			}
			dates.reverse().map((item) => {
					const trimmedDate = `${item.date}`.replace(
						/\D+\s(\D+)\s(\d+)\s\d+/g,
						"$1 $2"
					);
					trendData.push({
						x: `${trimmedDate}`,
						y: isNaN(item.trendTilDay) ? -100 : item.trendTilDay,
					});
			});
			return trendData;
		};
	}

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
				<h2>Promoter Score Trend</h2>
				<Trend data={trendData} />
			</div>
			<div className="volume-wrapper">
				<h2>Response Volume</h2>
				<Volume data={volumeData} />
			</div>
		</div>
	);
};

export default Dashboard;
