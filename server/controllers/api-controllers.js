const fs = require('fs');
const path = require('path');
const Data = require('./../db/mongo/mock-data.js');
const User = require('./../db/mongo/user-model.js');
const authKeys = require('../oauth-config/auth-keys.js');
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

apiController.searchEventbrite = (req, res, next) => {
  const location = "Venice Beach";
  fetch(
    `https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&location.within=1km`,
    {
    method: 'GET',
    headers:{
      "Authorization": "Bearer "+ authKeys.eventbrite.publicToken,
    }
  })
  .then(data => data.json())
  .then(result => {
    let queryArray = result.events.map(el => {
      // console.log('New ELEMENT', el);
      let imgUrl = el.logo ? el.logo.original.url: null;
      let newEl = {
        name: el.name.text,
        //handles events with no image URLs
        imgUrl,
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
    res.locals.ids = queryArray.map(el => el.id);
    res.locals.venueIds = queryArray.map(el => el.venueId);
    res.locals.eResult = queryArray;
    return next()
  })
  .catch(err => {
    console.log('There was an error with the eventbrite API request', err)
  })
  
}


apiController.eventbritePrices = (req, res, next) => {
  let prices = {};

    let promises = res.locals.ids.map(id => {
      //Fetch ticket prices from Eventbrite
      return fetch(`https://www.eventbriteapi.com/v3/events/${id}/ticket_classes/`, {
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
          // res.locals.prices[id] = ticket.ticket_classes[0].cost.display;
          prices[id] = ticket.ticket_classes[0].cost.display

        } else {
          // console.log('ticket ', ticket)
          // res.locals.prices[id] = 'free'
          prices[id] = 'free'

        }
        return prices
        // console.log("prices: ", res.locals.prices)
      }).catch(err => {console.log('There was an error fetching prices', err)})


    })
    // console.log('promises: ', promises)
    Promise.all(promises)
    .then(result => {
      res.locals.prices = prices;
      // console.log('res.locals.prices',res.locals.prices)
      return next()
    } )
}

apiController.eventbriteLocations = (req, res, next) => {
  // res.locals.locations = {};
  locations = {};
    let promises = res.locals.venueIds.map(venueId => {
      // console.log(venueId)
      //Fetch ticket prices from Eventbrite
      return fetch(`https://www.eventbriteapi.com/v3/venues/${venueId}/`, {
        type: 'GET',
        headers: {
          "Authorization": "Bearer "+ authKeys.eventbrite.privateToken,
        }
      })
      .then(data => data.json())

      //pull out addresses and push into prices array on res.locals
      .then(venue => {
        if(venue.address.localized_address_display && venue.latitude && venue.longitude){
          // res.locals.locations[venueId] = 
          locations[venueId] =
              {
                address: venue.address.localized_address_display,
                latLong: [venue.latitude, venue.longitude]
              }
        } else {
          // res.locals.locations[venueId] = 'No location found'
          locations[venueId] = 'No location found'
        }
        // console.log(res.locals.locations)
        // return next();
        return locations
      }).catch(err => {console.log('There was an error fetching locations', err)})
    })
    Promise.all(promises)
    .then(result => {
      res.locals.locations = locations;
      return next()
    } )
}

apiController.eventParse = (req, res, next) => {
  events = res.locals.eResult;
  prices = res.locals.prices; 
  // console.log('prices:  ', res.locals.prices)
  locations = res.locals.locations;
  // console.log('locations: ', res.locals.locations)
  for(let i = 0; i < events.length; i++){
    venueIdNum = events[i].venueId;
    venueId = venueIdNum.toString();
    // console.log(venueId)
    events[i]["address"] = locations[venueId].address;
    events[i]["latLong"] = locations[venueId].latLong;
    events[i]["price"] = prices[events[i].id];
  }
  res.locals.eResultClean = events;
  return next();
}

apiController.addItinerary = (req, res, next) => {
  User.findOneAndUpdate({ username: req.body.username }, { $push: { itinerary: req.body.event } }, { new: true, useFindAndMondify: false }, (error, itinerary) => {
    // console.log('new itinerary(added) is:', itinerary);
    if (error) {
      const myError = new Error();
      myError.msg = error;
      return res.status(400).send(myError);
    } else {
      // console.log('itinerary successfully updated(item added)!')
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
  console.log(req.body);
  const search = 'food';
  const location = req.body.zipcode || '90292';
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
    // console.log(businesses);
    res.locals.data = businesses;
    next();
  })
  .catch(error => console.error('Error:', error));

};

module.exports = apiController;