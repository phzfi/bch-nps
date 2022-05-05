import React from "react";
import "./Review.css";
import classNames from "classnames";

const Review = ({ reviews, clicked }) => {
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
	// console.log(sortedReviews());
	// console.log(clicked);

	return (
		<div className="reviews">
			<h2>
				Comments <span>({sortedReviews().length})</span>
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
							<div key={review.id} className="review-single">
								<div className="rate-group">
									<p className="rate">{review.score}</p>
									<div className={wrapperClasses}></div>
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
