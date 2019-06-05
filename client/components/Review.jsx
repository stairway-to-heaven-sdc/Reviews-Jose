import React from 'react';
import * as Icon from './images/Icons.jsx'

const Review = (props) => {
  let { review } = props;
  let rating = `i-stars i-stars--${review.rating * 10}`;
  let date = (new Date(review.createdAt).toLocaleString()).split(',')[0];
  return (
  <div className="review-wrapper yelp-font">
    <div className="review-content">
      <div className={rating}></div><span className="rating-date"> {date} </span>
      { review.checkin === true &&
      <div className="checkin">
        <span className="icon-user-review" style={{width: '18px', height: '18px'}}> <Icon.checkin /> </span>
        <span > 1 check-in</span>
      </div>
      }
      <p className="text">{review.reviewText}</p>
    </div>
    <div className="review-footer">
      <p className="voting-intro">Was this review ...?</p>
      <ul className="voting" >
        <li className="vote-item">
          <span className="icon-user-review" style={{width: '18px', height: '18px'}}> <Icon.useful /> </span>
          <span> Useful</span>
        </li>
        <li className="vote-item">
          <span className="icon-user-review" style={{width: '18px', height: '18px'}}> <Icon.funny /> </span>
          <span> Funny</span>
        </li>
        <li className="vote-item">
          <span className="icon-user-review" style={{width: '18px', height: '18px'}}> <Icon.cool /> </span>
          <span> Cool</span>
        </li>
      </ul>
    </div>
  </div>
)};

export default Review;