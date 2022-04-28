import { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import "./Dashboard.css";
import Reviews from "./Reviews";
import Volume from './Volume';

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

	useEffect(() => {
		getReviews();
	}, []);  


    useEffect(() => {
        getVolume();
    }, [volume]);

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


    // VOLUME

    const getVolume = () => {
        const dates = [];
        let date = new Date();
        // consider month as 31 days
        for (let i=31*months; i > 0; i--){
            const curdate = date;
            // toDateString() taking only the date, no time --> "Thu Apr 19 2022"
            dates.push({date: curdate.toDateString(), promoters: 0, passives: 0, detractors: 0});
            date.setDate(date.getDate() - 1);
        }

        for (let day of dates.reverse()) {
            // look for reviews of the given day
            for (let review of reviews) {
                const reviewDay = new Date(review.createdAt).toDateString();
                if (reviewDay === day.date) {
                    if (review.score > 8) {
                        day.promoters += 1;
                    }
                    else if (review.score < 7) {
                        day.detractors += 1;
                    }
                    else {
                        day.passives += 1;
                    }
                }
            }
        }
        setVolume(dates)
    }

    // VOLUME DATA

    const volumeData = volume.map(day=> {
        const week =  `${day.date}`.replace(/\D+\s(\D+)\s(\d+)\s\d+/g, '$1 $2'); // "Thu Apr 19 2022"
        return (
            {
                "week": `${week}`,
                "detractors": `${day.detractors}`,
                "detractorsColor": "#ED6930",
                "passives": `${day.passives}`,
                "passivesColor": "#F7B055",
                "promoters": `${day.promoters}`,
                "promotersColor": "#3AC92E"
            })
        }
    )


    return (
		<div className="dashboard">
			<div className="charts">
				<div className="pie-wrapper">
					<h2>Promoter Score</h2>
					<select defaultValue="6" onChange={handleTimeSelection}>
						<option value="1">Rolling 1 month</option>
						<option value="3">Rolling 3 months</option>
						<option value="6">Rolling 6 months</option>
						<option value="12">Rolling 1 year</option>
					</select>
					{!loading && (
						<ResponsivePie
							data={data}
							margin={{ top: 20, right: 50, bottom: 160, left: 50 }}
							innerRadius={0.7}
							padAngle={2}
							cornerRadius={3}
							activeOuterRadiusOffset={10}
							borderWidth={1}
							theme={{ fontSize: "1rem" }}
							colors={{ datum: "data.color" }}
							borderColor={{ from: "color", modifiers: [["darker", 10]] }}
							enableArcLinkLabels={false}
							arcLabelsSkipAngle={10}
							arcLabelsTextColor={{
								from: "color",
								modifiers: [["brighter", 10]],
							}}
							layers={["arcs", "arcLabels", "legends", CenteredMetric]}
							legends={[
								{
									anchor: "bottom",
									direction: "row",
									justify: false,
									translateX: 0,
									translateY: 60,
									itemsSpacing: 1,
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
				<div className="line-wrapper"></div>
                <Reviews reviews={reviews} />
                <div className="volume-wrapper">
                <Volume data={volumeData} />
            </div>
			</div>
		</div>
	);
};

export default Dashboard;
