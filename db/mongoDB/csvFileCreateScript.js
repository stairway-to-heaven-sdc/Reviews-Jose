const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const faker = require('faker');
let _ = require('lodash');
let exec = require('child_process').exec
const fs = require('fs');

const generateReviews = async (num) => {
    const ratingOptions = [1,2,3,4,5];
    const checkinOptions = [true, false];
    let goalNum = num + 499999; //
    let reviews = [];
    // num -> 1  // 1,000,001         goalNum -> 1000000
    console.log(goalNum, `inside the generateReviews`)
    for (let i = num; i <= goalNum; i++) {
  
      let randReviews = _.random(5);// 3
      for (let j = 0; j < randReviews; j++) {
        let date = faker.date.between('2013-01-01', '2019-6-28');
        let review = {
          uId: _.random(10),
          bId: i,
          rating: _.sample(ratingOptions),
          reviewText: faker.lorem.sentence(),
          checkin: _.sample(checkinOptions),
          useful: [{'username': 'jose', 'id': 1}, {'username': 'alexa', 'id': 5}],
          funny: [{'username': 'nayeli', 'id': 2}],
          cool: [{'username': 'jermiah', 'id': 4},{'username': 'liz', 'id': 60},{'username': 'uli', 'id': 2}],
          createdAt: date,
          updatedAt: date,
        };
        reviews.push(review);
      }
    }
    return reviews;
  };

let count = 1;
// let goal = 1000000//
const seed = async (count) => {
    const reviews = await generateReviews(count); //2,000,001
    console.log(reviews[reviews.length - 1], `line 57 - first review from reviews list`)
    const csvWriter =  createCsvWriter({
      path: path.join(__dirname + "/../../db/mongoDB/data.csv"),
      header: [
        {id: 'bId', title: 'bId'},
        {id: 'rating', title: 'rating'},
        {id: 'reviewText', title: 'reviewText'},
        {id: 'checkin', title: 'checkin'},
        {id: 'uId', title: 'uId'},
        {id: 'useful', title: 'useful'},
        {id: 'funny', title: 'funny'},
        {id: 'cool', title: 'cool'},
        {id: 'createdAt', title: 'createdAt'},
        {id: 'updatedAt', title: 'updatedAt'}
      ]
    });
    csvWriter.writeRecords(reviews)
        .then(() => {
          console.log('CSV file Created')
          // let exec = require('child_process').exec
          let command = 'mongoimport -d SDC -c reviews --type csv --file data.csv --headerline';
          exec(command, {maxBuffer: 1024 * 500} ,(err, stdout, stderr) => {
            // check for errors or if it was succesfuly
            if (err) {
              console.log(err);
            } else {
              console.log(stdout);
              console.log('CSV file loaded to mongo');
  
              // remove file to allow csvWriter to create a new file
              fs.unlink(path.join(__dirname + "/../db/mongDB/data.csv"), (err) => {
                if (err) {
                  console.log(err);
                } else {
              // run seed() until 5million records are
              
              count = count + 500000;
              if (count < 10000001) {
                console.log(count, `inside of line 77`)
                seed(count);
              }
                }
              });
            }
          })
        });
};

seed(count);

