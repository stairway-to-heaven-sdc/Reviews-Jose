const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const faker = require('faker');
let _ = require('lodash');
let exec = require('child_process').exec
const fs = require('fs');



const csvWriter =  createCsvWriter({
  path: path.join(__dirname + "/../../db/MySQL/reviews.csv"),
  header: [
    {id: 'bId', title: 'bId'},
    {id: 'uId', title: 'uId'},
    {id: 'rating', title: 'rating'},
    {id: 'reviewText', title: 'reviewText'},
    {id: 'checkin', title: 'checkin'},
    {id: 'useful', title: 'useful'},
    {id: 'funny', title: 'funny'},
    {id: 'cool', title: 'cool'},
    {id: 'createdAt', title: 'createdAt'},
    {id: 'updatedAt', title: 'updatedAt'}
  ]
});

const generateReviews = async (num) => {
    const ratingOptions = [1,2,3,4,5];
    const checkinOptions = [0, 1];
    let goalNum = num + 299999; 
    let reviews = [];
    for (let i = num; i <= goalNum; i++) {
  
      let randReviews = _.random(5);
      for (let j = 0; j < randReviews; j++) {
        let date = faker.date.between('2013-01-01', '2019-6-28');
        let review = {
          uId: _.random(1000),
          bId: i,
          rating: _.sample(ratingOptions),
          reviewText: faker.lorem.sentence(),
          checkin: _.sample(checkinOptions),
          useful: 1,
          funny: 2,
          cool: 3, 
          createdAt: '2006-10-14 12:09:23',
          updatedAt: '2006-10-14 12:09:23',
        };
        reviews.push(review);
      }
    }
    return reviews;
  };


  let count = 1;
  const seed = async (count) => {
    const reviews = await generateReviews(count); 

    csvWriter.writeRecords(reviews)
      .then(() => {
        // run script until 10million bId records created.
        console.log(count, `testing count`);
        count = count + 300000;
        if (count < 7000001) {
          seed(count);
        }
      });
  };
  
  seed(count);
  