import React from "react";
import "./Review.css";

const Review = ({ reviews }) => {
	const sortedReviews = () => {
		return reviews.sort((a, b) => {
			const bDate = new Date(b.createdAt);
			const aDate = new Date(a.createdAt);
			return bDate - aDate;
		});
	};

	return (
		<div className="reviews">
			<h2>
				Reviews <span>({reviews.length})</span>
			</h2>
			<div className="container">
				{sortedReviews()
					.filter((review) => review.comment)
					.map((review) => {
						const reviewDate = new Date(review.createdAt).toLocaleDateString();
						return (
							<div key={review.id} className="review-single">
								<div className="rate-group">
									<p className="rate">{review.score}</p>
									<div className="star"></div>
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
