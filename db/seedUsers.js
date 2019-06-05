let faker = require('faker');
let axios = require('axios');
let _ = require('lodash');
let { saveUsers } = require('./dbUsers');
require('dotenv').config();

const seedUsers = () => {
  // return new Promise((resolve, reject) => {
  let config = { headers: { 'X-API-KEY': process.env.UI_FACES_API } };
  axios.get('https://uifaces.co/api?limit=100', config)
  .then(({data}) => {
    let userList = createUsers(data);
    saveUsers(userList)
    .then((users) => console.log(users))
  })
  .catch((err) => console.log(err));
  // });
};

const createUsers = (data) => {
  let users = [];
  let count = 1;
  let eliteStatus = [`Elite'19`, '', ''];
    for (let key of data) {
      let user = {
        uId: count,
        username: key.name,
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        photo: key.photo,
        elite: _.sample(eliteStatus),
      };
      users.push(user);
      count++;
    }
  return users;
};

seedUsers();