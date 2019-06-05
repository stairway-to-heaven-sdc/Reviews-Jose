import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './components/Reviews.jsx';
import Search from './components/Search.jsx';

class ReviewsService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      mockbiz: 7,
    };
  }

  componentDidMount () {
    let url = `/reviews/business/${this.state.mockbiz}`;
    axios.get(url)
    .then(({data}) => this.setState({ reviews: data.reviews }));
  }

  render () {
    let { reviews } = this.state;
    return(
      <div id="super-container" class="content-container">
        <div className="column column-alpha">
          {/* ^^^Code above should be in Proxy Server */}

          <div className="yelp-font">
            < Search bizName="Jang Guem Tofu and BBQ" />
            < Reviews reviews={reviews} bizName="Jang Guem Tofu and BBQ"/>
          </div>

          {/* ^^^Code below should be in Proxy Server */}
        </div>
        <div className="column column-beta"></div>
      </div>
    )
  }
}

ReactDOM.render(<ReviewsService /> ,document.getElementById('ReviewsService'));