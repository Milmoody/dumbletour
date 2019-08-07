const router = require('express').Router();
const apiController = require('../controllers/api-controllers');


router.post('/search', apiController.searchEventbrite, apiController.eventbritePrices, apiController.eventbriteLocations, (req, res) =>{
  console.log('res.locals:    ', res.locals);
  res.status(200).send(res.locals.eResult);
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