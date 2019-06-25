const mongoose = require('mongoose');
require('dotenv').config();
const url = 'mongodb://localhost/fec';
const mongoURI = process.env.mongoURI || url;
mongoose.connect(mongoURI, {useNewUrlParser: true });

const usersSchema = new mongoose.Schema({
  uId: Number,
  username: String,
  city: String,
  state: String,
  photo: String,
  elite: String,
  friends: [],
});

const User = mongoose.model('User', usersSchema);

const saveUsers = (data) => {
  return new Promise ((resolve, reject) => {
    User.insertMany(data)
    .then((users) => resolve(users))
    .catch((err) => reject(err));
  });
};

const retrieveUsersById = (uIds) => {
  return new Promise ((resolve, reject) => {
    User.find({ 'uId': { $in: uIds } })
    .then((users) => resolve(users))
    .catch((err) => reject(err));
  });
};

module.exports.saveUsers = saveUsers;
module.exports.retrieveUsersById = retrieveUsersById;