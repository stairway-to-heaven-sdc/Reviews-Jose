import React from 'react';

const Review = (props) => {
  let { review } = props;
  let date = (new Date(review.createdAt).toLocaleString()).split(',')[0];
  return (
  <div className="review-content">
    <div className="rating-date"> Rating {review.rating} {date} </div>
    <p>{review.reviewText}</p>
  </div>
  // <div className="review-footer">
  // </div>
)};

export default Review;