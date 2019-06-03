const { saveReview } = require('./db');
const faker = require('faker');
const axios = require('axios');

const seedDb = ( bizCount = 100 ) => {
  let hipsterReviews = [];
  let meatReviews;
  let starReviews = [];
  // Get Hipser Reviews
  axios.get('http://hipsterjesus.com/api/')
  .then(({data}) => {
    // Split paragraph into variable lengths
    let hipsterParagraph = data.text.split(' ');
    let start = 0;
    let end;
    while ( start < hipsterParagraph.length) {
      end = getRandom(start, 5, 8);
      let curr = hipsterParagraph.slice(start, end).join(' ') + '.';
      curr = curr.charAt(0).toUpperCase() + curr.slice(1);
      hipsterReviews.push(curr);
      start = end;
    }
    // Get Bacon Ipsum Reviews
    axios.get('https://baconipsum.com/api/?type=all-meat&paras=25&start-with-lorem=1')
    .then(({data}) => {
      meatReviews = data;
      // Get Reviews by Star Rating
      let args = [];
      for (let star = 1; star <= 5; star++) {
        for(let i = 0; i <= 7; i++) {
          args.push( axios.post(`http://reviews.azurewebsites.net/?stars=${star}`) );
        }
      }
      axios.all(args)
      .then(axios.spread( (...allReviews) => {
        for (let {data} of allReviews) {
          starReviews.push(cleanData(data));
        }

        const fullReviews = [ ...hipsterReviews, ...meatReviews, ...starReviews];
        const len = fullReviews.length;
        const reviewBatch = [];
        const getReview = () => fullReviews[getRandom(0,0,len)];
        for (let i = 1; i <= bizCount; i++) {
          // For loop to generate variable length of reviews
          let randReviews = getRandom(0, 0, 20);
          for (let j = 0; j < randReviews; j++) {
            let date = faker.date.between('2013-01-01', '2019-5-30');
            let review = {
              uId: getRandom(1, 0, 99),
              bId: i,
              rating: getRandom(0, 1, 5),
              reviewText: getReview(),
              checkin: getRandom(0, 0, 2) ? false : true,
              useful: generateUsers(),
              funny: generateUsers(),
              cool: generateUsers(),
              createdAt: date,
              updatedAt: date,
            };
            // Push reviews into promise to be saved into DB at one time
            reviewBatch.push(review);
          }
        }
        saveReview(reviewBatch)
        .then((stat) => console.log(`**Success**\n\n`, stat.slice(0,6), `\n\nReview Total: ${stat.length}\nFirst 7 Reviews Displayed`));
      }))
    })
  })
  .catch((err) => console.log(err))
};
seedDb();

const getRandom = (start, startInc, endInc) => {
  start += startInc;
  let end = start + endInc;
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const cleanData = (data) => data.split(`-Star Review</h2>`)[1].split(`</div>`)[0].split(`<div>`)[1].trim();

const generateUsers = () => {
  let users = [];
  let num = getRandom(0,0,3);
  for (let i = 0; i < num; i++){
    users.push( { username: faker.name.findName(), uId: getRandom(1,0,99) } );
  }
  return users;
};

module.exports.seedDb = seedDb;