const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yelp',
  });
  pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
});

// Promisify to use nodeJS async / await
pool.query = util.promisify(pool.query)

//
const retrieveByBiz = async (bId) => {
  try{
    const query =  `SELECT *, IF(checkin, 'true', 'false') checkin  FROM reviews WHERE business_id = ${bId}`;
    return pool.query(query)

  } catch(err) {
    console.log(err);
  }
};


const saveReview = async (review, bId) => {
  const {checkin, rating, reviewText, uId} = review;
  // SQL QUERY
  const query = `INSERT INTO reviews 
                ( business_id, userId, rating, reviewText, checkin, usefulId, funnyId, coolId, createdAt, updatedAt)
                  VALUES (${bId}, ${uId}, ${rating}, "${reviewText}", ${checkin},null,null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
  // query to insert
  let resp = await pool.query(query)
  try {
    // query to get review inserted
    const query = `SELECT *, IF(checkin, 'true', 'false') checkin  FROM reviews 
                      WHERE _id = ${resp.insertId}`;
    let savedRvw = await pool.query(query)
    return savedRvw;
  } catch(err) {
    console.log(err);
  }
}; 

const updateReview = async (bId, rvwId, body) => {
  try {
    const query = `UPDATE reviews SET rating = ${body.rating}, reviewText = "${body.reviewText}"
                    WHERE business_id = ${bId} AND _id = ${rvwId}`
    
    await pool.query(query)
    try {
      const query = `SELECT *, IF(checkin, 'true', 'false') checkin FROM reviews 
        WHERE business_id = ${bId} AND _id = ${rvwId}`
      let updatedReview = await pool.query(query)
      return updatedReview;
    } catch(err) {
      console.log(err);
    }

  } catch(err) {
    console.log(err);
  }
};

const removeReview = async (bId, rvwId) => {
  try{
    const query = `DELETE FROM reviews 
                    WHERE business_id = ${bId} AND _id = ${rvwId}`;
    await pool.query(query);
    return;
  } catch(err) {
    console.log(err);
  }
    
};

module.exports = {
  retrieveByBiz,
  saveReview,
  updateReview,
  removeReview
}