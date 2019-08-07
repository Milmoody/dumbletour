const fs = require('fs');
const path = require('path');
const Data = require('./../db/mongo/mock-data.js');
const User = require('./../db/mongo/user-model.js');
const billy = require('./../db/sql/postgres-billy.js');
const authKeys = require('./../oauth-config/auth-keys');
const fetch = require('isomorphic-fetch')

const apiController = {};

// Search against mongo DB
// apiController.search = (req, res, next) => {
//   Data.find({ lat: req.body.latitude, lon: req.body.latitude, date_open: { $gte: new Date(req.body.arrivalDate) }, date_close: { $lte: new Date(req.body.departureDate)} }).toArray((error, result) => {
//     if (error) {
//       return res.status(5000).send(error);
//     }
//     // res.status(200).send(result);
//     res.locals.result = result;
//   })
//   next();
// }

// Search against Postgres DB and transfer to Mongo DB
apiController.search = (req, res, next) => {
  console.log('searchcontroller req body is:', req.body);
  const queryArray = [];
  // billy.query(`SELECT * FROM fake_data WHERE ST_DWithin(geom, ST_MakePoint(${req.body.latitude}, ${req.body.longitude})::geography, 5000000) AND date_open <= '${req.body.arrivalDate}' AND date_close >= '${req.body.departureDate}';`, (err, result) => {
  //   console.log('the query happened')
  //   if (err) console.log('we have an errr in search asda', err);
  //   // res.send('suck');

  //   console.log('result in search controller is:', result);

  //   result.rows.forEach(el => {
  //     // console.log('HOOOYEE', el);
  //     queryArray.push({
  //       id,
  //       address,
  //       zip,
  //       country,
  //       phoneNumber,
  //       lat,
  //       lon,
  //       price,
  //       hashtag,
  //       company,
  //       date_open,
  //       date_close,
  //       image,
  //       website,
  //       rating,
  //       geom,
  //     } = el);
  //   });

  //   queryArray.forEach(el => {
  //     new Data(el).save().then(result => result).catch(err => console.log('errrrrr', err));
  //   })

  //   console.log('qeuruearray', queryArray);

  //   // // res.locals.result = queryArray;
  //   return res.send(queryArray);
  //   // User.insertMany(JSON.parse(result.rows), (error, documents) => {
  //   //   console.log('Data successfully transferred to mongo DB', documents);
  //   //   res.locals.mongoDocs = documents;
  //   // })

  // })
  // res.locals.result = queryArray;
  return next();
}

apiController.addItinerary = (req, res, next) => {
  User.findOneAndUpdate({ username: req.body.username }, { $push: { itinerary: req.body.event } }, { new: true, useFindAndMondify: false }, (error, itinerary) => {
    console.log('new itinerary(added) is:', itinerary);
    if (error) {
      const myError = new Error();
      myError.msg = error;
      return res.status(400).send(myError);
    } else {
      console.log('itinerary successfully updated(item added)!')
      return res.send(itinerary);
    }
  })
  // return next();
}

apiController.removeItinerary = (req, res, next) => {
  User.findOneAndUpdate({ username: req.body.username }, { $pull: { itinerary: req.body.event } }, { new: true }, (error, itinerary) => {
    console.log('new itinerary(removed) is:', itinerary);
    if (error) {
      const myError = new Error();
      myError.msg = error;
      return res.status(400).send(myError);
    } else {
      console.log('itinerary successfully updated(item removed)!')
      res.send(itinerary);
    }
  })
  // return next();
}

//add yelp query
apiController.yelpQuery = (req, res, next) => {
  const search = 'food';
  const location = 90292;
  fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&term=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + authKeys.yelp.apiKey,
    }
  })
  .then(response => response.json())
  .then(myJson => {
    const businesses = [];
    for(let i = 0; i < myJson.businesses.length; i++) {
      let obj = {};
      obj.id = myJson.businesses[i].id;
      obj.name = myJson.businesses[i].name;
      obj.image = myJson.businesses[i].image_url;
      obj.location = myJson.businesses[i].location;
      obj.phone = myJson.businesses[i].display_phone;
      obj.url = myJson.businesses[i].url;
      obj.numReviews = myJson.businesses[i].review_count;
      obj.rating = myJson.businesses[i].rating;
      obj.price = myJson.businesses[i].price ? myJson.businesses[i].price: 'unknown';
      obj.categories = (function makeArr() {
        const catArr = [];
        myJson.businesses[i].categories.forEach(obj => catArr.push(obj.title))
        return catArr;
      })();
      obj.latlong = [myJson.businesses[i].coordinates.latitude, myJson.businesses[i].coordinates.longitude];
      businesses.push(obj);
    }
    console.log(businesses);
    res.locals.data = businesses;
    next();
  })
  .catch(error => console.error('Error:', error));

};

module.exports = apiController;