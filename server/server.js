const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const { retrieveByBiz, retrieveByUser, retrieve1Review, saveReview, Review} = require('../db/dbReviews');
// const { saveUsers, retrieveUsersById } = require('../db/dbUsers');
const morgan = require('morgan');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

// Changes to the URL in UI should allow for new review's by bId pull
app.use('/reviews/:bId', express.static('public'));


/**
 * CRUD APIs
 * 
 */
// GET all reviews
app.get('/reviews/business/:bId', (req, res) => {

  let { bId } = req.params;
  console.log(bId, `this is the business ID`)
  retrieveByBiz(bId).then((reviews) =>{
    res.send({reviews});
  })
  .catch((err) => console.log(err));
});

// POST new review 
app.post('/reviews/new/:bId', 
  (req, res) => {
    const review = req.body;
    review.bId = Number(req.params.bId);
    // add funny, cool, useful properties
    review.funny = [];
    review.cool = [];
    review.useful = [];
    // save review by Business ID (bId)
    saveReview(review)
    .then((result) => {
      res.send(result);
    });
  });

// PATCH update one review record
app.patch('/review/modifyReview/', 
  (req,res) => {
  // review _id
  const rvwId = req.query._id;
  // body contains the revie text and rating
  const body = req.body;
  // determine if the review has been updated with the body
  Review.findById(rvwId)
    .then(review => {
      // get current values
      const currReviewText = review.reviewText;
      const currRating = review.rating;
      // compare current values with values from client, 
      // if the values are the same, respond with the review
      if (currRating === body.rating && currReviewText === body.reviewText) {
        res.send(review);
      } else {
      // else, update the values with new values from client
        review.reviewText = body.reviewText;
        review.rating = body.rating;
        review.save((err, review) => {
          if (err) {
            res.send(err);
          }
          res.send(review);
        })
      }
    })
    .catch(err => res.send(err));
}); 

// DELETE one review record
app.delete('/review/remove', 
  (req, res) => {
    const rvwId = req.query._id;
    Review.findByIdAndDelete(rvwId)
      // returns the review that was deleted
      .then(response => res.send(response))
      // returns error
      .catch(err => res.send(err));
});

/**
 * END OF CRUD APIs
 * 
 */
app.get('/reviews/user/:uId', (req, res) => {
  let { uId } = req.params;
  retrieveByUser(uId).then((reviews) =>{
    res.send({reviews});
  })
  .catch((err) => console.log(err));
});

app.get('/reviews/search/:bId', (req, res) => {
  let { bId } = req.params;
  retrieveByBiz(bId).then((reviews) =>{
    // Search review text within each review and return
    res.send({reviews});
  })
  .catch((err) => console.log(err));
});

app.get('/reviews/summation/:bId', (req, res) => {
  let { bId } = req.params;
  retrieveByBiz(bId).then((reviews) => {
    let reviewCount = reviews.length;
    let rating = reviews.reduce((acc, val) => {
      return acc + val.rating;
    }, 0);
    res.send({ reviewCount, rating });
  })
  .catch((err) => console.log(err));
});

app.get('/users/', (req, res) => {
  let { uIds } = req.query;
  retrieveUsersById(uIds)
  .then((users) => {
    res.send(users);
  })
  .catch((err) => console.log(err));
});

app.get('/user/:uId', (req, res) => {
  let { uId } = req.params;
  retrieveUsersById([uId])
  .then((user) => {
    res.send(user[0]);
  })
  .catch((err) => console.log(err));
});

app.post('/users/newuser', (req, res) => {
  let { uId } = req.body;
  uId = JSON.parse(uId);
  saveUsers(uIds)
  .then((users) => {
    res.send(users);
  })
  .catch((err) => console.log(err));
});

app.listen(port, () => console.log(`App listening on port: ${port}`));