import React, { useState, useEffect } from 'react';
import * as Icon from './images/Icons.jsx'
import axios from 'axios';

const User = (props) => {
  const [userInfo, setUser] = useState({});

  useEffect(() => {
    let body = { params: { uIds: [props.user]} };
    axios.get('/users/', body)
    .then(({data}) => setUser(data[0]));
  });
  let {username, city, state, friends, photo} = userInfo;


  return (
  <div className="user-wrapper">
    <div className="media-block">
      <div className="media-avatar">
        <img className="photo-box-img" alt={username} height="60" width="60" src={photo}></img>
      </div>
      <div className="media-story">
        <div className="username"> {username} </div>
        <div className="location"> {`${city}, ${state}`} </div>
      </div>
    </div>
  </div>
)};

export default User;