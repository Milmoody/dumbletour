const router = require('express').Router;
const mapboxController = require('../controllers/api-controllers.js');

router.get('/mapbox', mapboxController);

module.exports = router;