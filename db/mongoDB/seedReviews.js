'use strict';
const  {Review, saveReview}  = require('./mongodbReviews');
const faker = require('faker');
let _ = require('lodash');


const seedDb = async () => {
  const ratingOptions = [1,2,3,4,5];
  const checkinOptions = [true, false];
  
  let count = 0; 
  let reviews = [];
  for (let i = 0; i <= 10000000; i++) {

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
    if (count === 100000) {
      // saveReview(reviews)
      await Review.insertMany(reviews);
      count=0;
      reviews = null;
      reviews = [];
    }
    console.log(i);
  }
};


seedDb();
module.exports.seedDb = seedDb;