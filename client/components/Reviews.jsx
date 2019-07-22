import React, { Component } from 'react';
import Review from './Review.jsx';
import User from './User.jsx';

const Reviews = (props) => (
  <ul className="list list-bordered">
    {props.reviews.map((review) => (
    <li key={review._id}>
      <div className="user-with-review">
        {/* < User user={review.uId} /> */}
        < Review review={review} />
      </div>
    </li>
    ))}
  </ul>
);

export default Reviews;