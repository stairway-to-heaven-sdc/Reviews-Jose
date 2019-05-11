const { saveReview, retrieveAllReviews } = require('./db');
const faker = require('faker');
const axios = require('axios');

const seedDb = ( bizCount = 100 ) => {
  let reviews = [];
  let hipsterReviews = [];
  let meatReviews;
  let starReviews = [];
  axios.get('http://hipsterjesus.com/api/')
  .then(({data}) => {
    // Split paragraph into variable lengths
    let hipsterParagraph = data.text.split(' ');
    let start = 0;
    let end;
    while ( start < hipsterParagraph.length) {
      end = getRandom(start);
      let curr = hipsterParagraph.slice(start, end).join(' ') + '.';
      curr = curr.charAt(0).toUpperCase() + curr.slice(1);
      hipsterReviews.push(curr);
      start = end;
    }
    axios.get('https://baconipsum.com/api/?type=all-meat&paras=25&start-with-lorem=1')
    .then(({data}) => meatReviews = data)
    let args = [];
    for (let star = 1; star <= 5; star++) {
      for(let i = 0; i <= 7; i++){
        args.push( axios.post(`http://reviews.azurewebsites.net/?stars=${star}`) );
      }
    }
    axios.all(args)
    .then(axios.spread( (...allReviews) => {
      for (let {data} of allReviews){
        starReviews.push(cleanData(data));
      }
    }))

    for (let i = 1; i <= bizCount; i++) {

    }
  })
  .catch((err) => console.log(err))
};

const getRandom = (start) => {
  start += 5;
  let end = start + 8;
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const cleanData = (data) => decodeURI(data.split(`-Star Review</h2>`)[1].split(`</div>`)[0].split(`<div>`)[1].trim());
