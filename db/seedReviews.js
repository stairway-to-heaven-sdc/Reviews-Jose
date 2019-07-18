'use strict';
const  {Review, saveReview}  = require('./mongodbReviews');
const faker = require('faker');
const axios = require('axios');
let _ = require('lodash');


const seedDb = async () => {
  const ratingOptions = [1,2,3,4,5];
  const checkinOptions = [true, false];
  
  let count = 0; 
  let reviews = [];
  for (let i = 0; i <= 1000000; i++) {

    let randReviews = _.random(5);// 3
    for (let j = 0; j < randReviews; j++) {
      let date = faker.date.between('2013-01-01', '2019-6-28');
      let review = {
        uId: _.random(10),
        bId: i,
        rating: _.sample(ratingOptions),
        reviewText: faker.lorem.sentence(),
        checkin: _.sample(checkinOptions),
        useful: [],
        funny: [],
        cool: [],
        createdAt: date,
        updatedAt: date,
      };
      reviews.push(review);
    }
    count++;
    if (count === 200000) {
      // saveReview(reviews)
      await Review.insertMany(reviews);
      count=0;
      reviews = null;
      reviews = [];
    }
    console.log(i);
  }
};


// const seedDb = ( bizCount = 100 ) => {
//   let hipsterReviews = [];
//   let meatReviews;
//   let starReviews = [];
//   // Get Hipser Reviews
//   axios.get('http://hipsterjesus.com/api/')
//   .then(({data}) => {
//     // Split paragraph into variable lengths
//     let hipsterParagraph = data.text.split(' ');
//     let start = 0;
//     let end;
//     while ( start < hipsterParagraph.length) {
//       end = start + _.random(15, 35);
//       let curr = hipsterParagraph.slice(start, end).join(' ') + '.';
//       curr = curr.charAt(0).toUpperCase() + curr.slice(1);
//       hipsterReviews.push(curr);
//       start = end;
//     }
//     // Get Bacon Ipsum Reviews
//     axios.get('https://baconipsum.com/api/?type=all-meat&paras=25&start-with-lorem=1')
//     .then(({data}) => {
//       meatReviews = data;
//       // Get Reviews by Star Rating
//       let args = [];
//       for (let star = 1; star <= 5; star++) {
//         for(let i = 0; i <= 7; i++) {
//           args.push( axios.post(`http://reviews.azurewebsites.net/?stars=${star}`) );
//         }
//       }
//       axios.all(args)
//       .then(axios.spread( (...allReviews) => {
//         for (let {data} of allReviews) {
//           starReviews.push(cleanData(data));
//         }

//         const fullReviews = [ ...hipsterReviews, ...meatReviews, ...starReviews];
//         const reviewBatch = [];
//         const getReview = () => _.sample(fullReviews);
//         let ratingOptions = [1,2,3,4,5];
//         let checkinOptions = [true, false];
//         for (let i = 1; i <= bizCount; i++) {
//           // For loop to generate variable length of reviews
//           let randReviews = _.random(20);
//           for (let j = 0; j < randReviews; j++) {
//             let date = faker.date.between('2013-01-01', '2019-6-28');
//             let review = {
//               uId: _.random(1, 100),
//               bId: i,
//               rating: _.sample(ratingOptions),
//               reviewText: getReview(),
//               checkin: _.sample(checkinOptions),
//               useful: generateUsers(),
//               funny: generateUsers(),
//               cool: generateUsers(),
//               createdAt: date,
//               updatedAt: date,
//             };
//             // Push reviews into promise to be saved into DB at one time
//             reviewBatch.push(review);
//           }
//         }
//         saveReview(reviewBatch)
//         .then((stat) => console.log(`**Seed Reviews Success**\nReview Total: ${stat.length}\n`))
//         .catch((err)=> console.log(err))
//       }))
//     })
//   })
//   .catch((err) => console.log(err))
// };


const cleanData = (data) => data.split(`-Star Review</h2>`)[1].split(`</div>`)[0].split(`<div>`)[1].trim().replace(/&#39;/gi, "'");

const generateUsers = () => {
  let users = [];
  let num = _.random(0,2);
  for (let i = 0; i < num; i++){
    users.push( { username: faker.name.findName(), uId: _.random(1,3) } );
  }
  return users;
};

seedDb();
module.exports.seedDb = seedDb;