import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return(
      <h1>See ya Space Cowboy!</h1>
    )
  }
}

ReactDOM.render(<App /> ,document.getElementById('app'));