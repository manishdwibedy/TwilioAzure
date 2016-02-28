var express = require('express');
var router = express.Router();

/* GET TWILIO hello world. */
router.get('/', function(req, res, next) {
  res.send('TWILIO hello world');
});

module.exports = router;
