import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './components/Reviews.jsx';
import Search from './components/Search.jsx';


const ReviewsService = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/reviews/business/${props.bizId}`)
    .then(({data}) => setReviews(data.reviews));
  },[]);

  return(
    <div className="yelp-font">
      < Search bizName="Jang Guem Tofu and BBQ" />
      < Reviews reviews={reviews} bizName="Jang Guem Tofu and BBQ"/>
    </div>
  )
}

ReactDOM.render(<ReviewsService bizId={7} /> ,document.getElementById('ReviewsService'));