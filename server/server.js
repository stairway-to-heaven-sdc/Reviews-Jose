const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const { retrieveByBiz } = require('../db/db.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/reviews/business/:bId', (req, res) => {
  let { bId } = req.params;
  retrieveByBiz(bId).then((reviews) =>{
    res.send({reviews});
  })
});

app.get('/reviews/user/:uId', (req, res) => {
});

app.get('/reviews/search/:bId', (req, res) => {
});

app.get('/reviews/review/:rId', (req, res) => {
});

app.get('/reviews/summation/:bId', (req, res) => {
});

app.post('/reviews/menu', (req, res) => {
});

app.listen(port, () => console.log(`App listening on port: ${port}`));