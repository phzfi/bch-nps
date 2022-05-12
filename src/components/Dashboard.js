import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./Dashboard.css";
import Reviews from "./Reviews";
import Volume from "./Volume";
import Pie from "./Pie";
import Trend from "./Trend";

const daysAverageInMonth = 30.4;
const lastTimeSelection = "-npSurveyTimeSelection-";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [reviews, setReviews] = useState([]);
	const [filteredReviews, setFilteredReviews] = useState([]);
	const [promoterScore, setPromoterScore] = useState({
		score: 0,
		promoters: 0,
		passives: 0,
		detractors: 0,
	});
	const [volume, setVolume] = useState([]);
	const [months, setMonths] = useState(
		localStorage.getItem(lastTimeSelection)
			? localStorage.getItem(lastTimeSelection)
			: 6
	);
	const [trend, setTrend] = useState([]);
	const [clicked, setClicked] = useState("");

	useEffect(() => {
		getReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getReviews = async () => {
		const reviewsCollectionRef = collection(db, "reviews");
		const data = await getDocs(reviewsCollectionRef);
		const reviewData = data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		setReviews(reviewData);
		setLoading(false);
	};

	useEffect(() => {
		if (filteredReviews.length === 0) setFilteredReviews(reviews);
		setPromoterScore(calcPromoterScore(reviews));
		setVolume(getVolume(reviews));
		setTrend(calcTrendData(reviews));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reviews, months, clicked]);

	const calcPromoterScore = (data) => {
		let date = new Date();
		for (let i = daysAverageInMonth * months; i > 0; i--) {
			date.setDate(date.getDate() - 1);
		}
		const filteredReviews = data.filter(
			(review) => Date.parse(review.createdAt.toDate()) >= date
		);
		let respondants = filteredReviews.length;
		let promoters = 0;
		let passives = 0;
		let detractors = 0;
		for (let review of filteredReviews) {
			if (review.score > 8) {
				promoters += 1;
			} else if (review.score < 7) {
				detractors += 1;
			} else {
				passives += 1;
			}
		}
		setFilteredReviews(filteredReviews);
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
		localStorage.setItem(lastTimeSelection, e.target.value);
		const date = new Date();
		date.setMonth(date.getMonth() - e.target.value);
		const filteredReviews = reviews?.filter(
			(review) => Date.parse(review.createdAt.toDate()) > date
		);
		setPromoterScore(calcPromoterScore(filteredReviews));
		setFilteredReviews(filteredReviews);
	};

	// PIE CHART DATA

	const pieData = [
		{
			id: "Promoters",
			label: "Promoters",
			value: promoterScore?.promoters,
			color: "#3AC92E",
		},
		{
			id: "Passives",
			label: "Passives",
			value: promoterScore?.passives,
			color: "#F7B055",
		},
		{
			id: "Detractors",
			label: "Detractors",
			value: promoterScore?.detractors,
			color: "#ED6930",
		},
	];

	// VOLUME

	const getVolume = (data) => {
		const dates = [];
		let date = new Date();
		for (let i = daysAverageInMonth * months; i > 0; i--) {
			const curdate = date;
			dates.push({
				date: curdate.toDateString(),
				weekStart: 0,
				promoters: 0,
				passives: 0,
				detractors: 0,
				responses: 0,
				score: 0,
			});
			date.setDate(date.getDate() - 1);
		}

		for (let day of dates) {
			// look for reviews of the given day
			for (let review of data) {
				const reviewDay = new Date(review.createdAt.toDate()).toDateString();
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
	};

	// VOLUME DATA

	const volumeData = volume.map((timeSpan) => {
		const timeLabel = `${timeSpan.date}`.replace(
			/^\D+\s(\D+)\s(\d+)\s\d{2}(\d{2})/g,
			"$1 $2"
		);

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
		for (let i = daysAverageInMonth * months; i > 0; i--) {
			const curdate = date;
			dates.push({
				date: curdate.toDateString(),
				promoters: 0,
				passives: 0,
				detractors: 0,
				trendTilDay: -100,
			});
			date.setDate(date.getDate() - 1);
		}

		for (let day of dates) {
			for (let review of data) {
				const reviewDay = new Date(review.createdAt.toDate()).getTime();
				if (
					reviewDay <= new Date(day.date).getTime() &&
					reviewDay > new Date(dates[dates.length - 1].date).getTime()
				) {
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
			day.trendTilDay = ((day.promoters - day.detractors) / total) * 100;
		}
		/* eslint-disable */
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
		/* eslint-disable */
	};

	const trendData = [
		{
			id: "Score",
			color: "#F7B055",
			data: trend,
		},
	];

	return (
		<div className="dashboard">
			<div className="pie-wrapper">
				<h2>Promoter Score</h2>
				<select defaultValue={months} onChange={handleTimeSelection}>
					<option value="1">Rolling 1 month</option>
					<option value="3">Rolling 3 months</option>
					<option value="6">Rolling 6 months</option>
					<option value="12">Rolling 1 year</option>
				</select>
				<h3 onClick={() => setClicked("")}>
					Responses<span>{filteredReviews.length}</span>
				</h3>
				{!loading && (
					<Pie
						data={pieData}
						promoterScore={promoterScore}
						setClicked={setClicked}
					/>
				)}
			</div>
			<Reviews reviews={filteredReviews} clicked={clicked} />
			<div className="trend-wrapper">
				<h2>Promoter Score Trend</h2>
				<Trend data={trendData} months={months} />
			</div>
			<div className="volume-wrapper">
				<h2>Response Volume</h2>
				<Volume data={volumeData} months={months} />
			</div>
		</div>
	);
};

export default Dashboard;
