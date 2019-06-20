import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Compose from './Compose.jsx';
import Review from './Review.jsx';
import User from './User.jsx';

const Reviews = (props) => (
  <ul className="list list-bordered">
    <li key={1001}> < Compose bizName={props.biz.bizName} /> </li>
    {props.reviews.map((review) => (
    <li key={review._id}>
      <div className="user-with-review">
        < User user={review.uId} />
        < Review review={review} />
      </div>
    </li>
    ))}
  </ul>
);

export default Reviews;