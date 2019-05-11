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
    .then(({data}) => {
      meatReviews = data
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
        // console.log(hipsterReviews.length, meatReviews.length, starReviews.length)

        const fullReviews = [ ...hipsterReviews, ...meatReviews, ...starReviews];
        const len = fullReviews.length;
        const getReview = () => fullReviews[getRandom(0,0,len)];
        for (let i = 1; i <= bizCount; i++) {
          let review = {
            uId: getRandom(1, 0, 99),
            bId: i,
            rating: getRandom(0, 1, 5),
            reviewText: getReview(),
            checkin: getRandom(0, 0, 2) ? false : true,
            useful: generateUsers(),
            funny: generateUsers(),
            cool: generateUsers(),
          };
          console.log(review);
        }
      }))
    })
  })
  .catch((err) => console.log(err))
};
seedDb(10);

const getRandom = (start, startInc = 5, endInc = 8) => {
  start += startInc;
  let end = start + endInc;
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const cleanData = (data) => decodeURI(data.split(`-Star Review</h2>`)[1].split(`</div>`)[0].split(`<div>`)[1].trim());

const generateUsers = () => {
  let users = [];
  let num = getRandom(0,0,5);
  for (let i = 0; i < num; i++){
    users.push( { username: faker.name.findName(), uId: (1,0,99) } );
  }
  return users;
};

