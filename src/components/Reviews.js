import React from "react";
import { useState, useEffect } from "react";
import "./Review.css";
import classNames from "classnames";
import { AiFillStar } from "react-icons/ai";
import { TagCloud } from 'react-tagcloud';
import { customeStopwords } from './stopwords';

const { removeStopwords, eng } = require('stopword');


const Review = ({ reviews, clicked }) => {
	const [words, setWords] = useState(false);

	const sortedReviews = () => {
		const sorted = reviews.sort((a, b) => {
			const bDate = new Date(b.createdAt.toDate());
			const aDate = new Date(a.createdAt.toDate());
			return bDate - aDate;
		});
		if (clicked) {
			if (clicked === "Promoters") {
				return sorted.filter((review) => review.score > 8);
			} else if (clicked === "Passives") {
				return sorted.filter((review) => review.score > 6 && review.score <= 8);
			} else if (clicked === "Detractors") {
				return sorted.filter((review) => review.score <= 6);
			}
		}
		return sorted;
	};

	useEffect(() => {
        setWords(removeStopwords(sortedReviews()
            .filter(review => review.comment)
            .map(review => review.comment.replace(/[.,#!?$%&;:{}=\-_`~()]/g,"").split(/\s+/))
            .flat(), [...eng, ...customeStopwords]));
			// eslint-disable-next-line
    }, [clicked]);

    useEffect(() => {
        getWordsFreq();
		// eslint-disable-next-line
    }, [words, clicked])
      
    const getWordsFreq = () => {
        const data1 = [];
        if (words.length > 0) {
            for (let w of words) {
                if (data1.filter(e => e.value === w).length === 0) {
                    data1.push({value: w, count: 1})
                } else {
                    data1.find(e => e.value === w).count += 1;
                }
            }
        }
        data1.sort((a,b) => b.count - a.count);
        return data1.slice(0, 5);
    }

    const customCloudRenderer = (tag, size, color) => (
        <span
          key={tag.value}
          style={{
            animation: 'blinker 7s linear infinite',
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${size / 20}em`,
            border: `2px solid ${color}`,
            margin: '3px',
            padding: '3px',
            display: 'inline-block',
            color: clicked === "Promoters" ? '#3ac92e'
				: clicked === "Detractors" ? '#ed6930'
				: clicked === "Passives" ? '#f7b055'
				: 'white'
          }}
        >
          {tag.value}
        </span>
    )

	return (
		<div className="reviews">
			<h2>
				Comments{" "}
				<span>
					({sortedReviews().filter((review) => review.comment).length})
				</span>
				{clicked && <TagCloud
                    minSize={12}
                    maxSize={35}
                    tags={getWordsFreq()}
                    colorOptions={{
                        luminosity: 'light',
                        hue: 'blue',
                    }}
                    style={{ width: "90%", textAlign: 'center' }}
                    className="myTagCloud"
                    renderer={customCloudRenderer}
                    disableRandomColor={true}
                />}
			</h2>
			<div className="container">
				{sortedReviews()
					.filter((review) => review.comment)
					.map((review) => {
						const reviewDate = new Date(
							review.createdAt.toDate()
						).toLocaleDateString();
						const starColor = review.score;
						const wrapperClasses = classNames("star", {
							green: starColor > 8,
							yellow: starColor <= 8 && starColor > 6,
							orange: starColor <= 6,
						});
						return (
							<div
								key={review.id}
								className={`review-single ${
									review.score > 8
										? "promoter"
										: review.score <= 8 && review.score > 6
										? "passive"
										: "detractor"
								}`}
							>
								<div className="rate-group">
									<p className="rate">{review.score}</p>
									<AiFillStar className={wrapperClasses} />
								</div>
								<p className="comment">{review.comment}</p>
								<p className="date">{reviewDate}</p>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Review;
