import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './components/Reviews.jsx';
import Search from './components/Search.jsx';
import Compose from './components/Compose.jsx';


const ReviewsService = (props) => {
  const [reviews, setReviews] = useState([]);
  const [biz, setBiz] = useState([]);

  useEffect(() => {
    let bizId = 1;
    console.log(window.location.pathname, `path`)
    if (window.location.pathname !== '/') {
      bizId = window.location.pathname.split('/')[2];
      axios.get(`/reviews/business/${bizId}`)
      .then(({data}) => {
        console.log(data, `from server 20`)
        setReviews(data)
      });
    } else {
      axios.get(`/reviews/business/${bizId}`)
      .then(({data}) => {
        console.log(data, `from server 26`)
        setReviews(data)
      });
    }
    // axios.get(`/biz/${bizId}`)
    // .then(({data}) => setBiz(data));

  },[]);

  return(
    <div id="super-container" className="content-container">
      <div className="column column-alpha">
        {/* ^^^Code above should be in Proxy Server */}

        <div className="yelp-font">
          <Search bizName={biz.bizname} />
          <Compose bizName={biz.bizname} />
          <Reviews reviews={reviews} biz={biz} />
        </div>

        {/* ^^^Code below should be in Proxy Server */}
       </div>
       <div className="column column-beta"></div>
     </div>
  )
}

ReactDOM.render(<ReviewsService /> ,document.getElementById('ReviewsService'));