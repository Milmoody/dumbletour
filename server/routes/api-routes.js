const router = require('express').Router();
const apiController = require('../controllers/api-controllers');


router.post('/search', apiController.searchEventbrite, apiController.eventbritePrices, apiController.eventbriteLocations, apiController.eventParse, (req, res) =>{
  console.log('res.locals.eResultClean:    ', res.locals.eResultClean);
  res.status(200).send(res.locals.eResultClean);
})


router.put('/itinerary/add', apiController.addItinerary, (req, res) => {
  res.status(200).send(res.locals.itineraryAdd);
});

router.put('/itinerary/remove', apiController.removeItinerary, (req, res) => {
  res.status(200).send(res.locals.itineraryRemove);
});

router.get('/events', (req, res) => {
  res.json({'events': true})
})

module.exports = router;