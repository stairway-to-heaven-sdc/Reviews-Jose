import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Compose from './Compose.jsx';
import Review from './Review.jsx';
import User from './User.jsx';

const Reviews = (props) => (
  <ul className="reviews">
    <li> < Compose /> </li>
    {props.reviews.map((review) => (
    <li key={review._id}>
      < User user={review.uId} />
      < Review review={review} />
    </li>
    ))}
  </ul>
);

export default Reviews;