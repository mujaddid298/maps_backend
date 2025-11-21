   const express = require('express');
   const router = express.Router();
   const auth = require('../middleware/auth');
   const validator = require('../middleware/validator');
   const mapsController = require('../controllers/mapscontroller');

   // Search places
   router.post('/search', auth, validator.searchPlaces, mapsController.searchPlaces);
   router.post('/directions', auth, validator.directions, mapsController.directions);
   router.get('/embed', auth, validator.embed, mapsController.embedUrl);

   module.exports = router;