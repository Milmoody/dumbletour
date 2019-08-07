// const pg = require('pg');
// const conString = "postgres://btmn626:g@teofPostgresql65@localhost:5432/sdb_dumbletour";

// const client = new pg.Client(conString);
// client.connect();

//queries are queued and executed one after another once the connection becomes available
// client.query('select * from fake_data WHERE ST_DWithin(geom, ST_MakePoint(33.981401, -118.411467)::geography, 50000);', (err, res) => {
//   console.log('result in client query is:', res);
// })


// module.exports = {
//   query: (text, params, callback) => {
//     return client.query(text, params, callback)
//   }
// };