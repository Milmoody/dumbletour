const router = require('express').Router();
const apiController = require('../controllers/api-controllers');

router.post('/search', apiController.search, (req, res) => {
  console.log('SPOT ASORAUTE', res.locals.result);
  res.status(200).send(res.locals.result);
});

router.put('/itinerary/add', apiController.addItinerary, (req, res) => {
  res.status(200).send(res.locals.itineraryAdd);
});

router.put('/itinerary/remove', apiController.removeItinerary, (req, res) => {
  res.status(200).send(res.locals.itineraryRemove);
});

// yelp query
router.post('/businesses', apiController.gnBathQuery, apiController.openQuery, apiController.mergeQueries, (req, res) => {
  res.status(200).send(res.locals.data);
});

module.exports = router;