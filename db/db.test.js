const { retrieveByBiz, retrieveByUser } = require('./db');

let bizResults;
let userResults;

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

  test('all reviews returned have the same userID', () => {
    let userIds = userResults.map(x => x.uId);
    let areEqual = userIds.every( x => x === userIds[0]);
    expect(areEqual).toEqual(true);
  });
});