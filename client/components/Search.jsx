import React, { useState } from 'react';
import Compose from './Compose.jsx';
import * as Icon from './images/Icons.jsx';

const Search = (props) => {
  const [searchTerm, setSearch]= useState('');
  return (
    <div className="top-row">

      <div className="Section1-Questions">
        <h2 className="rheader">Ask the Community</h2>
        <div className="text">Yelp users haven't asked any questions yet about <b>{props.bizName}.</b></div>
        <div className="question">Ask a Question</div>
      </div>

      <div className="Section2-Recommended">
        <h2 className="rheader">Recommended Reviews <b>for {props.bizName}</b></h2>
        <div className="trust-banner">
          <div className="trust-arrange">
            <div className="trust-logo"> <span className="icon"><Icon.yelpSvgLogo /></span> </div>
            <div className="trust-text">
              <span className="legal-text"><b>Your trust is our top concern,</b> so business can't pay to alter or remove their reviews. <a className="trust-highlight">Learn more.</a></span>
            </div>
          </div>
        </div>
      </div>

      <div className="Section3-Search">
        <div className= "arrange-user">

          <div className="arrange_unit arrange_unit--fill">
            <div className="search-bar">
              <form className="arrange-user">
                <div className="arrange_unit arrange_unit--fill">
                  <input className="y-search" value={searchTerm} onChange={e => setSearch(e.target.value)}
                    placeholder='Search within the reviews' type='text'>
                  </input>
                </div>
                <div className="arrange_unit">
                  <button className="y-button" type='submit' value='submit'>
                    <span className="icon-user-review" style={{width: '18px', height: '18px'}}> <Icon.searchglass /> </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="arrange_unit u-nowrap">
            <div className="yelp-sort">
              Sort by Yelp Sort
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Search;