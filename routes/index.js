var express = require('express');
var router = express.Router();
var util = require('util');

var twilioNumber = '+13235700019';
var userNumber = '+12136759581';

//require the Twilio module and create a REST client
var client = require('twilio')('ACe2d36b9110e4149910c8187da43bc45d', 'd5f0564efbf4cfde2d4ed02a863a6459');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Start Tracking the number */
router.get('/startTracking', function(req, res, next){

    var contact = req.query.contact;
    console.log('number is' + req.query.contact);

    //Send an SMS text message
    client.sendMessage({
        to: contact, // Any number Twilio can deliver to
        from: twilioNumber, // A number you bought from Twilio and can use for outbound communication
        body: 'Testing message' // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        if (!err) { // "err" is an error received during the request, if any

            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1

            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."

        }
    });
    res.send('Done');
});

/* Send a call to the number */
router.get('/sendCall', function(req, res, next){
    var contact = req.query.contact;
    console.log('number is' + req.query.contact);

    //Place a phone call, and respond with TwiML instructions from the given URL
    client.makeCall({
        to: contact, // Any number Twilio can deliver to
        from: twilioNumber, // A number you bought from Twilio and can use for outbound communication
        url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

    }, function(err, responseData) {

        if(!err){
            console.log('no error');
        }
        else{
            // Printing the error object
            console.log(util.inspect(err, false, null));
            console.log('error');
        }
        //executed when the call has been initiated.
        // console.log(responseData.from); // outputs "+14506667788"

    });
    res.send('Call Sent!')
});

module.exports = router;
