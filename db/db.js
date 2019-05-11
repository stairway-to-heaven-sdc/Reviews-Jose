const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
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
});

const Review = mongoose.model('Review', reviewSchema);

const saveReview = (data) => {
  let instance = Review(data);
  instance.save( (err, review) => {
    if(err) return console.log(err);
    console.log(`Review ${review.uId} successful`);
  });
};

const retrieveAllReviews = (callback) => {
  Review.find({})
  .then((data) => {
    console.log(data);
    callback(data);
  })
};

module.exports.retrieveAllReviews = retrieveAllReviews;
module.exports.saveReview = saveReview;