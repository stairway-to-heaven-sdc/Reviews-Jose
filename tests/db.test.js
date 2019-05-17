const { retrieveByBiz, retrieveByUser, retrieveAllReviews } = require('../db/db');

let bizResults;
let userResults;
let allReviews;

describe('Database fn to Retrieve by business id', () =>{
  beforeAll((done) => {
    let getRandom = (min, max) => Math.ceil(Math.random() * (max - min) + min);
    let num = getRandom(0,101);
    retrieveByBiz(num)
    .then((data) => {
      bizResults = data;
      done();
    });
  })

  test('returns a result', () => {
    expect(bizResults).toBeTruthy();
  });

  test('has all needed keys in an database entry', () => {
    let dbEntryKeys = Object.keys(bizResults[0].toObject());
    // Refactor to take out __v & up
    let keyTitles = ['uId', 'bId', '_id', '__v', 'rating', 'reviewText',
     'checkin', 'createdAt', 'updatedAt', 'cool', 'funny', 'useful'];
    expect(dbEntryKeys).toEqual(expect.arrayContaining(keyTitles));
  });

});

describe('Database fn to Retrieve by user id', () =>{
  beforeAll((done) => {
    let getRandom = (min, max) => Math.ceil(Math.random() * (max - min) + min);
    let num = getRandom(0,101);
    retrieveByUser(num)
    .then((data) => {
      userResults = data;
      done();
    });
  })

  test('multiple reviews have been generated for one userID', () => {
    let areMultipleUsers = userResults.length > 0;
    expect(areMultipleUsers).toEqual(true);
  });
});

describe('Database fn to Retrieve all users', () =>{
  beforeAll((done) => {
    retrieveAllReviews()
    .then((data) => {
      allReviews = data;
      done();
    });
  })

  test('returns at least 700 reviews', () => {
    let sufficientReviewCount = allReviews.length >= 700;
    expect(sufficientReviewCount).toEqual(true);
  });
});