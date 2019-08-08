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

//yelp query for gender neutral bathrooms
apiController.gnBathQuery = (req, res, next) => {
  const search = 'gender_neutral_restrooms';
  const location = req.body.zipcode || '90292';
  
  fetch(`https://api.yelp.com/v3/businesses/search?limit=50&location=${location}&attributes=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + authKeys.yelp.apiKey,
    }
  })
  .then(response => response.json())
  .then(myJson => {
    const genNeutralBusinesses = [];
    const genNeutralIds = [];
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
      genderNeutralBathrooms = true;
      genNeutralBusinesses.push(obj);
      genNeutralIds.push(myJson.businesses[i].id);
    }
    res.locals.genNeutralBusinesses = genNeutralBusinesses;
    res.locals.genNeutralIds = genNeutralIds;
    next();
  })
  .catch(error => console.error('Error:', error));

};

// yelp query for businesses classified as Open-To-All
apiController.openQuery = (req, res, next) => {
  const search = 'open_to_all';
  const location = req.body.zipcode || '90292';
  
  fetch(`https://api.yelp.com/v3/businesses/search?limit=50&location=${location}&attributes=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authKeys.yelp.apiKey,
    }
  })
  .then(response => response.json())
  .then(myJson => {
    const openBus = [];
    const open = [];
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
      openToAll = true;
      openBus.push(obj);
      open.push(myJson.businesses[i].id);
    }
    res.locals.open = openBus;
    res.locals.openKey = open;
    next();
  })
  .catch(error => console.error('Error:', error));
};

apiController.mergeQueries = (req, res, next) => {
  // confirming number of items in each array
  let count = 0;
  res.locals.genNeutralBusinesses.forEach(item => count += 1);
  console.log('gender neutral bathroom businesses:', count);
  count = 0;
  res.locals.open.forEach(item => count += 1);
  console.log('open businesses:', count);
  // inserts the businesses that do not show up in the first query, into the second query
  const mergedArr = [].concat(res.locals.genNeutralBusinesses);
  const addOpen = [];
  for (let i = 0; i < res.locals.open.length; i++) {
    if (res.locals.genNeutralIds.indexOf(res.locals.open[i].id) === -1) {
      mergedArr.push(res.locals.open[i]);
    } else {
      addOpen.push(res.locals.open[i].id);
    }
  }
  // check to see the new count
  count = 0;
  mergedArr.forEach(item => count += 1);
  console.log('merged arr:', count);
  // add property to indicate if business needs open property set to true

  res.locals.data = mergedArr;
  next();
};

module.exports = apiController;