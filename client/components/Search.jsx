import React from 'react';
import Compose from './Compose.jsx';

const Search = (props) => (
  <div className="top-row">
    <div className="Section1-Questions">
      <h2 className="header">Ask the Community</h2>
      <div className="text">Yelp users haven't asked any questions yet about <b>{props.bizName}.</b></div>
      <div className="question">Ask a Question</div>
    </div>
    <div className="Section2-Reccommended">
      <h2 className="header">Recommended Reviews <b>for {props.bizName}</b></h2>
    </div>
  </div>
);

export default Search;