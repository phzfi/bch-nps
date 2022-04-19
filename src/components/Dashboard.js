import { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css';


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
    }, [loading, reviews, sixMonthsReviews, sevenDayReviews, psSevenDays, psSixMonths]);

    const getReviews = () => {
        axios
        .get("http://localhost:8080/api/reviews")
        .then(res => {
            setReviews(res.data);
            setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    const getSixMonthsReviews = () => {
        const sixMonthsAgo = new Date();
		sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 120);
        setSixMonthsReviews(reviews?.filter(review => Date.parse(review.createdAt) > sixMonthsAgo));
    }

    const getSevenDaysReviews = () => {
        const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        setSevenDaysReviews(reviews?.filter(review => Date.parse(review.createdAt) > sevenDaysAgo));
    }

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
        if (respondants){
            setPsSevenDays((promoters - detractors) / respondants * 100);
        }
    }

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
        if (respondants){
            setPsSixMonths((promoters - detractors) / respondants * 100);
        }
    }

    return (
        <div className="score-box">
            {loading && <h1>Loading promoter scores...</h1>}
            <h1>PS of last 6 months: </h1>
            {psSixMonths && <div className="score">{(Math.round(psSixMonths * 100) / 100).toFixed(1)}</div>}
            <h1>PS of last 7 days: </h1>
            {!loading && <div className="score">{(Math.round(psSevenDays * 100) / 100).toFixed(1)}</div>}
        </div>
    );
  }
  
  export default Dashboard;