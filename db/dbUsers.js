const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fec', {useNewUrlParser: true });

const usersSchema = new mongoose.Schema({
uId: Number,
username: String,
city: String,
state: String,
photo: String,
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

const retrieveUserInfo = (uId) => {
  return new Promise ((resolve, reject) => {

  });
};

module.exports.saveUsers = saveUsers;
module.exports.retrieveUserInfo = retrieveUserInfo;