const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const { retrieveByBiz, retrieveByUser, retrieve1Review } = require('../db/dbReviews');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/reviews/business/:bId', (req, res) => {
  let { bId } = req.params;
  retrieveByBiz(bId).then((reviews) =>{
    res.send({reviews});
  });
});

app.get('/reviews/user/:uId', (req, res) => {
  let { uId } = req.params;
  retrieveByUser(uId).then((reviews) =>{
    res.send({reviews});
  });
});

app.get('/reviews/search/:bId', (req, res) => {
  let { bId } = req.params;
  retrieveByBiz(bId).then((reviews) =>{
    // Search review text within each review and return

    res.send({reviews});
  });
});

app.get('/reviews/summation/:bId', (req, res) => {
  let { bId } = req.params;
  retrieveByBiz(bId).then((reviews) =>{
    let reviewCount = reviews.length;
    let reviewRating = reviews.reduce((acc, val) => {
      return acc + val.rating;
    }, 0);
    res.send({ reviewCount, reviewRating });
  });
});


app.listen(port, () => console.log(`App listening on port: ${port}`));