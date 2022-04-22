import React from "react";
import "./Review.css";

const Review = ({ reviews }) => {
	return (
		<div className="reviews">
			<h2>Reviews</h2>
			<div className="container">
				{reviews
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
