const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const apiRoutes = require('./routes/api-routes');
const passportSetup = require('./oauth-config/passport-setup');
// const authKeys = require('./oauth-config/auth-keys');
const { MongoClient } = require('mongodb');
const cookieSession = require('cookie-session');
const passport = require('passport');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js')

const app = express();

// use a json body parser
app.use(bodyParser.json());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}))

if (process.env.NODE_ENV === 'production') {
  // serve index.html on the route '/'
  app.use('/build/', express.static(path.join(__dirname, '../build')));
}


app.use('/api', apiRoutes);


// TEMPORARY ROUTES START
// app.post('/api/search', (req, res) => {
  // const stubResults = [];
  // const resultTemplate = {
    // imgUrl: 'http://via.placeholder.com/350x460',
    // price: '50.99',
    // www: 'www.tourists-are-us.com',
    // ig: '#livelaughlove',
  // };
  // for (let i = 20; i > 0; i -= 1) {
    // const name = `Lorem Ipssum ${i}`;
    // const id = i;
    // stubResults.push({ ...resultTemplate, name, id });
  // }
  // res.status(200);
  // res.setHeader('Content-type', 'application/json');
  // res.json(stubResults);
// });


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


// Listen for requests on PORT 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
});
module.exports = app;
