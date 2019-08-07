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

    // result.rows.forEach(el => {
    //   // console.log('HOOOYEE', el);
    //   queryArray.push({
    //     id,
    //     address,
    //     zip,
    //     country,
    //     phoneNumber,
    //     lat,
    //     lon,
    //     price,
    //     hashtag,
    //     company,
    //     date_open,
    //     date_close,
    //     image,
    //     website,
    //     rating,
    //     geom,
    //   } = el);
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

apiController.searchEventbrite = (req, res, next) => {
  const location = "Venice Beach";
  fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&location.within=10km`, {
    method: 'GET',
    headers:{
      "Authorization": "Bearer "+ authKeys.eventbrite.publicToken,
    }
  })
  .then(data => data.json())
  .then(result => {
    let queryArray = result.events.map(el => {
      console.log('New ELEMENT', el);
      let newEl = {
        name: el.name.text,
        //handles events with no image URLs
        imgUrl: () =>{
          if(el.logo){
            el.logo.original.url
          }else{
            null
          }
        },
        id: el.id,
        startTime: el.start.local,
        endTime: el.end.local,
        timezone: el.start.timezone, 
        descriptionText: el.description.text,
        descriptionHtml: el.description.html,
        isFree: el.is_free,
        website: el.url,
        category: el.category_id,
        venueId: el.venue_id,
      };
      return newEl;
    })
    let idsArr = queryArray.map(el => el.id);
    res.locals.ids = idsArr;
    res.locals.venueIds = queryArray.map(el => el.venueId);
    res.locals.eResult = queryArray;
    return next()
  })
  .catch(err => {
    console.log('There was an error with the eventbrite API request', err)
  })
  
}


apiController.eventbritePrices = (req, res, next) => {
  res.locals.prices = [];
    res.locals.ids.forEach(id => {

      //Fetch ticket prices from Eventbrite
      fetch(`https://www.eventbriteapi.com/v3/events/${id}/ticket_classes/`, {
        type: 'GET',
        headers: {
          "Authorization": "Bearer "+ authKeys.eventbrite.privateToken,
        }
      })
      .then(data => data.json())

      //pull out ticket prices and push into prices array on res.locals
      .then(ticket => {
        // console.log('ticket', ticket)
        if(ticket.ticket_classes[0].cost){
        res.locals.prices.push( { id: ticket.ticket_classes[0].cost.display})
        } else {
          // console.log('ticket ', ticket)
          res.locals.prices.push({id: 'free'})
        }
        return next();
      }).catch(err => {console.log('There was an error fetching prices', err)})
    })
}

apiController.eventbriteLocations = (req, res, next) => {
  res.locals.locations = [];
    res.locals.venueIds.forEach(venueId => {

      //Fetch ticket prices from Eventbrite
      fetch(`https://www.eventbriteapi.com/v3/venues/${venueId}/`, {
        type: 'GET',
        headers: {
          "Authorization": "Bearer "+ authKeys.eventbrite.privateToken,
        }
      })
      .then(data => data.json())

      //pull out addresses and push into prices array on res.locals
      .then(venue => {
        if(venue.address.localized_address_display && venue.latitude && venue.longitude){
          res.locals.locations.push({ 
            venueId: 
              {
                address: venue.address.localized_address_display,
                latLong: [venue.latitude, venue.longitude]
              }
          })
        } else {
          res.locals.locations.push({venueId: 'No location found'})
        }
        return next();
      }).catch(err => {console.log('There was an error fetching locations', err)})
    })
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

module.exports = apiController;