const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const apiRoutes = require('./routes/api-routes');
const passportSetup = require('./oauth-config/passport-setup');
const authKeys = require('./oauth-config/auth-keys');
const { MongoClient } = require('mongodb');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// use a json body parser
app.use(bodyParser.json());

// // connect to mongoDB
// mongoose.connect(authKeys.mongodb.dbURI, { useNewUrlParser: true }, () => {
//   console.log('You are connected to dumbleCluster...');
// });

// only serve webpack bundle file when running in production
if (process.env.NODE_ENV === 'production') {
  // serve index.html on the route '/'
  app.use('/build/', express.static(path.join(__dirname, '../build')));
}

// initialize passport with cookie sessions
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [authKeys.session.cookieKey],
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// // authorization
// app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);
app.use('/api', apiRoutes);
// // TEMPORARY OAUTH TEST
// // view engine
// app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//   res.render('./../client/auth-test.ejs');
// });


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

app.put('/api/itinerary/add', (req, res) => {
  const { id, user } = req.body;
  console.log(`adding id ${id} to ${user}'s itineray`);
  res.status(200);
  res.end();
});

app.put('/api/itinerary/remove', (req, res) => {
  const { id, user } = req.body;
  console.log(`removing id ${id} from ${user}'s itineray`);
  res.status(200);
  res.end();
  res.status(200);
  res.end();
});

app.get('/api/itinerary/get', (req, res) => {
  const { user } = req.query;
  const stubResults = [];
  const resultTemplate = {
    imgUrl: 'http://via.placeholder.com/300x460',
    price: '50.99',
    www: 'www.tourists-are-us.com',
    ig: '#livelaughlove',
  };
  for (let i = 1000; i < 1003; i += 1) {
    const name = `Cart Lorem Ipssum ${i}`;
    const id = i;
    stubResults.push({ ...resultTemplate, name, id });
  }
  console.log(`returning cart for user ${user}`);
  res.status(200);
  res.setHeader('Content-type', 'application/json');
  res.json(stubResults);
  res.status(200);
  res.end();
});
// TEMPORARY ROUTES END

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


// Listen for requests on PORT 3000
app.listen(3000);
module.exports = app;
