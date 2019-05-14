const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fec', {useNewUrlParser: true });

const reviewSchema = new mongoose.Schema({
  uId: Number,
  bId: Number,
  rating: Number,
  reviewText: String,
  checkin: Boolean,
  useful: [], // Contains the users([Username,UserID]) who thought review was useful
  funny: [], // Contains the users([Username,UserID]) who thought review was funny
  cool: [], // Contains the users([Username,UserID]) who thought review was cool
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

const saveReview = (data) => {
  return new Promise ((resolve,reject) => {
    Review.insertMany(data)
    .then((docs) => resolve(docs))
    .catch((err) => reject(err))
  });
};

const retrieveAllReviews = () => {
  return new Promise ((resolve, reject) => {
    Review.find({})
    .then((data) => resolve(data))
    .catch((err) => reject(err))
  });
};

const retrieveByBiz = (bId) => {
  return new Promise ((resolve, reject) => {
    Review.find({ bId })
    .then((data) => resolve(data))
    .catch((err) => reject(err))
  });
};

module.exports.retrieveAllReviews = retrieveAllReviews;
module.exports.saveReview = saveReview;
module.exports.retrieveByBiz = retrieveByBiz;