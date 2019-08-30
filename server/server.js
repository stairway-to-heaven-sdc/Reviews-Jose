require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;

const { 
  retrieveByBiz,
  saveReview,
  updateReview,
  removeReview } = require('../db/MySQL/index.js');

const morgan = require('morgan');
const cors = require('cors');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

// Changes to the URL in UI should allow for new review's by bId pull
app.use('/reviews/:bId', express.static('public'));
const handler = serverNum => (req, res) => {
  console.log(`server ${serverNum}`, req.method, req.url, req.body);
  res.send(`Hello from server ${serverNum}!`);
 };

/**
 * CRUD APIs
 * 
 */  
// GET all reviews
app.get('/reviews/business/:bId', async (req, res, next) => {
  let { bId } = req.params;
  try {
    const reviews = await retrieveByBiz(bId)
    // res.send(reviews);
    res.status(200).send(reviews);
  } catch {
    res.send(404)
  }
});

// POST new review 
app.post('/reviews/newReview/:bId', async (req, res, next) => {
    const review = req.body;
    // save review by Business ID (bId)
    const bId = req.params.bId;
    try {
      const newReview = await saveReview(review, bId)
      console.log(newReview,`after insert to db`)
      // 201 - The request has been fulfilled, resulting in the creation of a new resource
      res.status(201).send(newReview);
    } catch(err) {
      next(err);
    }
});

// PATCH update review
app.patch('/review/modify', async (req, res, next) => {
  const rvwId = req.query._id;
  const bId = req.query.bId;
  console.log(bId, `business Id`)
  console.log(rvwId, `review ID`)
  try {
    const response = await updateReview(bId, rvwId, req.body);
    res.status(200).send(response);
  } catch(err) {
    res.send(404)
  }
});
 

// DELETE one review record
app.delete('/reviews/remove', async (req, res, next) => {
    const rvwId = req.query._id;
    const bId = req.query.bId;

    try {
      await removeReview(bId, rvwId);
      // 204 -The server successfully processed the request and is not returning any content
      res.sendStatus(204);
      // res.send(reviewDeleted);
    } catch(err) {
      res.send(404);
    }
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