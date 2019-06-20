const { retrieveUsersById } = require('../db/dbUsers');

let users;

describe('Database fn to Retrieves all users', () => {
  beforeAll((done) => {
    let ids = [1, 20, 50, 70, 100];
    retrieveUsersById(ids)
    .then((data) => {
      users = data;
      done();
    });
  });

  test('returns 5 users', () => {
    let length = users.length;
    expect(length).toEqual(5);
  });

});