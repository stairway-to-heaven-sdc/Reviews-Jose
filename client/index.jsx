import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './components/Reviews.jsx';
import Search from './components/Search.jsx';


const ReviewsService = (props) => {
  const [reviews, setReviews] = useState([]);
  const [biz, setBiz] = useState([]);

  useEffect(() => {
    let bizId = 1;
    if (window.location.pathname !== '/') {
      bizId = window.location.pathname.slice(6);
    }
    axios.get(`/biz/${bizId}`)
    .then(({data}) => setBiz(data));

    axios.get(`/reviews/business/${bizId}`)
    .then(({data}) => setReviews(data.reviews));
  },[]);

  return(
    <div id="super-container" className="content-container">
      <div className="column column-alpha">
        {/* ^^^Code above should be in Proxy Server */}

        <div className="yelp-font">
          < Search bizName={biz.bizname} />
          < Reviews reviews={reviews} biz={biz} />
        </div>

        {/* ^^^Code below should be in Proxy Server */}
       </div>
       <div className="column column-beta"></div>
     </div>
  )
}

ReactDOM.render(<ReviewsService bizId={7} /> ,document.getElementById('ReviewsService'));