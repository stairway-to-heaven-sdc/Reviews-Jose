const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success!');
  }
});

// drop keyspace if it exists
client.execute(`DROP KEYSPACE IF EXISTS yelp;`)
  .then(() => {

    const keyspace = `CREATE KEYSPACE IF NOT EXISTS yelp
        WITH REPLICATION = {
            'class': 'SimpleStrategy', 
            'replication_factor': 1
    }`;
    
    const reviews = `CREATE TABLE IF NOT EXISTS yelp.reviews (
        id uuid,
        bId INT,
        uId INT,
        rating INT,
        reviewText Text,
        checkin BOOLEAN,
        useful INT, 
        funny INT,
        cool INT,
        PRIMARY KEY(bId, id)
    )`;
    
    client.execute(keyspace)
        .then(() => {
            client.execute(reviews, (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(result);
            })
        })
        .catch(err => {
          console.log(err);
        });
  })
  .catch(err => console.log(err));


module.exports = {
  client
}