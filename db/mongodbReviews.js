const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGOURI || 'mongodb://localhost/SDC'
mongoose.connect(mongoURI, {useNewUrlParser: true }, );

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

const retrieveByUser = (uId) => {
  return new Promise ((resolve, reject) => {
    Review.find({ uId })
    .then((data) => resolve(data))
    .catch((err) => reject(err))
  });
};

const retrieve1Review = (rId) => {
  return new Promise ((resolve, reject) => {
    Review.find({ rId })
    .then((data) => resolve(data))
    .catch((err) => reject(err))
  });
};

const updateReview = async (rvwId, body) => {
  const answer = await Review.findById(rvwId)
  .then(review => {
    // get current values
    const currReviewText = review.reviewText;
    const currRating = review.rating;
    // compare current values with values from client, 
    // if the values are the same, respond with the review
    // determine if rating and reviewText are the same as current review state
    if (currRating === body.rating && currReviewText === body.reviewText) {
      return review;
    } else {
    // else, update the values with new values from client
    // remove the id from body if present
      if (body._id) {
        delete body._id;
      }
      // update the properties
      for (let upd in body) {
        review[upd] = body[upd];
      }
      review.save((err, review) => {
        if (err) {
          return err;
        }
        return review;
      })
    }
  });
  return answer;
};

module.exports = {
  retrieveAllReviews,
  saveReview,
  retrieveByBiz,
  retrieveByUser,
  Review,
  updateReview
}