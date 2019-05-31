import React from 'react';

const Review = (props) => {
  let { review } = props;
  let rating = `i-stars i-stars--${review.rating * 10}`;
  let date = (new Date(review.createdAt).toLocaleString()).split(',')[0];
  return (
  <div className="review-content">
    <div className={rating}></div><span className="rating-date"> {date} </span>
    {/* <div className="rating-date"> {date} </div> */}
    <p>{review.reviewText}</p>
  </div>
  // <div className="review-footer">
  // </div>
)};

export default Review;