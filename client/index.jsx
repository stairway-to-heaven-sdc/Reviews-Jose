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
      <div>
        <h1>See ya Space Cowboy!</h1>
        < Search />
        < Reviews reviews={reviews} />
      </div>
    )
  }
}

ReactDOM.render(<ReviewsService /> ,document.getElementById('app'));