var express = require('express');
var router = express.Router();
var util = require('util');

/* GET TWILIO hello world. */
router.get('/', function(req, res, next) {
  res.send('TWILIO hello world');
});

/* GET TWILIO hello world. */
router.post('/messageStatus', function(req, res, next) {
  // res.send('TWILIO messsage status');
  // console.log(req.params);
  // console.log(req.body.MessageStatus);
  // console.log(req.body.a);
  // console.log(util.inspect(req.body.name, false, null));
  res.send(req.body.MessageStatus);
});


module.exports = router;
