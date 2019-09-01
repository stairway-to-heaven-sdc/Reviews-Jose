const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const faker = require('faker');
let _ = require('lodash');
let exec = require('child_process').exec
const fs = require('fs');

const generateReviews = async (num) => {
    const ratingOptions = [1,2,3,4,5];
    const checkinOptions = [0, 1];
    let goalNum = num + 499999; //
    let reviews = [];
    // num -> 1  // 1,000,001         goalNum -> 1000000
    console.log(goalNum, `inside the generateReviews`)
    for (let i = num; i <= goalNum; i++) {
  
      let randReviews = _.random(5);// 3
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
  // let goal = 1000000//
  const seed = async (count) => {
      const reviews = await generateReviews(count); //2,000,001

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

      csvWriter.writeRecords(reviews)
          .then(() => {
            console.log('CSV file Created')
            // let exec = require('child_process').exec
            // mysqlimport -h host_name -u user_name -p --ignore-lines=1 --fields-terminated-by=, db_name /path/to/file.csv 
            const pathtoFile = path.join(__dirname + "/../../db/MySQL/reviews.csv");
            let command = `mysqlimport -h localhost -u root --ignore-lines=1 --fields-terminated-by=, --columns='business_id,userId,rating,reviewText,checkin,usefulId,funnyId,coolId,createdAt,updatedAt' yelp ${pathtoFile} `;
            exec(command, {maxBuffer: 1024 * 500} ,(err, stdout, stderr) => {
              // check for errors or if it was succesfuly
              if (err) {
                console.log(err);
              } else {
                console.log(stdout);
                console.log('CSV file loaded to mongo');
    
                // remove file to allow csvWriter to create a new file
                fs.unlink(path.join(__dirname + "/../../db/MySQL/reviews.csv"), (err) => {
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