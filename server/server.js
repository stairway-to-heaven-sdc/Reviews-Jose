const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const { retrieveByBiz, retrieveByUser, retrieve1Review } = require('../db/dbReviews');
const { saveUsers, retrieveUsersById } = require('../db/dbUsers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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

app.get('/users/', (req, res) => {
  let { uIds } = req.query;
  retrieveUsersById(uIds)
  .then((users) => {
    res.send(users);
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